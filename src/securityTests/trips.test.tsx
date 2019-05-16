import {auth, db} from '../firebase/firebase';
let faker = require('faker');

const randomValidEmail = faker.internet.email();
const randomValidPassword = faker.internet.password();
const randomValidNewPassword = faker.internet.password();

beforeEach(async () => {
	await auth.signInWithEmailAndPassword("Tim.Kertzscher@web.de", "!29041998*Ka1").catch((error) => {
		console.log(error.message);
	})
});

describe('view TRIPS', () => {
	it('is possible to view a TRIP if user is a member', async () => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				console.log(user.uid);
			}
		});
		let userRef = await db.collection('trips').doc('ZOFM9doZ8tKP1xd0c3Bf');
		let getUser = await userRef.get().then((snapshot) => {
			console.log(snapshot.data());
			// snapshot.forEach((doc) => {
			// 	console.log(doc.data());
			// });
		})
	});
});

// afterEach(() => {
// 	auth.signOut().then(() => {
// 		console.log('Sign-out successful.');
// 	}).catch((error) => {
// 		console.log(error.message);
// 	});
//
// });
//
// describe('password check', () => {
// });
//
// describe('new password check', () => {
// });




// Scenario: The user should not be able to see restricted area edit trip
//
// Scenario: The user should not be able to see restricted area add trip
//
// Scenario: The user should not be able to see restricted delete edit trip
//
