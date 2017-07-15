<template>
<section class="read">
	<read-content :read-content="readContent" @show-menu="showMenu" @next-chapter="nextChapter">
	</read-content>
	<chapter :chapters="chapters" :show="isShowChapters" @hide-menu="hideMenu" @select-chapter='selectChapter' v-if="chapters.length > 0">
	</chapter>
	<list-loading v-show="isLoading"></list-loading>
	<page-loading :option='pageOption' v-if="isShowPageLoading"></page-loading>
	<v-dialog v-show="showDialog" :dialog-option="dialogOption" ref="dialog"></v-dialog>
</section>
</template>

<script>
import {
	mapState,
	mapMutations
} from 'vuex';
import api from '../fetch/api';
import chapter from '@/components/Chapter';
import readContent from '@/components/ReadContent';
import listLoading from '@/components/ListLoading';
import pageLoading from '@/components/PageLoading';
import dialog from '@/components/Dialog';
import {
	debounce
} from '../util/util';

export default {
	name: 'read',
	components: {
		chapter,
		readContent,
		listLoading,
		pageLoading,
		'v-dialog': dialog
	},
	data() {
		return {
			isShowPageLoading: true,
			showDialog: false,
			bookId: '',
			chapters: [],
			isShowChapters: false,
			isFromMenu: false,
			readContent: [],
			isLoading: true,
			isEnding: false,
			readIndex: 0,
			pageOption: {
				top: '0px',
				bottom: '0px'
			},
			dialogOption: {
				title: '加入书架',
				text: '喜欢本书就加入书架吧',
				cancelButtonText: '不用了',
				confirmButtonText: '加入书架'
			}
		}
	},
	computed: {
		...mapState([
			'curBook',
			'shelfBookList'
		])
	},
	watch: {
		chapters: function() {
			if (this.curBook.readChapter !== '') {
				// 去书架中取书籍的历史阅读记录
				for (let [idx, chapter] of Object.entries(this.chapters)) {
					if (this.curBook.readChapter === chapter.id) {
						this.readIndex = idx;
						break;
					}
				}
			}
			this.fetchChapterContent(this.chapters[this.readIndex].id);
		},
		readIndex: function() {
			let book = this.curBook;
			book.readChapter = this.chapters[this.readIndex].id;
			this.SET_CUR_BOOK(book);
		}
	},
	created() {
		this.bookId = this.$route.params.id;
		for (let book of Object.values(this.shelfBookList)) {
			if (this.bookId === book.id) {
				this.SET_CUR_BOOK(book);
				break;
			}
		}
		this.fetchChapters(this.bookId);
		if(this.$route.query.menu) {
			this.isFromMenu = true;
			this.isShowChapters = true;
		}
	},
	methods: {
		...mapMutations([
			'SET_CUR_BOOK',
			'ADD_TO_SHELF'
		]),
		fetchChapters(bookId) {
			api.getChapters(bookId)
				.then(data => {
					this.chapters = data;
				})
		},
		fetchChapterContent(chapterId) {
			api.getChapterContent(chapterId)
				.then(data => { 
					this.readContent.push({
						contentTitle: data.title,
						contentList: data.isVip ? ['vip章节，请到正版网站阅读'] : data.cpContent.split('\n')
					});
					this.isLoading = false;
					this.$nextTick(function() {
						this.isShowPageLoading = false;
					})
				})
		},
		showMenu: function() {
			this.isShowChapters = true;
		},
		hideMenu: function() {
			console.log(this.isFromMenu);
			if(this.isFromMenu) {
				this.$router.go(-1);
			}
			this.isShowChapters = false;
		},
		nextChapter: function() {
			if (this.readIndex === this.chapters.length - 1) {
				return;
			}
			this.readIndex++;
			this.isLoading = true;
			this.fetchChapterContent(this.chapters[this.readIndex].id);
		},
		selectChapter: function(chapterId) {
			if(this.isFromMenu) {
				this.isFromMenu = false;
			}
			this.isShowChapters = false;
			this.isShowPageLoading = true;
			for (let [index, value] of Object.entries(this.chapters)) {
				if (value.id === chapterId) {
					this.readIndex = index;
					break;
				}
			}
			api.getChapterContent(chapterId)
				.then(data => {
					this.readContent.splice(0, this.readContent.length);
					this.readContent.push({
						contentTitle: data.title,
						contentList: data.isVip ? ['vip章节，请到正版网站阅读'] : data.cpContent.split('\n')
					});
					this.$nextTick(function() {
						this.isShowPageLoading = false;
					})
				})
		}
	},
	beforeRouteLeave(to, from, next) {
		if (!this.curBook.isInShelf && !this.isFromMenu) {
			this.showDialog = true;
			this.$refs.dialog.confirm().then(() => {
				this.showDialog = false;
                let book = this.curBook;
    			book.isInShelf = true;
    			this.SET_CUR_BOOK(book);
    			this.ADD_TO_SHELF(book);
				next();
			}).catch(() => {
				this.showDialog = false;
				next();
			})
		} else {
			next()
		}
	}
}
</script>

<style lang="scss">
.read {
    position: relative;
    height: 100%;
}
</style>
