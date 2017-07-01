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


// {"ranking":
// {"_id":"54d42d92321052167dfb75e3",
// "updated":"2017-06-30T06:21:20.771Z","title":"追书最热榜 Top100",
// "tag":"zhuishuLatelyFollowerMale",
// "cover":"/ranking-cover/142319144267827","icon":"/cover/148945782817557","__v":936,
// "monthRank":"564d820bc319238a644fb408",
// "totalRank":"564d8494fe996c25652644d2",
// "shortTitle":"最热榜",
// "created":"2017-06-30T12:21:22.462Z","isSub":false,"collapse":false,"new":true,
// "gender":"male","priority":250,
