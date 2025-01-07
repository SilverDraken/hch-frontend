const BASE_URL = 'http://127.0.0.1:8000'; // Symfony backend URL

export const loginUser = async (credentials) => {
    const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
    }

    return response.json(); // Return user data
};


export const getUserInterventions = async (userId) => {
    const response = await fetch(`${BASE_URL}/interventions?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch interventions');
    }
    return response.json();
};

// Fetch all interventions
export const getInterventions = async () => {
    const response = await fetch(`${BASE_URL}/interventions`);
    if (!response.ok) {
        throw new Error(`Error fetching interventions: ${response.statusText}`);
    }
    return response.json();
};

// Fetch a single intervention
export const getIntervention = async (id) => {
    const response = await fetch(`${BASE_URL}/interventions/${id}`);
    if (!response.ok) {
        throw new Error(`Error fetching intervention: ${response.statusText}`);
    }
    return response.json();
};

// Create a new intervention
export const createIntervention = async (data) => {
    const response = await fetch(`${BASE_URL}/interventions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Error creating intervention: ${response.statusText}`);
    }
    return response.json();
};

// Update an intervention
export const updateIntervention = async (id, data) => {
    const response = await fetch(`${BASE_URL}/interventions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Error updating intervention: ${response.statusText}`);
    }
    return response.json();
};

// Delete an intervention
export const deleteIntervention = async (id) => {
    const response = await fetch(`${BASE_URL}/interventions/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Error deleting intervention: ${response.statusText}`);
    }
    return response.json();
};
