import {auth, db} from '../firebase/firebase';

const faker = require('faker');

const fakeTitle = faker.address.country();
const randomTripID = faker.random.uuid();
const fakeDescription = faker.lorem.text();
const fakeStartDate = faker.date.recent();
const fakeEndDate = faker.date.future(1);

let userBruceLee: any;
let userTimTester: any;
let dbTripRef: any;

beforeEach(async () => {
	// @ts-ignore
	await auth.signInWithEmailAndPassword(process.env.MAIL_BRUCE_LEE, process.env.PASS_BRUCE_LEE);

	dbTripRef = await db.collection('TRIPS');
	userTimTester = await db.collection('users').doc(process.env.ID_TIM_TESTER);
	userBruceLee = await db.collection('users').doc(process.env.ID_BRUCE_LEE);
});

describe('create TRIPS', () => {

	const trip = {
		title: fakeTitle,
		description: fakeDescription,
		startdate: fakeStartDate,
		enddate: fakeEndDate,
		public: false,
		owner: process.env.ID_BRUCE_LEE,
		members: [process.env.ID_TIM_TESTER],
	};

	it('is possible to create a TRIP for logged in user', async () => {
		let tripCreated = false;

		await dbTripRef.doc(randomTripID).set(trip).then(() => {
			tripCreated = true;
		}).catch(() => {
			tripCreated = false;
		});

		expect(tripCreated).toBe(true);
	});

	it('is not possible to create a TRIP as not logged in', async () => {
		await auth.signOut();

		let tripCreated = true;

		await dbTripRef.doc(randomTripID).set(trip).then(() => {
			tripCreated = true;
		}).catch(() => {
			tripCreated = false;
		});

		expect(tripCreated).toBe(false);
	});
});

describe('view TRIPS', () => {
	it('is possible to view a private TRIP if user is owner', async () => {
		let tripData = {title: ''};

		await dbTripRef.doc(randomTripID).get().then((snapshot: any) => {
			tripData = snapshot.data();
		}).catch((err: string) => {
			throw new Error(err);
		});

		expect(tripData.title).toEqual(fakeTitle);
	});

	it('is possible to view a private TRIP if user is a member', async () => {
		await auth.signOut();
		// @ts-ignore
		await auth.signInWithEmailAndPassword(process.env.MAIL_TIM_TESTER, process.env.PASS_TIM_TESTER);

		let tripData = {title: ''};

		await dbTripRef.doc(randomTripID).get().then((snapshot: any) => {
			tripData = snapshot.data();
		}).catch((err: string) => {
			throw new Error(err);
		});

		expect(tripData.title).toEqual(fakeTitle);
	});

	it('is not possible to view a private TRIP as not logged in', async () => {
		await auth.signOut();

		let gotTrip = true;

		await dbTripRef.doc(randomTripID).get().then((snapshot: any) => {
			gotTrip = true;
		}).catch(() => {
			gotTrip = false;
		});

		expect(gotTrip).toBe(false);
	});
});
//
describe('edit TRIPS', () => {
	it('is possible to edit a TRIP if user is owner', async () => {
		let dataHasChanged = false;
		await dbTripRef.doc(randomTripID).update({title: 'imChanged'}).then(() => {
			dataHasChanged = true;
		}).catch((error: string) => {
			throw new Error(error)
		});
		expect(dataHasChanged).toBe(true)
	});

	it('is possible to edit a TRIP if user is a member', async () => {
		await auth.signOut();
		// @ts-ignore
		await auth.signInWithEmailAndPassword(process.env.MAIL_TIM_TESTER, process.env.PASS_TIM_TESTER);

		let dataHasChanged = false;
		await dbTripRef.doc(randomTripID).update({title: 'imChangedAgain'}).then(() => {
			dataHasChanged = true;
		}).catch((error: string) => {
			throw new Error(error)
		});
		expect(dataHasChanged).toBe(true)
	});

	it('is not possible to edit a TRIP as not logged in', async () => {
		await auth.signOut();

		let dataHasChanged = true;
		await dbTripRef.doc(randomTripID).update({title: 'imChangedAThirdTime'}).then(() => {
			dataHasChanged = true;
		}).catch(() => {
			dataHasChanged = false;
		});
		expect(dataHasChanged).toBe(false)
	});
});

describe('delete TRIPS', () => {
	it('is not possible to delete a TRIP as member', async () => {
		await auth.signOut();
		// @ts-ignore
		await auth.signInWithEmailAndPassword(process.env.MAIL_TIM_TESTER, process.env.PASS_TIM_TESTER);

		let tripDeleted = true;

		await dbTripRef.doc(randomTripID).delete().then(() => {
			tripDeleted = true;
		}).catch(() => {
			tripDeleted = false;
		});
		expect(tripDeleted).toBe(false)
	});

	it('is not possible to delete a TRIP as not logged in', async () => {
		await auth.signOut();

		let tripDeleted = true;

		await dbTripRef.doc(randomTripID).delete().then(() => {
			tripDeleted = true;
		}).catch(() => {
			tripDeleted = false;
		});
		expect(tripDeleted).toBe(false)
	});

	it('is possible to delete a TRIP as owner', async () => {
		let tripDeleted = false;

		await dbTripRef.doc(randomTripID).delete().then(() => {
			tripDeleted = true;
		}).catch(() => {
			tripDeleted = false;
		});
		expect(tripDeleted).toBe(true)
	});

});

afterEach(() => {
	auth.signOut().then(() => {
		return;
	});
});
