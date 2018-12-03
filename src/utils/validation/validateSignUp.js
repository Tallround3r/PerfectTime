export default function isValid(username, email, pass1, pass2, firstName, lastName) {
	return username !== ''
		&& firstName !== ''
		&& lastName !== ''
		&& pass1 !== ''
		&& pass1 === pass2
		&& !username.includes(' ')
		&& email.includes('@')
		&& email.includes('.');
}