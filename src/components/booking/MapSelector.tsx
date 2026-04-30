"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix Leaflet's default icon path issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom Icons for Pickup and Dropoff
const pickupIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const dropoffIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export interface Locations {
  pickup: { lat: number; lng: number } | null;
  dropoff: { lat: number; lng: number } | null;
}

interface MapSelectorProps {
  onLocationSelect: (locations: Locations) => void;
  singlePointMode?: boolean;
}

function MapController({ 
  onLocationSelect, 
  singlePointMode 
}: MapSelectorProps & { 
  setRouteLine: (coords: [number, number][]) => void 
}) {
  const [pickup, setPickup] = useState<L.LatLng | null>(null);
  const [dropoff, setDropoff] = useState<L.LatLng | null>(null);
  const map = useMap();

  useEffect(() => {
    // Notify parent
    onLocationSelect({
      pickup: pickup ? { lat: pickup.lat, lng: pickup.lng } : null,
      dropoff: dropoff ? { lat: dropoff.lat, lng: dropoff.lng } : null
    });
  }, [pickup, dropoff]);

  useMapEvents({
    click(e) {
      if (singlePointMode) {
        setPickup(e.latlng);
        setDropoff(null);
      } else {
        if (!pickup) {
          setPickup(e.latlng);
        } else if (!dropoff) {
          setDropoff(e.latlng);
        } else {
          // Reset
          setPickup(e.latlng);
          setDropoff(null);
        }
      }
    },
  });

  return (
    <>
      {pickup && <Marker position={pickup} icon={pickupIcon}></Marker>}
      {dropoff && !singlePointMode && <Marker position={dropoff} icon={dropoffIcon}></Marker>}
    </>
  );
}

function ChangeView({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng]);
  }, [center, map]);
  return null;
}

export default function MapSelector({ onLocationSelect, singlePointMode = false }: MapSelectorProps) {
  const [routeLine, setRouteLine] = useState<[number, number][]>([]);
  const [center, setCenter] = useState({ lat: 41.0082, lng: 28.9784 }); // Default: Istanbul

  useEffect(() => {
    // Request current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLoc = { lat: latitude, lng: longitude };
          setCenter(userLoc);
          
          // Automatically set as pickup
          onLocationSelect({
            pickup: userLoc,
            dropoff: null
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const handleLocationChange = async (locs: Locations) => {
    onLocationSelect(locs);

    if (locs.pickup && locs.dropoff) {
      // Fetch route from OSRM
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${locs.pickup.lng},${locs.pickup.lat};${locs.dropoff.lng},${locs.dropoff.lat}?overview=full&geometries=geojson`;
        const res = await axios.get(url);
        if (res.data.routes && res.data.routes.length > 0) {
          const coords = res.data.routes[0].geometry.coordinates;
          // OSRM returns [lng, lat], Leaflet polyline expects [lat, lng]
          const latLngs = coords.map((c: number[]) => [c[1], c[0]]);
          setRouteLine(latLngs);
        }
      } catch (err) {
        console.error("Routing error:", err);
      }
    } else {
      setRouteLine([]);
    }
  };

  return (
    <div>
      <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
        {singlePointMode 
          ? "Haritaya tıklayarak mevcut konumunuzu belirleyin." 
          : "Haritaya sırayla tıklayarak Başlangıç ve Varış noktalarınızı seçin."}
      </div>
      <div style={{ height: "300px", width: "100%", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)" }}>
        <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <ChangeView center={center} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <MapController onLocationSelect={handleLocationChange} singlePointMode={singlePointMode} setRouteLine={setRouteLine} />
          {routeLine.length > 0 && <Polyline positions={routeLine} color="var(--yellow)" weight={4} />}
        </MapContainer>
      </div>
    </div>
  );
}
