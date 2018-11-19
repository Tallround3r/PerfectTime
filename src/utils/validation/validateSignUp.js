export default function isValid(username, email, pass1, pass2) {
	return username !== ''
		&& email !== ''
		&& pass1 !== ''
		&& pass1 === pass2
		&& email.includes('@');
}