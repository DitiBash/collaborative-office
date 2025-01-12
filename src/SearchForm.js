import React,{ useState } from "react";
import { Formik, Form, Field } from "formik";
// import { MapContainer } from 'react-leaflet/MapContainer'

//import "./SearchForm.css";

const SearchForm = (props) => {
  const{handleMarkerMove}=props;
  const [suggestions, setSuggestions] = useState([]);
  const [add, setAdd] = useState([]);

  const handleSearchAddress = (event) => {
    let query = event.target.value;
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`;
    if (query.length > 2) {
      console.log(query);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setAdd(data);
          console.log("data",add);
          const addresses = data.map((item) => item.display_name);
          setSuggestions(data);////
          
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } else {
      setSuggestions([]);
    }
  };
  const handleSubmit = (values) => {
    console.log(JSON.stringify(values));
  };
  return (
    <Formik
      initialValues={{
        username: "",
        address: "",
        phone: "",
        email: "",
        internet: "",
        kitchen: "",
        coffee: "",
        rooms: "",
        maxDistance: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <h1>מצא לי שותף</h1>
          <div className="form-group">
            <Field
              name="username"
              className="form-control"
              type="text"
              placeholder="שם משתמש"
            />
          </div>
          <Field
            type="text"
            name="address"
            className="form-control"
            //Nominatim-API
            onChange={(event) => {
              handleSearchAddress(event);
              setFieldValue("address", event.target.value);
            }}
            placeholder="כתובת לחיפוש"
          />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                   onClick={() => {
                    setFieldValue("address", suggestion.display_name);
                    handleMarkerMove(suggestion);
                  }}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
          <Field
            type="text"
            name="phone"
            className="form-control"
            placeholder="טלפון"
          />
          <Field
            name="email"
            type="email"
            className="form-control"
            placeholder="כתובת מייל"
          />
          ?האם נדרש חיבור לאינטרנט
          <div className="form-group">
            <label htmlFor="internet-yes"> כן</label>
            <Field type="radio" id="internet-yes" name="internet" value="yes" />
          </div>
          <div className="form-group">
            <label htmlFor="no"> לא</label>
            <Field type="radio" id="no" name="internet" value="no" />
          </div>
          ?האם נדרש מטבח
          <div className="form-group">
            <label htmlFor="kitchen-yes"> כן</label>
            <Field type="radio" id="kitchen-yes" name="kitchen" value="yes" />
          </div>
          <div className="form-group">
            <label htmlFor="kitchen-no"> לא</label>
            <Field type="radio" id="kitchen-no" name="kitchen" value="no" />
          </div>
          ?האם נדרשת מכונת קפה
          <div className="form-group">
            <label htmlFor="cofee-yes"> כן</label>
            <Field type="radio" id="cofee-yes" name="cofee" value="yes" />
          </div>
          <div className="form-group">
            <label htmlFor="cofee-no"> לא</label>
            <Field type="radio" id="cofee-no" name="cofee" value="no" />
          </div>
          <Field
            type="number"
            name="rooms"
            className="form-control"
            placeholder="מספר חדרים"
          />
          <Field
            type="number"
            name="maxDistance"
            className="form-control"
            placeholder="מרחק מקסימלי מהכתובת הרצויה"
          />
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              חפש
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
