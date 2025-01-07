const TechnicianAvailability = ({ availability, onSelect }) => (
    <div>
        <h4>Available Time Slots</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {availability.map((slot) => (
                <button
                    key={slot}
                    onClick={() => onSelect(slot)}
                    style={{
                        padding: '10px',
                        border: '1px solid #007bff',
                        backgroundColor: 'white',
                        color: '#007bff',
                        cursor: 'pointer',
                    }}
                >
                    {slot}
                </button>
            ))}
        </div>
    </div>
);

export default TechnicianAvailability;
