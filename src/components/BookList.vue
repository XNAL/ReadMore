<template>
    <section class="book-list">
        <div class="book-list-top">
            <h2 class="book-list-title">{{ bookInfo.title }}-{{ bookInfo.type}}-{{ bookInfo.order }}</h2>
            <div class="book-list-more fr">
                <router-link :to="{ name: 'list/' + bookInfo._id, params: {} }" class="gray">更多</router-link>
            </div>
        </div>
        <ol class="book-list-content">
            <li class="book-list-li" v-for="list in bookList">
                <router-link :to="{ name: 'book', params: {id: list.book._id} }">
                    <img class="book-list-book-cover fl" :src="list.book.cover">
                    <div class="book-list-book-info">
                        <h3 class="book-title">{{ list.book.title }}</h3>
                        <p class="book-summary text-line-comm gray">{{ list.book.shortIntro }}</p>
                        <p class="book-info">
                            <span class="book-author fl gray">{{ list.book.author }}</span>
                            <span class="book-tags fr">
                                <em class="small-tag gray">{{ list.book.majorCate }}</em>
                                <em class="small-tag red">{{ list.book.isSerial ? '完结' : '连载中' }}</em>
                                <em class="small-tag blue">{{ list.book.latelyFollower }}人气</em>
                            </span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ol>

    </section>
</template>

<script>
import api from '../fetch/api';

export default {
    name: 'bookList',
    props: {
        bookInfo: Object
    },
    data() {
        return {
            bookList: []
        }
    },
    created: function () {
        api.getBooks(this.bookInfo._id)
            .then(data => {
                this.bookList = data;
            })
    }
}
</script>

<style scoped lang="scss">
.book-list {
    position: relative;
    margin-bottom: 10px;
    padding: 15px;
    background: #fff;
}

.book-list-top {
    position: relative;
    overflow: hidden;

    .book-list-title {
        font-weight: 400;
        display: inline-block;
        color: #33373d;
        line-height: 1;
        border-left: 2px solid #ed424b;
        padding-left: 8px;
    }
    .book-list-more {
        display: inline-block;

        a {
            position: absolute;
            top: 1px;
            right: 0;
            font-size: 14px;

            &::after {
                content: '>';
                display: inline-block;
                margin-left: 5px;
            }
        }
    }
}

.book-list-content {
    margin-top: 20px;
}

.book-list-li {
    margin: 10px 0;
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

        .book-title {
            color: #333;
            line-height: 1;
            margin: 3px 0 10px;
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
                font-size: 14px;
            }
            .book-tags {
                margin: 2px 0;
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

}
</style>
