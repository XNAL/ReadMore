<template>
	<section class="shelf-list">
		<ul class="shelf-book-list" v-if="shelfBookList.length > 0">
			<li v-for="book in shelfBookList" :key="book.id" class="shelf-book-item">
				<img :src="book.cover" alt="book.title" class="cover fl">
				<div class="book-info">
					<h4 class="title">
						{{ book.title }}
						<span class="time red">{{ book.updated | time}}</span>
					</h4>
					<p class="meta">
						{{ book.author }}&nbsp;&nbsp;著
					</p>
					<p class="meta">
						连载至：&nbsp;&nbsp;{{ book.lastChapter }}
					</p>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import moment from 'moment';

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
            line-height: 2;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
        }
    }
}
</style>
