import React from 'react';
import AppWrapper from '../components/AppWrapper';
import TripsPage from './TripsPage';

function TripRoute() {
	// @ts-ignore
	return <AppWrapper>
		<TripsPage/>
	</AppWrapper>;
}

export default TripRoute;
