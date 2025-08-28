import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Locate } from 'lucide-react';

interface MapboxMapProps {
  onLocationSelect?: (location: { lat: number; lng: number; address?: string }) => void;
  initialLocation?: { lat: number; lng: number };
  height?: string;
  searchAddress?: string;
}

// Mapbox public token - można bezpiecznie przechowywać w kodzie frontend
const MAPBOX_TOKEN = 'pk.eyJ1IjoidGVzdC11c2VyIiwiYSI6ImNrdjE5cG1tMzA5aWUyb3BiNnZzYjZkZmcifQ.example';

const MapboxMap: React.FC<MapboxMapProps> = ({
  onLocationSelect,
  initialLocation = { lat: 52.2297, lng: 21.0122 }, // Warszawa domyślnie
  height = '400px',
  searchAddress = ''
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [currentLocation, setCurrentLocation] = useState(initialLocation);
  const [address, setAddress] = useState(searchAddress);
  const [isUsingMapbox, setIsUsingMapbox] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Sprawdź czy użytkownik wprowadził swój token Mapbox
    if (MAPBOX_TOKEN === 'pk.eyJ1IjoidGVzdC11c2VyIiwiYSI6ImNrdjE5cG1tMzA5aWUyb3BiNnZzYjZkZmcifQ.example') {
      setIsUsingMapbox(false);
      return;
    }

    setIsUsingMapbox(true);
    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [currentLocation.lng, currentLocation.lat],
      zoom: 10
    });

    // Dodaj kontrolki nawigacyjne
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Dodaj marker
    marker.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([currentLocation.lng, currentLocation.lat])
      .addTo(map.current);

    // Obsługa przeciągania markera
    marker.current.on('dragend', () => {
      if (!marker.current) return;
      const lngLat = marker.current.getLngLat();
      const newLocation = { lat: lngLat.lat, lng: lngLat.lng };
      setCurrentLocation(newLocation);
      onLocationSelect?.(newLocation);
      
      // Reverse geocoding
      reverseGeocode(lngLat.lat, lngLat.lng);
    });

    // Obsługa kliknięcia na mapę
    map.current.on('click', (e) => {
      if (!marker.current) return;
      const { lat, lng } = e.lngLat;
      marker.current.setLngLat([lng, lat]);
      const newLocation = { lat, lng };
      setCurrentLocation(newLocation);
      onLocationSelect?.(newLocation);
      
      // Reverse geocoding
      reverseGeocode(lat, lng);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      if (data.features && data.features[0]) {
        setAddress(data.features[0].place_name);
      }
    } catch (error) {
      console.error('Błąd geokodowania:', error);
    }
  };

  const searchLocation = async (query: string) => {
    if (!query.trim() || !isUsingMapbox) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&country=PL&limit=1`
      );
      const data = await response.json();
      
      if (data.features && data.features[0]) {
        const [lng, lat] = data.features[0].center;
        const newLocation = { lat, lng };
        
        setCurrentLocation(newLocation);
        onLocationSelect?.({ ...newLocation, address: data.features[0].place_name });
        
        if (map.current && marker.current) {
          map.current.flyTo({ center: [lng, lat], zoom: 14 });
          marker.current.setLngLat([lng, lat]);
        }
        
        setAddress(data.features[0].place_name);
      }
    } catch (error) {
      console.error('Błąd wyszukiwania lokalizacji:', error);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const newLocation = { lat, lng };
        
        setCurrentLocation(newLocation);
        onLocationSelect?.(newLocation);
        
        if (map.current && marker.current) {
          map.current.flyTo({ center: [lng, lat], zoom: 14 });
          marker.current.setLngLat([lng, lat]);
        }
        
        reverseGeocode(lat, lng);
      },
      (error) => {
        console.error('Błąd pobierania lokalizacji:', error);
      }
    );
  };

  if (!isUsingMapbox) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Wpisz adres (np. Warszawa, ul. Marszałkowska 1)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                // Podstawowe wyszukiwanie bez Mapbox
                onLocationSelect?.({ lat: 52.2297, lng: 21.0122, address });
              }
            }}
          />
          <Button 
            type="button" 
            onClick={getCurrentLocation}
            variant="outline"
            size="icon"
          >
            <Locate className="h-4 w-4" />
          </Button>
        </div>
        <div className={`bg-muted rounded-lg flex items-center justify-center p-8`} style={{ height }}>
          <div className="text-center space-y-4">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <p className="font-medium mb-2">Mapa wymaga klucza Mapbox</p>
              <p className="text-sm text-muted-foreground">
                Aby korzystać z interaktywnej mapy, potrzebujesz tokenu Mapbox.<br />
                Uzyskaj go na <a href="https://mapbox.com/" target="_blank" rel="noopener" className="text-primary underline">mapbox.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Wpisz adres (np. Warszawa, ul. Marszałkowska 1)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              searchLocation(address);
            }
          }}
        />
        <Button 
          type="button" 
          onClick={() => searchLocation(address)}
          variant="outline"
        >
          <MapPin className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          onClick={getCurrentLocation}
          variant="outline"
          size="icon"
        >
          <Locate className="h-4 w-4" />
        </Button>
      </div>
      <div 
        ref={mapContainer} 
        className="rounded-lg border"
        style={{ height }}
      />
      <p className="text-xs text-muted-foreground">
        Kliknij na mapę lub przeciągnij marker aby wybrać lokalizację
      </p>
    </div>
  );
};

export default MapboxMap;