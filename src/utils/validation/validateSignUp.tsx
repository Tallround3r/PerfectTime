export default function isValid(
	username: string, email: string, pass1: string, pass2: string, firstName: string, lastName: string,
) {
	return username !== ''
		&& firstName !== ''
		&& lastName !== ''
		&& pass1 !== ''
		&& pass1 === pass2
		&& !username.includes(' ')
		&& email.includes('@')
		&& email.includes('.');
}
