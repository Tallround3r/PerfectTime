/** Routes **/
export const LANDING = '/';

export const SIGN_IN = '/login';
export const SIGN_UP = '/register';

export const TRIPS = () => `/trips`;
export const TRIPS_ADD = () => `/trips/add`;
// export const TRIPS_VIEW = () => `/trips/${tripId}`;

export const LOCATIONS = (tripId = `:${URL_PARAM_TRIP}`) => `/trips/${tripId}/locations`;
export const LOCATIONS_VIEW = (tripId = `:${URL_PARAM_TRIP}`, locationId = `:${URL_PARAM_LOCATION}`) =>
	`/trips/${tripId}/locations/${locationId}`;
export const LOCATIONS_ADD = (tripId = `:${URL_PARAM_TRIP}`) => `/trips/${tripId}/locations/add`;
export const LOCATIONS_EDIT = (tripId = `:${URL_PARAM_TRIP}`, locationId = `:${URL_PARAM_LOCATION}`) =>
	`/trips/${tripId}/locations/${locationId}/edit`;

export const ACTIVITY_ADD = (tripId = `:${URL_PARAM_TRIP}`, locationId = `:${URL_PARAM_LOCATION}`) =>
	`/trips/${tripId}/locations/${locationId}/activity/add`;
export const ACTIVITY_EDIT = (tripId = `:${URL_PARAM_TRIP}`, locationId = `:${URL_PARAM_LOCATION}`, activityId = `:${URL_PARAM_ACTIVITY}`) =>
	`/trips/${tripId}/locations/${locationId}/activity/${activityId}/edit`;
export const ACTIVITY_VIEW = (tripId = `:${URL_PARAM_TRIP}`, locationId = `:${URL_PARAM_LOCATION}`, activityId = `:${URL_PARAM_ACTIVITY}`) =>
	`/trips/${tripId}/locations/${locationId}/activity/${activityId}`;

export const MEMBERS = '/members';


/** URL parameter **/
export const URL_PARAM_TRIP = 'tripId';
export const URL_PARAM_LOCATION = 'locationId';
export const URL_PARAM_ACTIVITY = 'activityId';
