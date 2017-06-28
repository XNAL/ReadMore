import async from './fetch';

export default {
    getFeaturedData() {
        return async('/recommendPage/nodes/5910018c8094b1e228e5868f');
    },

    getBooks(id) {
        return async('/recommendPage/books/'+ id);
    },

    getSwiperPictures() {
        return async('/recommendPage/node/spread/575f74f27a4a60dc78a435a3', { pl: 'ios' });
    }
}
