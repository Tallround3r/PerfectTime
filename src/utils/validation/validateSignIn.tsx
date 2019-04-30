export default function isValid(email: string, password: string) {
	return password !== ''
		&& email.includes('@')
		&& email.includes('.');
}
