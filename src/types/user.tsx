export interface User {
	username: string,
	firstName: string,
	lastName: string,
	email: string,
	memberSince: Date,
	country?: string,
	language?: string,
}