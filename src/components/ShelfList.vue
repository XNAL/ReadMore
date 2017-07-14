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
			<span class="delete" @click="deleteBook(book.id)">
	                <svg class="icon" aria-hidden="true">
	                    <use xlink:href="#icon-delete"></use>
	                </svg>
				</span>
		</li>
	</ul>
	<v-dialog v-show="showDialog" :dialog-option="dialogOption" ref="dialog"></v-dialog>
</section>
</template>

<script>
import {
	mapState,
	mapMutations
} from 'vuex';
import dialog from '@/components/Dialog';
import moment from 'moment';
import api from '../fetch/api';

export default {
	name: 'shelfList',
	components: {
		'v-dialog': dialog
	},
	data() {
		return {
			showDialog: false,
			dialogOption: {
				title: '温馨提示',
				text: '确定要从书架中删除？',
				cancelButtonText: '取消',
				confirmButtonText: '确定'
			}
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
			'SHELF_BOOK_UPDATE',
			'DEL_FROM_SHELF'
		]),
		deleteBook: function(bookId) {
			this.showDialog = true;
			this.$refs.dialog.confirm().then(() => {
				this.showDialog = false;
				this.DEL_FROM_SHELF([bookId]);
			}).catch(() => {
				this.showDialog = false;
			})
		}
	}
}
</script>

<style lang="scss">
.shelf-list {
    position: relative;
    overflow: hidden;

    overflow: hidden;
    padding-left: 15px;
    .shelf-book-item {
        position: relative;
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
                padding: 1px 4px;
                font-size: 10px;
            }
        }
        .meta {
            line-height: 1;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-right: 30px;

            &.author {
                margin: 9px 0;
            }
        }
    }
    .delete {
        position: absolute;
        right: 10px;
        bottom: 10px;

        .icon {
            font-size: 20px;
        }
    }
}
</style>
