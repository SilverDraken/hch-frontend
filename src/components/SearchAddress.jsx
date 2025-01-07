import React, { useState } from 'react';

const AddressSearch = ({ onMatch }) => {
    const [address, setAddress] = useState('');
    const [zoneData, setZoneData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/match-address', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address }),
            });

            if (!response.ok) {
                throw new Error('No matching zone found');
            }

            const data = await response.json();
            setZoneData(data);
            onMatch(data); // Pass matched zone and technician to parent
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h3>Find a Technician</h3>
            <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: '300px', padding: '8px', marginRight: '10px' }}
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {zoneData && (
                <div>
                    <h4>Zone: {zoneData.zone}</h4>
                    <h4>Technician: {zoneData.technician}</h4>
                </div>
            )}
        </div>
    );
};

export default AddressSearch;
