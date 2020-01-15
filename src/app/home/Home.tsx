import React from 'react';

import LocationInfo from "components/locationInfo/LocationInfo";

const Home: React.FC = () => {
    return (
        <>
            <h2>Home</h2>
            <p>Hello World!</p>
            <p>This is a starter project for TSH React application. Click on navigation links above to learn more.</p>
            <hr />
            <LocationInfo />
        </>
    );
};

export default Home;