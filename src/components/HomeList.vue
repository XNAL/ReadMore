<template>
<section class="book-home-list">
	<ol class="book-list-content">
		<li class="book-list-li" v-for="book in bookList" :key="book._id">
			<router-link :to="{ name: 'book', params: {id: book._id} }">
				<img class="book-list-book-cover fl" :src="book.cover">
				<div class="book-list-book-info">
					<h3 class="book-title">{{ book.title }}</h3>
					<p class="book-summary text-line-comm gray">{{ book.shortIntro }}</p>
					<p class="book-info">
						<span class="book-author fl gray">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-author"></use>
                            </svg>{{ book.author }}
                        </span>
						<span class="book-tags fr">
                            <em class="small-tag gray">{{ book.majorCate }}</em>
                            <em class="small-tag red">{{ book.isSerial ? '连载中' : '完结' }}</em>
                            <em class="small-tag blue">{{ book.latelyFollower }}人气</em>
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
	watch: {
		'bookInfo': 'fetchData'
	},
	created: function() {
		this.fetchData();
	},
	methods: {
		fetchData: function() {
			api.getBooks(this.bookInfo.id)
				.then(data => {
					data = data.map(value => {
						return value.book;
					});
					return data;
				})
				.then(data => {
					this.bookList = data;
					this.$nextTick(function () {
                    	this.$emit('load-result', this.bookInfo.id);
					})
				})
		}
	}
}
</script>

<style scoped lang="scss">
.book-home-list {
    position: relative;

    .book-list-li {
        padding: 10px 15px 10px 0;
        border-bottom: 1px solid #f0f1f2;

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
                margin: 5px 0 8px;
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
    }
}
</style>
