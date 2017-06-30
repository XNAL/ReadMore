import async from './fetch';

export default {
    getFeaturedData() {
        return async('/recommendPage/nodes/5910018c8094b1e228e5868f')
                .then(data => { return data.data });
    },

    getBooks(id) {
        return async('/recommendPage/books/'+ id)
                .then(data => { return data.data });
    },

    getSwiperPictures() {
        return async('/recommendPage/node/spread/575f74f27a4a60dc78a435a3', { pl: 'ios' })
                .then(data => { return data.data });
    },

    getCategory() {
        return async('/cats/lv2/statistics');
    },

    getRanks() {
        return async('/ranking/gender');
    },

    getRankBooks(id) {
        return async('/ranking/'+ id);
    }
}
