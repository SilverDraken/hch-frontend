import React from 'react';
import InterventionList from '../components/InterventionList';
import InterventionForm from '../components/InterventionFormDialog';

const Interventions = () => (
    <div>
        <h1>Manage Interventions</h1>
        <InterventionList />
        <InterventionForm />
    </div>
);

export default Interventions;
