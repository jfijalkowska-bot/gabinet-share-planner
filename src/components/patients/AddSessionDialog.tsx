import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mic, Square, Sparkles, Loader2 } from "lucide-react";

interface AddSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
  onSuccess: () => void;
}

export function AddSessionDialog({ open, onOpenChange, patientId, onSuccess }: AddSessionDialogProps) {
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [notes, setNotes] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [aiHypotheses, setAiHypotheses] = useState("");
  const [generatingAI, setGeneratingAI] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Nie udało się rozpocząć nagrywania",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      toast({
        title: "Przetwarzanie...",
        description: "Transkrybuję nagranie głosowe",
      });

      // Convert blob to base64
      const reader = new FileReader();
      const base64Audio = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(audioBlob);
      });

      // Call the transcription edge function
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { audio: base64Audio }
      });

      if (error) throw error;
      
      const transcribedText = data.text || "";
      setNotes((prev) => prev + (prev ? "\n\n" : "") + transcribedText);
      
      toast({
        title: "Gotowe!",
        description: "Transkrypcja została dodana do notatek",
      });
    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        title: "Błąd transkrypcji",
        description: "Nie udało się przetworzyć nagrania głosowego",
        variant: "destructive",
      });
    }
  };

  const generateAIAnalysis = async () => {
    if (!notes.trim()) {
      toast({
        title: "Brak notatek",
        description: "Dodaj notatki z sesji, aby wygenerować analizę AI",
        variant: "destructive",
      });
      return;
    }

    setGeneratingAI(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          messages: [
            { 
              role: "user", 
              content: `Jesteś doświadczonym psychoterapeutą. Na podstawie poniższych notatek z sesji terapeutycznej:

1. Napisz krótkie podsumowanie sesji (2-3 zdania)
2. Zaproponuj 2-3 robocze hipotezy kliniczne
3. Zasugeruj możliwe kierunki dalszej pracy terapeutycznej

Notatki z sesji:
${notes}

Odpowiedz w formacie:
PODSUMOWANIE:
[podsumowanie]

HIPOTEZY:
[hipotezy]

SUGESTIE:
[sugestie]`
            }
          ]
        }
      });

      if (error) throw error;

      // Parse the response - handle streaming response
      let responseText = "";
      if (typeof data === "string") {
        responseText = data;
      } else if (data?.choices?.[0]?.message?.content) {
        responseText = data.choices[0].message.content;
      } else if (data?.text) {
        responseText = data.text;
      }

      // Extract sections from response
      const summaryMatch = responseText.match(/PODSUMOWANIE:\s*([\s\S]*?)(?=HIPOTEZY:|$)/i);
      const hypothesesMatch = responseText.match(/HIPOTEZY:\s*([\s\S]*?)(?=SUGESTIE:|$)/i);
      const suggestionsMatch = responseText.match(/SUGESTIE:\s*([\s\S]*?)$/i);

      const summary = summaryMatch ? summaryMatch[1].trim() : "";
      const hypotheses = hypothesesMatch ? hypothesesMatch[1].trim() : "";
      const suggestions = suggestionsMatch ? suggestionsMatch[1].trim() : "";

      setAiSummary(summary);
      setAiHypotheses(`${hypotheses}\n\n${suggestions}`);

      toast({
        title: "Analiza gotowa",
        description: "AI wygenerowało podsumowanie i hipotezy",
      });
    } catch (error) {
      console.error('AI analysis error:', error);
      toast({
        title: "Błąd analizy AI",
        description: "Nie udało się wygenerować analizy. Sprawdź czy masz kredyty AI.",
        variant: "destructive",
      });
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Musisz być zalogowany",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("therapy_sessions").insert({
      patient_id: patientId,
      therapist_id: user.id,
      session_date: new Date(formData.get("session_date") as string).toISOString(),
      duration_minutes: parseInt(formData.get("duration_minutes") as string) || null,
      session_type: formData.get("session_type") as string,
      notes: notes,
      mood_before: formData.get("mood_before") as string || null,
      mood_after: formData.get("mood_after") as string || null,
      ai_summary: aiSummary || null,
      ai_insights: aiHypotheses ? { hypotheses: aiHypotheses } : null,
    });

    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Nie udało się zapisać sesji",
      });
      return;
    }

    toast({
      title: "Sukces",
      description: "Sesja została zapisana",
    });
    setNotes("");
    setAiSummary("");
    setAiHypotheses("");
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dodaj notatkę z sesji</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session_date">Data i czas sesji *</Label>
              <Input
                id="session_date"
                name="session_date"
                type="datetime-local"
                required
                defaultValue={new Date().toISOString().slice(0, 16)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration_minutes">Czas trwania (min)</Label>
              <Input
                id="duration_minutes"
                name="duration_minutes"
                type="number"
                defaultValue="50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="session_type">Typ sesji</Label>
            <Input
              id="session_type"
              name="session_type"
              defaultValue="individual"
              placeholder="np. individual, group, online"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mood_before">Nastrój przed sesją</Label>
              <Input id="mood_before" name="mood_before" placeholder="np. anxious, calm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mood_after">Nastrój po sesji</Label>
              <Input id="mood_after" name="mood_after" placeholder="np. relieved, hopeful" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="notes">Notatki z sesji</Label>
              <Button
                type="button"
                variant={recording ? "destructive" : "outline"}
                size="sm"
                onClick={recording ? stopRecording : startRecording}
              >
                {recording ? (
                  <>
                    <Square className="mr-2 h-4 w-4" />
                    Zatrzymaj
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    Nagraj
                  </>
                )}
              </Button>
            </div>
            <Textarea
              id="notes"
              name="notes"
              rows={8}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Opisz przebieg sesji, obserwacje, interwencje..."
            />
          </div>

          {/* AI Analysis Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Analiza AI</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateAIAnalysis}
                disabled={generatingAI || !notes.trim()}
              >
                {generatingAI ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analizuję...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generuj analizę AI
                  </>
                )}
              </Button>
            </div>

            {(aiSummary || aiHypotheses) && (
              <Card className="bg-muted/50">
                <CardContent className="pt-4 space-y-4">
                  {aiSummary && (
                    <div>
                      <h4 className="font-medium text-sm mb-1 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Podsumowanie
                      </h4>
                      <p className="text-sm text-muted-foreground">{aiSummary}</p>
                    </div>
                  )}
                  {aiHypotheses && (
                    <div>
                      <h4 className="font-medium text-sm mb-1 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Hipotezy i sugestie
                      </h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{aiHypotheses}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Anuluj
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Zapisywanie..." : "Zapisz sesję"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}