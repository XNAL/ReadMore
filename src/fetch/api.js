import async from './fetch';

export default {
    getHomeData(params) {
        return async('/recommendPage/nodes/5910018c8094b1e228e5868f', params, 'get');
    }
}
