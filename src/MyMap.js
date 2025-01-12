import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "./myMap.css";

function LocationMarker(props) {
  const { center } = props;

  //   const center = {
  //   lat: addressValue.lat,
  //   lng: addressValue.lng,
  // };

  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState([{ lat: 51.505, lng: -0.09 }]);
  const markerRef = useRef(null);

  useEffect(() => {
    if (center) {
      setPosition(() => center);
      console.log(center, "center");
      console.log(position, "position");
    }
  }, [center]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position && position.lat && position.lng ? (
    <>
      <p>
        latitude: {position.lat.toFixed(4)}, longitude:{" "}
        {position.lng.toFixed(4)}{" "}
      </p>
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
    </>
  ) : null;
}
function MyMap(props) {
  const { addressValue } = props;
  console.log("mymappppppppppppp", addressValue);

  return (
    <MapContainer
      className="map-container"
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={20}
      scrollWheelZoom={true}
    >
      <LocationMarker center={addressValue} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MyMap;
