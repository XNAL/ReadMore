<template>
    <section class="list-section" id="listId">
        <backbar :title="title"></backbar>
        <book-list :book-list="list" v-if="list.length > 0"></book-list>
        <list-loading v-show="isLoading"></list-loading>
    </section>
</template>

<script>
import api from '../fetch/api';
import bookList from '@/components/BookList';
import backbar from '@/components/Backbar';
import listLoading from '@/components/ListLoading';

export default {
    name: 'list',
    components: {
        bookList,
        backbar,
        listLoading
    },
    data() {
        return {
            id: '',
            list: [],
            title: '标题',
            page: 1,
            isLoading: false,
            isEnding: false,
            $body: null,
            $list: null,
            clientHeight: 0
        }
    },
    created: function () {
        this.id = this.$route.params.id;
        this.fetchData();
    },
    mounted:function(){
        this.$body = document.body;
        this.clientHeight = this.$body.clientHeight;
        this.$list = document.getElementById('listId');
        window.addEventListener('scroll', this.debounce(this.loadMore));
    },
    methods: {
        fetchData: function () {
            api.getBookList(this.id, this.page)
                .then(data => {
                    if (data.length < 10) {
                        this.isEnding = true;
                    }
                    this.list.push(...data);
                    this.isLoading = false;
                })
        },
        loadMore: function () {
            var scrollTop = this.$body.scrollTop;
            var offsetHeight = this.$list.offsetHeight;
            if (offsetHeight - scrollTop - this.clientHeight < 160) {
                if (this.isEnding === true) {
                    return;
                }
                this.page++;
                this.isLoading = true;
                this.fetchData();
            }
        },
        debounce: function (fn, delay, timeout) {
            var timer = null;
            var last = new Date().getTime();
            delay = delay || 300;
            timeout = timeout || 300;
            return () => {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(fn, delay);
                if (new Date().getTime() > last + timeout) {
                    fn.apply(this, [].slice.call(Array, arguments));
                    last = new Date().getTime();
                    clearTimeout(timer);
                }
            }
        }
    }
}
</script>

<style lang="scss">
.list-section {
    margin-top: 40px;
}
</style>


