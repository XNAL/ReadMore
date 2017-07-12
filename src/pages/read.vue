<template>
    <section class="read">
        <div ref="content">
            <read-content :read-content="readContent"
                          @show-menu="showMenu"
                          @next-chapter = "nextChapter">
            </read-content>
        </div>
        <chapter :chapters="chapters"
                 :show="isShowChapters"
                 @hide-menu="hideMenu"
                 @select-chapter = 'selectChapter'
                 v-if="chapters.length > 0">
        </chapter>
        <list-loading v-show="isLoading"></list-loading>
    	<page-loading :option = 'pageOption' v-if="isShowPageLoading"></page-loading>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import api from '../fetch/api';
import chapter from '@/components/Chapter';
import readContent from '@/components/ReadContent';
import listLoading from '@/components/ListLoading';
import pageLoading from '@/components/PageLoading';
import { debounce } from '../util/util';

export default {
    name: 'read',
    components: {
        chapter,
        readContent,
        listLoading,
        pageLoading
    },
    data() {
        return {
            isShowPageLoading: true,
            bookId: '',
            chapters: [],
            isShowChapters: false,
            readContent: [],
            isLoading: true,
            isEnding: false,
            $body: null,
            $content: null,
            clientHeight: 0,
            readIndex: 0,
			pageOption: {
				top: '0px',
				bottom: '0px'
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
        chapters: function () {
            if (this.curBook.readChapter !== '') {
                for (let [idx, chapter] of Object.entries(this.chapters)) {
                    if (this.curBook.readChapter === chapter.id) {
                        this.readIndex = idx;
                        break;
                    }
                }
            }
            this.fetchChapterContent(this.chapters[this.readIndex].id);
        },
        readIndex: function () {
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
    },
    mounted() {
        this.$body = document.body;
        this.clientHeight = this.$body.clientHeight;
        this.$content = this.$refs.content;
        // window.addEventListener('scroll', debounce(this.loadMore));
    },
    methods: {
        ...mapMutations([
            'SET_CUR_BOOK'
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
                        contentList: data.cpContent.split('\n')
                    });
                    this.isLoading = false;
                    this.$nextTick(function() {
                        this.isShowPageLoading = false;
                    })
                })
        },
        showMenu: function () {
            this.isShowChapters = true;
        },
        hideMenu: function () {
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
                        contentList: data.cpContent.split('\n')
                    });
                    this.$nextTick(function() {
                        this.isShowPageLoading = false;
                    })
                })
        },
		loadMore: function () {
            let scrollTop = this.$body.scrollTop;
            let eight = this.$content.offsetHeight;
            if (eight - scrollTop - this.clientHeight < this.clientHeight * 5) {
                if (this.isEnding === true) {
                    return;
                }
                this.readIndex++;
                this.isLoading = true;
                this.fetchChapterContent(this.chapters[this.readIndex].id);
            }
        }
    },
    beforeRouteLeave (to, from, next) {
        // if(confirm('还没有加入书架，是否加入书架')){
        //     console.log('是');
        //     next();
        // } else {
        //     console.log('否');
        //     next();
        // }
        next();
    }
}
</script>

<style lang="scss">
.read {
    position: relative;
    height: 100%;
}
</style>
