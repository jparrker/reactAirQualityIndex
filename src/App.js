import "./App.css";
import { useState } from "react";
import PollutantInfo from "./PollutantInfo";
import AirQualityCard from "./AirQualityCard";
import AirQualityLevelsTable from "./AirQualityLevelsTable";
import CitySearch from "./CitySearch";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [airQuality, setAirQuality] = useState(null);
  const [error, setError] = useState(null);

  const fetchAirQuality = async (city) => {
    try {
      const res = await fetch(
        `https://api.waqi.info/feed/${city}/?token=78435550a2067bd19fb34e4941725c3ae15abd63`
      );
      const data = await res.json();
      console.log(data);
      if (res.ok && data.status === "ok") {
        setAirQuality(data.data);
        setError(null);
      } else {
        setError("We couldn't find what you were looking for");
        setAirQuality(null);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later");
      setAirQuality(null);
    }
  };
  return (
    <div className="container">
      <h1 className="mt-5 mb-3">Air Quality Index</h1>
      <CitySearch fetchAirQuality={fetchAirQuality} />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {airQuality && (
        <>
          <AirQualityCard data={airQuality} />
          <PollutantInfo pollutant={airQuality.dominentpol} />
        </>
      )}
      <AirQualityLevelsTable />
      <p>
        Air quality data sourced from the World Air Quality Index Project.{" "}
        <a href="https://aqicn.org/api/">aqicn.org</a>
      </p>
    </div>
  );
}

export default App;
