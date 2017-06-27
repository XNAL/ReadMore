<template>
    <section class="book-list">
        <div class="book-list-top">
            <h4 class="book-list-title">{{ title }}</h4>
            <div class="book-list-more">
                <a :href="toAddress" class="book-list-address">更多</a>
            </div>
        </div>
        <div class="book-list-content" v-for="list in bookList">
            <a :href="list.book._id" class="book-list-content-book">
                <div class="book-list-book-cover">
                    <img class="book-cover" :src="list.book.cover">
                </div>
                <div class="book-list-book-info">
                    <p class="book-title">{{ list.book.title }}</p>
                    <p class="book-summary">{{ list.book.shortIntro }}</p>
                    <p class="book-info">
                        <span class="book-author">{{ list.book.author }}</span>
                        <span class="book-follower">{{ list.book.latelyFollower }}</span>
                        <span class="book-category">{{ list.book.majorCate }}</span>
                    </p>
                </div>
            </a>
        </div>
    </section>
</template>

<script>
import api from '../fetch/api';

export default {
    name: 'bookList',
    data() {
        return {
            title: '',
            toAddress: '',
            bookList: []
        }
    },
    created: function () {
        api.getBooks()
            .then(data => {
                this.bookList = data;
            })
    }
}
</script>

<style scoped lang="scss">
.book-list {
    position: relative;
    margin: 10px 0;
    padding: 15px;
    background: #fff;
}

.book-list-top {
    position: relative;
    overflow: hidden;
    font-size: 20px;
    line-height: 20px;

    .book-list-title {
        font-weight: 400;
        display: inline;
        color: #33373d;
        &::before {
            content: '';
            display: inline-block;
            box-sizing: border-box;
            width: 10px;
            height: 20px;
            color: transparent;
            border-left: 2px solid #ed424b;
        }
    }
    .book-list-more {
        float: right;
        .book-list-address {
            position: absolute;
            top: 3px;
            right: 15px;
            font-size: 14px;

            &::after {
                content: '>';
                display: inline-block;
                line-height: 20px;
            }
        }
    }
}
</style>


