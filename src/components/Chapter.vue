<template>
    <section :class="['chapter', { show: show }]">
        <div class="chapter-back">
            <span class="back" @click="$emit('hide-menu')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-back"></use>
                </svg>
            </span>
            <h3>{{ curBook.title }}</h3>
        </div>
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
        <div class="chapter-list-section">
            <div class="chapter-bar">正文卷</div>
            <ul class="chapter-list">
                <li :class="['chapter-item', { active: chapter.id === curBook.readContent }]"
                    v-for="chapter in chapters"
                    :key="chapter.id"
                    @click="selectChapter(chapter.id)">
                    <p>{{ chapter.title }}
                        <span class="vip fr" v-if="chapter.isVip">
                            <svg class="icon red" aria-hidden="true">
                                <use xlink:href="#icon-lock"></use>
                            </svg>
                        </span>
                    </p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

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
    computed: {
        ...mapState([
            'curBook'
        ])
    },
    methods: {
        reverseChapters: function () {
            this.sort = !this.sort;
            this.chapters.reverse();
        },
        selectChapter: function (chapterId) {
            this.$emit('select-chapter', chapterId);
        }
    }
}
</script>

<style lang="scss">
.chapter {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    z-index: 9999;
    background-color: #fff;
    transform: translateX(-100%);
    transition: transform .15s;

    &.show {
        transform: translateX(0);
    }
    .chapter-back {
        position: relative;
        overflow: hidden;
        height: 40px;
        color: #fff;
        background-color: #ed424b;
        z-index: 1;

        .back {
            position: absolute;
            top: 8px;
            left: 5px;
            text-align: center;
            .icon {
                width: 24px;
                height: 24px;
            }
        }

        h3 {
            width: 70%;
            margin: 0 auto;
            line-height: 40px;
            text-align: center;
            font-weight: 400;
        }
    }
    .chapter-head {
        font-size: 13px;
        font-weight: 500;
        padding: 0 20px;
        line-height: 40px;
        .icon {
            font-size: 13px;
        }
    }
    .chapter-list-section {
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .chapter-bar {
        line-height: 36px;
        padding-left: 20px;
        color: #969ba3;
        background-color: #f6f7f9;
    }
    .chapter-list {
        position: absolute;
        top: 36px;
        right: 0;
        bottom: 0;
        left: 20px;
        overflow: auto; // padding-left: 20px;
    }
    .chapter-item {
        padding: 15px 20px 15px 0;
        border-top: 1px solid #f0f1f2;
        white-space: nowrap;
        text-overflow: ellipsis;

        &.active {
            color: #ed424b;
        }
        .icon {
            font-size: 16px;
        }
    }
}
</style>
