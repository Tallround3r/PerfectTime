export interface User {
	[key: string]: string | Date | undefined,

	id?: string,
	username: string,
	firstName: string,
	lastName: string,
	email: string,
	memberSince: Date,
	country?: string,
	language?: string,
}