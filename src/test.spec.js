
import { next } from './store.js'
import { Search } from './search.js'

describe('next function', () => {
    it('should return an object with next in all CAPS', () => {
        expect(next()).toStrictEqual({ "type": "NEXT" })
    })
});
