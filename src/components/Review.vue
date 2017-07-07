<template>
    <section class="review">
        <template  v-if="reviewList.length > 0">
            <h2>热门书评</h2>
            <ul class="review-list">
                <li class="review-item" v-for="review in reviewList" :key="review._id">
                    <img :src="review.author.avatar | setAvatar" alt="review.author.nickname" class="avatar">
                    <div class="review-content">
                        <p class="name">
                            {{ review.author.nickname }}
                            <span class="time fr">{{ review.updated | time }}</span>
                        </p>
                        <p class="title">{{ review.title }}</p>
                        <p class="content text-line-comm">{{ review.content }}</p>
                        <p class="like">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-like"></use>
                            </svg>
                            {{ review.likeCount }}
                        </p>
                    </div>
                </li>
            </ul>
        </template>
    </section>
</template>

<script>
import {mapState} from 'vuex';
import api from '../fetch/api';
import {staticPath} from '../util/util';
import moment from 'moment';

export default {
    name: 'review',
    data() {
        return {
            reviewList: []
        }
    },
	filters: {
		time(update) {
			return moment(update).format('YYYY-MM-DD');
		},
        setAvatar(avatar) {
            return staticPath + avatar;
        }
	},
    computed: {
        ...mapState([
            'curBook'
        ])
    },
    created() {
        this.staticPath = staticPath;
        api.getReview(this.curBook.id)
            .then(data => {
                this.reviewList = data;
            })
    }
}
</script>

<style lang="scss">
.review {
    position: relative;
    padding-left: 15px;
    overflow: hidden;
    border-bottom: 10px solid #f6f7f9;

    h2 {
        line-height: 1;
        padding-top: 10px;
        font-weight: 400;
    }

    .review-list {
        position: relative;
        overflow: hidden;
    }

    .review-item {
        position: relative;
        overflow: hidden;
        padding: 10px 0;
        font-size: 12px;
        border-bottom: 1px solid #ebebeb;

        &:last-child {
            border-bottom: none;
        }

        .avatar {
            position: absolute;
            top: 10px;
            left: 0;
            width: 40px;
            height: 40px;
        }
        .review-content {
            margin-left: 50px;
            padding-right: 15px;
            .name {
                color: #a58d5e;
            }
            .time {
                color: #999;
            }
            .title {
                line-height: 2;
                font-weight: 700;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .content {
                line-height: 1.5;
            }
            .like {
                margin-top: 5px;
                .icon {
                    vertical-align: -.05em;
                    color: #999;
                }
            }
        }
    }
}
</style>
