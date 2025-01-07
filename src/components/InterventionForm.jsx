import React, { useState } from 'react';

const InterventionForm = ({ user }) => {
    const [address, setAddress] = useState(user?.address || ''); // Default address for logged-in users
    const [zoneData, setZoneData] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [formData, setFormData] = useState({
        type: '',
        bikeModel: '',
        dateOfIntervention: '',
        length: '', // Length in minutes
        client: {
            name: user?.name || '', // Default name for logged-in users
            address: user?.address || '', // Default address
            email: user?.email || '', // Default email
            phoneNumber: user?.phoneNumber || '', // Default phone number
        },
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch Technician Availability
    const fetchTechnicianAvailability = async (technicianId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/availability/${technicianId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch technician availability');
            }
            const availability = await response.json();
            setZoneData((prev) => ({ ...prev, availability }));
        } catch (err) {
            setError('Unable to fetch technician availability. Please try again later.');
        }
    };

    // Handle Address Search
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
            setZoneData({
                zoneId: data.zoneId,
                technicianId: data.technicianId,
                zone: data.zone,
                technician: data.technician,
                availability: [], // Initialize with empty array, will fetch next
            });
            setError(null);

            // Fetch availability for the technician
            if (data.technicianId) {
                fetchTechnicianAvailability(data.technicianId);
            }
        } catch (err) {
            setError(err.message);
            setZoneData(null);
        }
    };

    // Handle Time Slot Selection
    const handleTimeSlotSelect = (slot) => {
        setSelectedTime(slot);
    };

    // Handle Form Data Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('client.')) {
            const clientField = name.split('.')[1];
            setFormData((prevState) => ({
                ...prevState,
                client: { ...prevState.client, [clientField]: value },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const interventionData = {
                ...formData,
                time: `${selectedTime.start}-${selectedTime.end}`, // Convert to string
                zoneId: zoneData?.zoneId || null,
                technicianId: zoneData?.technicianId || null,
            };
    
            const response = await fetch('http://127.0.0.1:8000/interventions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(interventionData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create intervention');
            }
    
            setSuccess('Intervention created successfully!');
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <div>
            <h2>Create an Intervention</h2>

            {/* Address Search Section */}
            {!zoneData && (
                <div>
                    <h3>Step 1: Search for Your Address</h3>
                    <input
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ width: '300px', padding: '8px', marginRight: '10px' }}
                    />
                    <button onClick={handleSearch} style={{ padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
                        Search
                    </button>
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                </div>
            )}

            {/* Time Frame Selection Section */}
            {zoneData && !selectedTime && zoneData.availability && (
                <div>
                    <h3>Step 2: Select a Time Frame</h3>
                    <h4>Zone: {zoneData.zone}</h4>
                    <h4>Technician: {zoneData.technician}</h4>
                    {zoneData.availability.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                            {zoneData.availability.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => handleTimeSlotSelect(slot)}
                                    style={{
                                        padding: '10px',
                                        border: selectedTime === slot ? '2px solid #28a745' : '1px solid #007bff',
                                        backgroundColor: selectedTime === slot ? '#28a745' : '#fff',
                                        color: selectedTime === slot ? '#fff' : '#007bff',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                    }}
                                >
                                    {slot.start} - {slot.end}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p>No available time slots for this technician. Please try another date or zone.</p>
                    )}
                </div>
            )}

            {/* Full Intervention Form */}
            {selectedTime && (
                <div>
                    <h3>Step 3: Complete the Intervention Details</h3>
                    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Type of Intervention:</label>
                            <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Bike Model:</label>
                            <input
                                type="text"
                                name="bikeModel"
                                value={formData.bikeModel}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Date of Intervention:</label>
                            <input
                                type="date"
                                name="dateOfIntervention"
                                value={formData.dateOfIntervention}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Length of Intervention (minutes):</label>
                            <input
                                type="number"
                                name="length"
                                value={formData.length}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                        </div>
                        <div>
                            <h4>Client Information:</h4>
                            <div style={{ marginBottom: '10px' }}>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="client.name"
                                    value={formData.client.name}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label>Address:</label>
                                <input
                                    type="text"
                                    name="client.address"
                                    value={formData.client.address}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="client.email"
                                    value={formData.client.email}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label>Phone Number:</label>
                                <input
                                    type="tel"
                                    name="client.phoneNumber"
                                    value={formData.client.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', marginTop: '20px' }}
                        >
                            Submit Intervention
                        </button>
                    </form>
                    {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default InterventionForm;
