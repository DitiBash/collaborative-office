import React,{ useState } from "react";
import "./App.css";
import SearchForm from "./SearchForm";
import MyMap from "./MyMap";

function App() {
  const [address, setAddress] = useState({});
  const onValueToMarker=(value)=>{
    console.log("from app",value);
    setAddress(value);
  }
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <SearchForm handleMarkerMove={onValueToMarker} />
          </div>
          <div className="col-6">
            <MyMap addressValue={address}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
