import {auth, db} from '../firebase/firebase';

// let faker = require('faker');

let userBruceLee: any;
let userTimTester: any;
// let dbRef: any;

// const randomUserID = faker.random.uuid();
// const randomUsername = faker.internet.userName();

beforeEach(async () => {
	// @ts-ignore
	await auth.signInWithEmailAndPassword(process.env.MAIL_BRUCE_LEE, process.env.PASS_BRUCE_LEE);

	// dbRef = await db.collection('users');
	userTimTester = await db.collection('users').doc(process.env.ID_TIM_TESTER);
	userBruceLee = await db.collection('users').doc(process.env.ID_BRUCE_LEE);
});

// describe('create USERS', () => {
// 	it('is possible to create USERs', async () => {
// 		let userGetCreated = false;
//
// 		await auth.signOut();
//
// 		await dbRef.doc(randomUserID).set({username: randomUsername}).then(() => {
// 			userGetCreated = true;
// 		}).catch((err: string) => {
// 			userGetCreated = false;
// 		});
// 		expect(userGetCreated).toBe(true)
// 	});
// });

describe('view USERS', () => {
	it('is possible to view the own USER data', async () => {
		let userOneData = {username: ''};
		await userBruceLee.get().then((snapshot: any) => {
			userOneData = snapshot.data();
		}).catch((err: string) => {
			console.log('Error getting document', err);
		});
		expect(userOneData.username).toEqual('testuser2');
	});

	it('is possible to view other USERs data', async () => {
		let userTwoData = {username: ''};
		await userTimTester.get().then((snapshot: any) => {
			userTwoData = snapshot.data();
		}).catch((err: string) => {
			console.log('Error getting document', err);
		});
		expect(userTwoData.username).toBe('testuser1');
	});

	// it('is not possible to view USER data as not logged in', async () => {
	// 	await auth.signOut();
	//
	// 	let userIsAbleToView = true;
	// 	await userTimTester.get().then(() => {
	// 		userIsAbleToView = true;
	// 	}).catch(() => {
	// 		userIsAbleToView = false
	// 	});
	// 	expect(userIsAbleToView).toBe(false);
	// });
});

describe('edit USERS', () => {
	it('is possible to change own USER data', async () => {
		let dataHasChanged = false;
		await userBruceLee.update({username: 'imChanged'}).then(() => {
			dataHasChanged = true;
		}).catch((error: string) => {
			throw new Error(error)
		});
		expect(dataHasChanged).toBe(true)
	});

	it('is not possible to change other USERs data', async () => {
		let errorGetsThrown = false;
		await userTimTester.update({username: 'iShouldNotChange'}).then(() => {
			errorGetsThrown = false;
		}).catch(() => {
			errorGetsThrown = true;
		});
		expect(errorGetsThrown).toBe(true)
	});
});

describe('delete USERS', () => {
	// it('is possible to delete own USER', async () => {
	// let userDeleted = false;
	// 	await userBruceLee.delete().then(() => {
	// 		userDeleted = true;
	// 	}).catch(() => {
	// 		userDeleted = false;
	// 	});
	// 	expect(userDeleted).toBe(true)
	// });

	it('is not possible to delete other USERs', async () => {
		let errorGetsThrown = false;
		await userTimTester.delete().then(() => {
			errorGetsThrown = false;
		}).catch(() => {
			errorGetsThrown = true;
		});
		expect(errorGetsThrown).toBe(true)
	});
});

afterEach(async () => {
	await userBruceLee.update({username: 'testuser2'});
	auth.signOut().then(() => {
		return;
	});
});
