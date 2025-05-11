// src/App.jsx
import { API_URL } from './config';
import React, { useState } from "react";
import axios from "axios";

const App = () => {
 

  const [jsonInput, setJsonInput] = useState("{\"data\": [\"A\", \"1\", \"z\"]");
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [filters, setFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed.data || !Array.isArray(parsed.data)) {
        setError("JSON must have a 'data' array.");
        return;
      }
      setError("");

      const res = await axios.post(`${API_URL}/bhfl`, parsed);
      setResponseData(res.data);
      console.log(res.data);
    } catch (err) {
      setError("Invalid JSON or server error.");
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">JSON Input</h1>
      <textarea
        rows="5"
        className="border p-2 w-full rounded"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      ></textarea>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <button
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {responseData && (
        <div className="mt-6">
          <label className="block mb-2 font-semibold">Filter Options:</label>
          <select multiple className="border p-2 rounded" onChange={handleFilterChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>

          <div className="mt-4">
            {filters.includes("alphabets") && (
              <div>
                <strong>Alphabets:</strong> {JSON.stringify(responseData.alphabets)}
              </div>
            )}
            {filters.includes("numbers") && (
              <div>
                <strong>Numbers:</strong> {JSON.stringify(responseData.numbers)}
              </div>
            )}
            {filters.includes("highest_lowercase_alphabet") && (
              <div>
                <strong>Highest Lowercase Alphabet:</strong>{" "}
                {JSON.stringify(responseData.highest_lowercase_alphabet)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;