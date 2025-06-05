
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Reply } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TherapistReviewsProps {
  therapistId: string;
  canAddReview?: boolean;
}

const TherapistReviews = ({ therapistId, canAddReview = false }: TherapistReviewsProps) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [newReview, setNewReview] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
    fetchResponses();
  }, [therapistId]);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('therapist_reviews_detailed')
      .select('*')
      .eq('therapist_id', therapistId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
    } else {
      setReviews(data || []);
    }
  };

  const fetchResponses = async () => {
    const { data, error } = await supabase
      .from('review_responses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching responses:', error);
    } else {
      setResponses(data || []);
    }
  };

  const addReview = async () => {
    if (!user || !newReview.trim()) return;

    setLoading(true);
    const { error } = await supabase
      .from('therapist_reviews_detailed')
      .insert({
        therapist_id: therapistId,
        client_id: user.id,
        comment: newReview.trim(),
        is_anonymous: isAnonymous
      });

    if (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się dodać opinii",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sukces",
        description: "Opinia została dodana",
      });
      setNewReview("");
      setIsAnonymous(false);
      fetchReviews();
    }
    setLoading(false);
  };

  const addResponse = async (reviewId: string) => {
    if (!user || !replyText.trim()) return;

    const authorType = therapistId === user.id ? 'therapist' : 'client';
    
    const { error } = await supabase
      .from('review_responses')
      .insert({
        review_id: reviewId,
        author_id: user.id,
        author_type: authorType,
        response_text: replyText.trim()
      });

    if (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się dodać odpowiedzi",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sukces",
        description: "Odpowiedź została dodana",
      });
      setReplyText("");
      setReplyingTo(null);
      fetchResponses();
    }
  };

  const getResponsesForReview = (reviewId: string) => {
    return responses.filter(response => response.review_id === reviewId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Opinie o terapeucie
          </CardTitle>
        </CardHeader>
        <CardContent>
          {canAddReview && user && (
            <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <Textarea
                placeholder="Napisz swoją opinię o terapeucie..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
                <Label htmlFor="anonymous">Opinia anonimowa</Label>
              </div>
              <Button 
                onClick={addReview} 
                disabled={!newReview.trim() || loading}
                className="bg-therapy-600 hover:bg-therapy-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Dodaj opinię
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Brak opinii o tym terapeucie</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">
                        {review.is_anonymous ? "Anonimowy klient" : "Klient"}
                      </p>
                      <p className="text-sm text-gray-500">{formatDate(review.created_at)}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700">{review.comment}</p>

                  {/* Responses */}
                  <div className="ml-4 space-y-3">
                    {getResponsesForReview(review.id).map((response) => (
                      <div key={response.id} className="bg-gray-50 p-3 rounded border-l-4 border-therapy-500">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant={response.author_type === 'therapist' ? 'default' : 'secondary'}>
                            {response.author_type === 'therapist' ? 'Terapeuta' : 'Klient'}
                          </Badge>
                          <p className="text-xs text-gray-500">{formatDate(response.created_at)}</p>
                        </div>
                        <p className="text-sm">{response.response_text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reply form */}
                  {user && (
                    <div className="ml-4">
                      {replyingTo === review.id ? (
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Napisz odpowiedź..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="min-h-[80px]"
                          />
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => addResponse(review.id)}
                              disabled={!replyText.trim()}
                            >
                              Dodaj odpowiedź
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText("");
                              }}
                            >
                              Anuluj
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setReplyingTo(review.id)}
                        >
                          <Reply className="h-3 w-3 mr-1" />
                          Odpowiedz
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TherapistReviews;
