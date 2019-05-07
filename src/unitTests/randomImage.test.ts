let faker = require('faker');
import {getRandomImage} from '../utils/RessourceUtils'

describe('image check', () => {
    it('returns an image', () => {
        expect(getRandomImage()).toContain('.jpg');
    });
});
