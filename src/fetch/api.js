import async from './fetch';

export default {
    getHomeData() {
        return async('/recommendPage/nodes/5910018c8094b1e228e5868f');
    },

    getBooks(id) {
        return async('/recommendPage/books/'+ id);
    }
}
