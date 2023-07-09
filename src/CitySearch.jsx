import { useState } from "react";
function CitySearch({ fetchAirQuality }) {
  const [inputValue, setInputValue] = useState("");

  const handleChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const city = inputValue.replace(/ /g, "-");
    fetchAirQuality(city);
  };
  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        placeholder="Enter City"
        onChange={handleChangeInput}
        className="form-control"
      />
      <button type="submit" className="btn btn-primary mt-3">
        Search
      </button>
    </form>
  );
}

export default CitySearch;
