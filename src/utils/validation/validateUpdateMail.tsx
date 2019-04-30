export default function isValid(email: string, emailNew: string, password: string) {
	return password !== ''
		&& email.includes('@')
		&& email.includes('.')
		&& emailNew.includes('@')
		&& emailNew.includes('.');
}
