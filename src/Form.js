// import { MapContainer } from 'react-leaflet/MapContainer'
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  MapPlaceholder,
} from "react-leaflet";

import "./form.css";
const Form = () => {
  return (
    <div className="container">
      {/* <MapContainer
        center={[51.505, -0.09]}
        zoom={20}
        scrollWheelZoom={true}
        // placeholder={<MapPlaceholder />}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer> */}
      <form>
        <h1>מצא לי שותף</h1>
        <input type="text" placeholder="שם משתמש" />
        <input
          type="text"
          id="address"
          Nominatim-API
          placeholder="כתובת לחיפוש"
        />
        <input type="text" placeholder="טלפון" />
        <input type="email" placeholder="כתובת מייל" />
        <br />
        האם נדרש חיבור לאינטרנט?
        <input type="radio" id="yes" name="internet" value="yes" />
        <label for="yes"> כן</label>
        <input type="radio" id="no" name="internet" value="no" />
        <label for="no"> לא</label>
        <br />
        ?האם נדרש מטבח
        <input type="radio" id="yes" name="kitchen" value="yes" />
        <label for="yes"> כן</label>
        <input type="radio" id="no" name="kitchen" value="no" />
        <label for="no"> לא</label> <br />
        ?האם נדרשת מכונת קפה
        <input type="radio" id="yes" name="cofee" value="yes" />
        <label for="yes"> כן</label>
        <input type="radio" id="no" name="cofee" value="no" />
        <label for="no"> לא</label>
        <br />
        <input type="number" placeholder="מספר חדרים" />
        <input type="number" placeholder="מרחק מקסימלי מהכתובת הרצויה" />
        <input type="submit" value="חפש" />
      </form>
    </div>
  );
};

export default Form;
