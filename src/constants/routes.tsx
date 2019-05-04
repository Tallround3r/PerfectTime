/* Routes */
export const LANDING = '/';

export const SIGN_IN = '/login';
export const SIGN_UP = '/register';

export const TRIPS = () => `/trips`;
export const TRIPS_ADD = () => `/trips/add`;
export const TRIP_VIEW = (tripId = `:${URL_PARAM_TRIP}`) => `/trips/${tripId}`;
export const TRIPS_EDIT = (tripId = `:${URL_PARAM_TRIP}`) => `/trips/${tripId}/edit`;
export const TRIP_MEMBERS = (tripId = `:${URL_PARAM_TRIP}`) => `/trips/${tripId}/members`;


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

export const USER = (userId = `:${URL_PARAM_USER}`) => `/user/${userId}`;
export const USER_EDIT = (userId = `:${URL_PARAM_USER}`) => `/user/${userId}/edit`;
export const USER_CHANGE_PASSWORD = (userId = `:${URL_PARAM_USER}`) => `/user/${userId}/changepw`;
export const USER_CHANGE_EMAIL = (userId = `:${URL_PARAM_USER}`) => `/user/${userId}/changeemail`;
export const USER_DELETE_ACCOUNT = (userId = `:${URL_PARAM_USER}`) => `/user/${userId}/deleteaccount`;

/* URL parameter */
export const URL_PARAM_TRIP = 'tripId';
export const URL_PARAM_LOCATION = 'locationId';
export const URL_PARAM_ACTIVITY = 'activityId';
export const URL_PARAM_USER = 'userId';
