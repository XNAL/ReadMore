<template>
    <section class="read">
        <read-content :read-content="readContent" @show-menu="showMenu"></read-content>
        <chapter :chapters="chapters" :show="isShowChapters" v-if="chapters.length > 0"></chapter>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import api from '../fetch/api';
import chapter from '@/components/Chapter';
import readContent from '@/components/ReadContent';

export default {
    name: 'read',
    components: {
        chapter,
        readContent
    },
    data() {
        return {
            bookId: '',
            chapters: [],
            isShowChapters: false,
            readContent: {
                title: '',
                contentList: []
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
            this.fetchChapterContent(this.chapters[0].id);
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
        // this.fetchChapterContent(this.chapters[0].id);
        // api.getChapters(this.bookId)
        //     .then(data => {
        //         this.chapters = data;

        //         api.getChapterContent(data[0].id)
        //             .then(data => {
        //                 this.title = data.title;
        //                 this.contentList = data.cpContent.split('\n');
        //             })
        //     })
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
                    this.readContent.contentList = data.cpContent.split('\n');
                })
        },
        showMenu: function () {
            this.isShowChapters = true;
        }
    }
}
</script>

<style lang="scss">
.read {
    position: relative; // overflow: hidden;
    // padding: 10px 15px;
}
</style>


