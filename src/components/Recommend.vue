<template>
    <section class="recommend">
        <template v-if="recommendList.length > 0">
            <h4>同类推荐
                <router-link :to="{ name: 'list', params: { id: curBook.id } }" class="more red">更多</router-link>
            </h4>
            <ul class="recommend-list">
                <li class="recommend-item" v-for="(recommend, index) in recommendList" v-if="index < 4" :key="recommend._id">
                    <img :src="recommend.cover | setCover" alt="recommend.title" class="cover">
                    <p>{{ recommend.title }}</p>
                </li>
            </ul>
        </template>
    </section>
</template>

<script>
import {mapState} from 'vuex';
import { staticPath } from '../util/util';
import api from '../fetch/api';

export default {
    name: 'recommend',
    data() {
        return {
            recommendList: []
        }
    },
    filters: {
        setCover(cover) {
            return staticPath + cover;
        }
    },
    computed: {
        ...mapState([
            'curBook'
        ])
    },
    created() {
        api.getRecommend(this.curBook.id)
            .then(data => {
                this.recommendList = data;
            })
    }
}
</script>

<style lang="scss">
.recommend {
    position: relative;
    overflow: hidden;

    h4 {
        font-weight: 400;
        font-size: 16px;
        color: #33373d;
        line-height: 1;
        border-left: 2px solid #ed424b;
        padding-left: 13px;
        margin: 10px 0;

        a {
            position: absolute;
            top: 12px;
            right: 15px;
            font-size: 13px;

            &::after {
                content: '>';
                display: inline-block;
                margin-left: 3px;
            }
        }
    }
    .recommend-list {
        position: relative;
        display: flex;

        .recommend-item {
            flex: 1;
            padding: 0 15px;
        }
        .cover {
            width: 60px;
            height: 80px;
        }
    }
}
</style>
