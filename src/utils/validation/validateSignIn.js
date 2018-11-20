export default function isValid(email, password) {
	return password !== ''
		&& email.includes('@')
		&& email.includes('.');
}