/** Routes **/
export const LANDING = '/';

export const SIGN_IN = '/login';
export const SIGN_UP = '/register';

export const LOCATIONS = (tripId = `:${URL_PARAM_TRIP}`) => `/${tripId}/locations`;
export const LOCATIONS_ADD = '/locations/add';
export const LOCATIONS_EDIT = (tripId = `:${URL_PARAM_TRIP}`, locationId = `:${URL_PARAM_LOCATION}`) =>
	`/${tripId}/locations/${locationId}/edit`;

export const ACTIVITIES = '/activities';
export const ACTIVITY_ADD = '/activities/add';
export const ACTIVITY_EDIT = '/activities/edit';

export const MEMBERS = '/members';


/** URL parameter **/
export const URL_PARAM_TRIP = 'tripId';
export const URL_PARAM_LOCATION = 'locationId';