// src/components/AddressAutocomplete.js
import React, { useState } from "react";
import axios from "axios";

const AddressAutocomplete = ({ value, onSelect, disabled }) => {
    const [query, setQuery] = useState(value || "");
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (text) => {
        try {
            const res = await axios.get("https://api.locationiq.com/v1/autocomplete", {
                params: {
                    key: "pk.24dd778d8dd1fc6ddce25d0e57c8a035", // 👈 Replace this with your actual key
                    q: text,
                    limit: 5,
                    format: "json",
                    countrycodes: "IN",
                },
            });
            const gujaratResults = res.data.filter(place =>
                place.display_name.toLowerCase().includes("gujarat")
            );
            setSuggestions(gujaratResults);
            // setSuggestions(res.data);
        } catch (err) {
            console.error("Autocomplete error:", err);
        }
    };

    const handleChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 2) fetchSuggestions(val);
    };

    const handleSelect = (place) => {
        setQuery(place.display_name);
        setSuggestions([]);
        onSelect(place.display_name);
    };

    return (
        <div style={{ position: "relative" }}>
            <input
                type="text"
                className="form-control"
                value={query}
                onChange={handleChange}
                disabled={disabled}
                placeholder="Start typing address..."
            />
            {suggestions.length > 0 && (
                <ul className="list-group position-absolute w-100" style={{ zIndex: 10 }}>
                    {suggestions.map((place, idx) => (
                        <li
                            key={idx}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleSelect(place)}
                            style={{ cursor: "pointer" }}
                        >
                            {place.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressAutocomplete;
