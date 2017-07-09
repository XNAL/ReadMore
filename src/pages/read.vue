<template>
    <section class="read">
        <div ref="content">
            <read-content :read-content="readContent" @show-menu="showMenu"></read-content>
        </div>
        <chapter :chapters="chapters" 
                 :show="isShowChapters" 
                 @hide-menu="hideMenu" 
                 v-if="chapters.length > 0">
        </chapter>
        <list-loading v-show="isLoading"></list-loading>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import api from '../fetch/api';
import chapter from '@/components/Chapter';
import readContent from '@/components/ReadContent';
import listLoading from '@/components/ListLoading';
import { debounce } from '../util/util';

export default {
    name: 'read',
    components: {
        chapter,
        readContent,
        listLoading
    },
    data() {
        return {
            bookId: '',
            chapters: [],
            isShowChapters: false,
            readContent: {
                title: '',
                contentList: []
            },
            isLoading: true,
            isEnding: false,
            $body: null,
            $content: null,
            clientHeight: 0,
            readIndex: 0
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
            this.fetchChapterContent(this.chapters[this.readIndex].id);
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
                    this.readContent.title = data.title;
                    this.readContent.contentList.push(...data.cpContent.split('\n'));
                    this.isLoading = false;
                })
        },
        showMenu: function () {
            this.isShowChapters = true;
        },
        hideMenu: function () {
            this.isShowChapters = false;
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
    }
}
</script>

<style lang="scss">
.read {
    position: relative;
    height: 100%;
}
</style>


