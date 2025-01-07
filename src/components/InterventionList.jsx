import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Correct import path
import { getUserInterventions } from '../api/api';

const InterventionList = () => {
    const { user } = useContext(AuthContext);
    const [interventions, setInterventions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            const fetchInterventions = async () => {
                try {
                    const data = await getUserInterventions(user.id);
                    setInterventions(data);
                } catch (err) {
                    setError('Failed to load interventions');
                }
            };
            fetchInterventions();
        }
    }, [user]);

    if (!user) {
        return <p>Please log in to view interventions.</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Your Interventions</h2>
            <ul>
                {interventions.map((intervention) => (
                    <li key={intervention.id}>
                        <strong>{intervention.type}</strong> - {intervention.client.name} ({intervention.dateOfIntervention} - {intervention.time}) | [{intervention.client.address}]
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InterventionList;
