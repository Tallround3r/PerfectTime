export default function isValid(email: string, password: string, passwordNew: string, passwordNewConfirm: string) {
	return password !== ''
		&& email.includes('@')
		&& email.includes('.')
		&& passwordNew !== ''
		&& passwordNewConfirm !== ''
		&& passwordNew == passwordNewConfirm;
}
