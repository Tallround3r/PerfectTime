import {GeoPoint} from './geoPoint';

export interface Address {
	city: string,
	country: string,
	street?: string,
	streetNumber?: number | string,
	zipCode?: string,
	geoPoint?: GeoPoint,
}