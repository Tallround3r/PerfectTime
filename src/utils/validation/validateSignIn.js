export default function isValid(email, password) {
	return email !== ''
		&& email.includes('@')
		&& password !== '';
}