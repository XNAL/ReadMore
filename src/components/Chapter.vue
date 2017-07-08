<template>
    <section :class="['chapter', { show: show }]">
        <h4 class="chapter-head">
            <span class="total">共{{ chapters.length }}章</span>
            <span class="sort fr" @click="reverseChapters">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sort"></use>
                </svg>
                <span v-if="sort">倒序</span>
                <span v-else>正序</span>
            </span>
        </h4>
        <ul class="chapter-list">
            <li class="chapter-bar">正文卷</li>
            <li class="chapter-item" v-for="chapter in chapters" :key="chapter.id" @click="selectChapter(chapter.id)">
                <p>{{ chapter.title }}
                    <span class="vip fr" v-if="chapter.isVip">
                        <svg class="icon red" aria-hidden="true">
                            <use xlink:href="#icon-lock"></use>
                        </svg>
                    </span>
                </p>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'chapter',
    props: {
        chapters: Array,
        show: Boolean
    },
    data() {
        return {
            sort: true
        }
    },
    methods: {
        reverseChapters: function () {
            this.sort = !this.sort;
            this.chapters.reverse();
        }
    }
}
</script>

<style lang="scss">
.chapter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    // bottom: 0;
    z-index: 9999;
    overflow: hidden;
    background-color: #fff;
    transform: translateX(-100%);
    transition: transform .15s;

    &.show {
        transform: translateX(0);
    }
    .chapter-head {
        font-size: 13px;
        font-weight: 500;
        padding: 15px 20px;
        .icon {
            font-size: 13px;
        }
    }
    .chapter-list {
        padding-left: 20px;
    }
    .chapter-bar {
        padding: 10px 20px;
        margin-left: -20px;
        color: #969ba3;
        background-color: #f6f7f9;
    }
    .chapter-item {
        padding: 15px 20px 15px 0;
        border-top: 1px solid #f0f1f2;
        white-space: nowrap;
        text-overflow: ellipsis;

        .icon {
            font-size: 16px;
        }
    }
}
</style>


