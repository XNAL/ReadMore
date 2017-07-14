<template>
    <section class="book-list-comm">
        <ol class="book-list-content">
            <li class="book-list-li book-list-li-comm" v-for="book in bookList" :key="book._id">
                <router-link :to="{ name: 'book', params: {id: book._id} }">
                    <img class="book-list-book-cover fl" :src="book.cover | setCover">
                    <template v-if="headerType === type">
                        <div class="book-list-book-info book-list-book-info-rank">
                            <h3 class="book-title">{{ book.title }}</h3>
                            <p class="book-info">
                                <span class="book-author fl gray">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-author"></use>
                                    </svg>
                                    {{ book.author }}
                                </span>
                            </p>
                            <p class="book-summary text-line-comm gray">{{ book.shortIntro }}</p>
                            <p class="book-info">
                                <span class="red">
                                    {{ book.retentionRatio | setRetentionRatio }}%留存
                                </span>
                                <span class="split-line">|</span>
                                <span class="blue">
                                    {{ book.latelyFollower | setLatelyFollower }}人气
                                </span>
                            </p>
                        </div>
                    </template>
                    <template v-else>
                        <div class="book-list-book-info">
                            <h3 class="book-title">{{ book.title }}</h3>
                            <p class="book-summary text-line-comm gray">{{ book.shortIntro }}</p>
                            <p class="book-info">
                                <span class="book-author fl gray">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-author"></use>
                                    </svg>
                                    {{ book.author }}
                                </span>
                                <span class="book-tags fr">
                                    <em class="small-tag red">{{ book.retentionRatio | setRetentionRatio }}%留存</em>
                                    <em class="small-tag blue">{{ book.latelyFollower | setLatelyFollower }}人气</em>
                                </span>
                            </p>
                        </div>
                    </template>
                </router-link>
            </li>
        </ol>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import api from '../fetch/api';
import { RANK_PAGE, FEATURED, staticPath } from '../util/util';

export default {
    name: 'bookList',
    props: {
        bookList: Array
    },
    data() {
        return {
            type: RANK_PAGE
        }
    },
	computed: {
		...mapState([
			'headerType'
		])
	},
    filters: {
        setLatelyFollower(latelyFollower) {
            return latelyFollower < 10000 ? latelyFollower : (latelyFollower / 10000).toFixed(1) + '万';
        },

        setRetentionRatio(retentionRatio) {
            return parseFloat(retentionRatio).toFixed(1);
        },

        setCover(cover) {
            if(cover.indexOf(staticPath) > -1) {
                return cover;
            }
            return staticPath + cover;
        }
    }
}
</script>

<style scoped lang="scss">
.book-list-comm {
    position: relative;

    .book-list-li {
        padding: 10px 15px 10px 0;
        border-bottom: 1px solid #f0f1f2;

        &.book-list-li-comm {
            padding-left: 10px;
        }

        a {
            display: block;
            overflow: hidden;
        }
        .book-list-book-cover {
            display: inline-block;
            width: 66px;
            height: 88px;
            margin-right: 10px;
        }

        .book-list-book-info {
            position: relative;
            overflow: hidden;

            .book-title {
                color: #333;
                line-height: 1;
                padding-top: 5px;
                margin-bottom: 8px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .book-summary {
                font-size: 12px;
                line-height: 1.6;
            }
            .book-info {
                overflow: hidden;
                margin-top: 8px;
                line-height: 1.2;

                span {
                    display: inline-block;
                }
                .book-author {
                    margin-top: 2px;
                    font-size: 13px;

                    .icon {
                        width: 16px;
                        height: 16px;
                    }
                }
                .book-tags {
                    margin: 3px 0;
                }
                em.small-tag {
                    font-size: 10px;
                    padding: 1px;
                }
                em.gray {
                    border: 1px solid #969ba3;
                }
                em.red {
                    border: 1px solid #ed424b;
                }
                em.blue {
                    border: 1px solid #4284ed;
                }
            }
        }
        .book-list-book-info-rank {
            .book-summary {
                -webkit-line-clamp: 1;
                margin: 5px 0;
            }
            .book-title {
                margin-bottom: 5px;
            }
            .book-info {
                margin-top: 8px;
                .split-line {
                    padding: 0 3px;
                }
            }
        }
    }
}
</style>
