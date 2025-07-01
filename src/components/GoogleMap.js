import { useEffect, useRef } from "react";

const GoogleMap = ({ bins, selectedBin, onBinClick }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Initialize map when component mounts
    if (window.google && mapRef.current && !mapInstanceRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.006 }, // Default to NYC
        zoom: 12,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });
      mapInstanceRef.current = map;
    }
  }, []);

  useEffect(() => {
    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Add markers for all bins
    if (mapInstanceRef.current && bins.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();

      bins.forEach((bin) => {
        const marker = new window.google.maps.Marker({
          position: bin.coordinates,
          map: mapInstanceRef.current,
          title: bin.name,
          icon: {
            url: getMarkerIcon(bin.status),
            scaledSize: new window.google.maps.Size(30, 30),
          },
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #2563eb; font-weight: bold;">${
                bin.id
              }</h3>
              <p style="margin: 4px 0; font-weight: 600;">${bin.name}</p>
              <p style="margin: 4px 0; color: #666;">${bin.location}</p>
              <p style="margin: 4px 0;">
                <span style="font-weight: 600;">Type:</span> ${bin.type}
              </p>
              <p style="margin: 4px 0;">
                <span style="font-weight: 600;">Capacity:</span> ${
                  bin.capacity
                }L (${bin.currentLevel}%)
              </p>
              <p style="margin: 4px 0;">
                <span style="font-weight: 600;">Status:</span> 
                <span style="color: ${getStatusColor(
                  bin.status
                )}; font-weight: 600;">${bin.status}</span>
              </p>
              <p style="margin: 4px 0; font-size: 12px; color: #888;">
                Last emptied: ${bin.lastEmptied}
              </p>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(mapInstanceRef.current, marker);
          if (onBinClick) {
            onBinClick(bin);
          }
        });

        markersRef.current.push(marker);
        bounds.extend(bin.coordinates);
      });

      // Fit map to show all markers
      if (bins.length > 1) {
        mapInstanceRef.current.fitBounds(bounds);
      } else if (bins.length === 1) {
        mapInstanceRef.current.setCenter(bins[0].coordinates);
        mapInstanceRef.current.setZoom(15);
      }
    }
  }, [bins, onBinClick]);

  useEffect(() => {
    // Center map on selected bin
    if (selectedBin && mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(selectedBin.coordinates);
      mapInstanceRef.current.setZoom(16);
    }
  }, [selectedBin]);

  const getMarkerIcon = (status) => {
    switch (status) {
      case "Active":
        return (
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="12" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
            <text x="15" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">B</text>
          </svg>
        `)
        );
      case "Full":
        return (
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="12" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
            <text x="15" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">B</text>
          </svg>
        `)
        );
      case "Maintenance":
        return (
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="12" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>
            <text x="15" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">B</text>
          </svg>
        `)
        );
      default:
        return (
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="12" fill="#6b7280" stroke="#ffffff" stroke-width="2"/>
            <text x="15" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">B</text>
          </svg>
        `)
        );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#10b981";
      case "Full":
        return "#ef4444";
      case "Maintenance":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
        borderRadius: "8px",
      }}
    />
  );
};

export default GoogleMap;
