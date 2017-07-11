<template>
	<section class="shelf-list">
		<ul class="shelf-book-list" v-if="shelfBookList.length > 0">
			<li v-for="book in shelfBookList" :key="book.id" class="shelf-book-item">
				<router-link :to="{ name: 'read', params: { id: book.id }}">
					<img :src="book.cover" alt="book.title" class="cover fl">
					<div class="book-info">
						<h4 class="title">
							{{ book.title }}
							<span class="time red">{{ book.updated | time}}</span>
						</h4>
						<p class="meta author">
							{{ book.author }}&nbsp;&nbsp;著
						</p>
						<p class="meta">
							连载至：&nbsp;&nbsp;{{ book.lastChapter }}
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</section>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import moment from 'moment';
import api from '../fetch/api';

export default {
	name: 'shelfList',
	data() {
		return {

		}
	},
	filters: {
		time(updated) {
			moment.locale('zh-cn');
			return moment(updated).fromNow();
		}
	},
	computed: {
		...mapState([
			'shelfBookList'
		])
	},
	created() {
		var bookIds = Array.from(this.shelfBookList, book => book.id);
		api.getShelfBookUpdate(bookIds)
			.then(data => {
				this.SHELF_BOOK_UPDATE(data);
			})
	},
	methods: {
		...mapMutations([
			'SHELF_BOOK_UPDATE'
		])
	}
}
</script>

<style lang="scss">
.shelf-list {
	position: relative;
	overflow: hidden;

	overflow: hidden;
	padding-left: 15px;
    // border-bottom: 1px solid #ebebeb;
	.shelf-book-item {
		padding: 10px 0;
		overflow: hidden;
		border-bottom: 1px solid #ebebeb;
	}
    .cover {
        display: inline-block;
        width: 42px;
        height: 60px;
        margin-right: 10px;
    }

    .book-info {
        position: relative;
        font-size: 12px;
		padding-right: 10px;

        .title {
        	font-size: 14px;
        	color: #000;
            line-height: 1;
			padding: 2px 0 3px;

			.time {
				font-weight: 400;
				margin-left: 5px;
				border: 1px solid #ed424b;
				border-radius: 8px;
				padding: 0 4px;
				font-size: 10px;
			}
        }
        .meta {
            line-height: 1;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;

			&.author {
				margin: 9px 0;
			}
        }
    }
}
</style>
