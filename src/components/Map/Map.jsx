import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

// Define container style and initial center position
const containerStyle = {
  width: "100%",
  height: "500px",
  position: "relative",
};

// Set the center to Tunis, Tunisia
const center = {
  lat: 36.8065,
  lng: 10.1815,
};

// Array of marker positions in Tunisia
const locations = [
  { lat: 36.8065, lng: 10.1815, name: "Tunis" },
  { lat: 36.8372, lng: 10.1875, name: "La Marsa" },
  { lat: 36.7578, lng: 10.1859, name: "Carthage" },
  { lat: 36.7985, lng: 10.1925, name: "Sidi Bou Saïd" },
];

// Define custom map styles
const mapStyles = [
  {
    featureType: "all", // Apply to all elements
    elementType: "geometry",
    stylers: [{ color: "#cccccc" }], // Light gray for most elements
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#aaaaaa" }], // Darker gray for roads
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }], // Hide road labels (optional)
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#999999" }], // Even darker gray for POIs
  },
];

const Card = ({ location }) => {
  return (
    <div
      style={{
        transform: "scale(0.8)",
        position: "absolute",
        width: "40%",
        minWidth: "200px",
        top: "0px",
        right: "0px",
        alignItems: "center",
        flexWrap: "wrap",
        display: "flex",
        background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <img
        style={{ width: "200px", height: "200px" }}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjjd8O_Od3xweknGa7RVxt17spj_2S7fVpiw&s"
      />
      <div style={{ padding: "10px" }}>
        <h6 style={{ textAlign: "center" }}>{location.name}</h6>
        <p>Latitude: {location.lat}</p>
        <p>Longitude: {location.lng}</p>
      </div>
    </div>
  );
};

const Map = () => {
  // State to manage the selected marker
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ position: "relative" }}>
      <LoadScript googleMapsApiKey="AIzaSyCz7OmCHc00wzjQAp4KcZKzzNK8lHCGkgo">
        <GoogleMap
          mapContainerStyle={containerStyle}
          streetView={false}
          center={center}
          zoom={12}
          options={{ styles: mapStyles }} // Apply custom styles here
        >
          {/* Add markers */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={location}
              onClick={() => setSelected(location)} // Set the selected marker
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Display the custom card if a marker is selected */}
      {selected && <Card location={selected} />}
    </div>
  );
};

export default Map;
