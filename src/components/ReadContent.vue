<template>
    <section :class="['read-content', skinColor, { night: nightMode }]">
        <div class="read-action-mid" @click="showOpt"></div>
        <div :class="['read-content-header', { 'read-opt': isShowOpt }]">
            <span class="back" @click="$router.go(-1)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-back"></use>
                </svg>
            </span>
        </div>
        <div :class="['read-join-shelf', { 'read-opt': isShowOpt }]"
             @click="addToShelf">
            <span v-if="isAdded">已在书架</span>
           <span v-else>加入书架</span>
        </div>
        <div class="read-content-content">
            <h4 :class="[skinColor, { night: nightMode }]">{{ curBook.title }}</h4>
            <div class="content-list" v-for="rc in readContent" v-if="readContent.length > 0">
                <h3>{{ rc.contentTitle }}</h3>
                <p v-for="content in rc.contentList" v-if="content.trim() !== ''" :style="{ fontSize: fontSize + 'px' }">{{ content }}</p>
            </div>
            <button class="nextChapter" @click="$emit('next-chapter')">加载下一章</button>
        </div>
        <div :class="['read-content-set', { 'read-opt': isShowSet }]">
            <ul class="read-set-bg-list">
                <li v-for="skin in skinBgList" class="read-set-bg-item" @click="changeBkColor(skin)" :key="skin">
                    <span :class="[skin, { active: skin === skinColor }]">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-selected"></use>
                        </svg>
                    </span>
                </li>
            </ul>
            <div class="read-set-switch">
                <div class="read-set-switch-item">
                    <span :class="{ nochange: fontSize <= 10 }" @click="changeFontSize(false)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-font-reduce"></use>
                        </svg>
                    </span>
                </div>
                <div class="read-set-switch-item">
                    <span :class="{ nochange: fontSize >= 24 }" @click="changeFontSize(true)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-font-add"></use>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        <div :class="['read-content-footer', { 'read-opt': isShowOpt }]">
            <ul class="footer-tab">
                <li class="footer-tab-item" @click="showMenu">
                    <div class="footer-tab-icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-menu"></use>
                        </svg>
                    </div>
                    <p class="footer-tab-label">目录</p>
                </li>
                <li class="footer-tab-item" @click="switchMode">
                    <template v-if="nightMode">
                        <div class="footer-tab-icon">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-day"></use>
                            </svg>
                        </div>
                        <p class="footer-tab-label">日间模式</p>
                    </template>
                    <template v-else>
                        <div class="footer-tab-icon">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-night"></use>
                            </svg>
                        </div>
                        <p class="footer-tab-label">夜间模式</p>
                    </template>
                </li>
                <li class="footer-tab-item" @click="showOptSet">
                    <div class="footer-tab-icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-font"></use>
                        </svg>
                    </div>
                    <p class="footer-tab-label">设置</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'readContent',
    props: {
        readContent: Array
    },
    watch: {
        //当为点击目录进入阅读界面时，滚动条回到顶部
        readContent: function () {
            if (this.readContent.length === 1) {
                document.body.scrollTop = 0;
            }
        }
    },
    computed: {
        ...mapState([
            'curBook',
            'nightMode',
            'skinColor',
            'fontSize'
        ])
    },
    data() {
        return {
            isAdded: false,
            isShowOpt: false,
            isShowSet: false,
            skinBgList: ['skin-default', 'skin-blue', 'skin-green', 'skin-pink', 'skin-dark', 'skin-light']
        }
    },
    created() {
		this.isAdded = this.curBook.isInShelf;
        if (!this.skinBgList.includes(this.skinColor)) {
            this.SET_SKIN_COLOR('skin-default');
        }
    },
    methods: {
        ...mapMutations([
            'SET_NIGHT_MODE',
            'SET_SKIN_COLOR',
            'SET_FONT_SIZE',
			'SET_CUR_BOOK',
			'ADD_TO_SHELF'
        ]),
        showMenu: function () {
            this.isShowOpt = this.isShowSet = false;
            this.$emit('show-menu');
        },
        switchMode: function () {
            this.isShowSet = false;
            this.SET_NIGHT_MODE(!this.nightMode);
        },
        showOpt() {
            if (this.isShowOpt || this.isShowSet) {
                this.isShowOpt = this.isShowSet = false;
            } else {
                this.isShowOpt = true;
            }
        },
        showOptSet() {
            this.isShowSet = true;
        },
        changeFontSize(isAdd) {
            if ((this.fontSize >= 30 && isAdd) || (this.fontSize <= 10 && !isAdd)) {
                return;
            }
            let size = this.fontSize;
            isAdd ? size++ : size--
            this.SET_FONT_SIZE(size);
        },
        changeBkColor(skin) {
            this.SET_NIGHT_MODE(false);
            this.SET_SKIN_COLOR(skin);
        },
		addToShelf: function() {
            if (this.isAdded) {
                return;
            }
			let book = this.curBook;
			book.isInShelf = true;
			this.SET_CUR_BOOK(book);
			this.ADD_TO_SHELF(book);
			this.isAdded = true;
		}
    }
}
</script>

<style lang="scss">
.read-content {
    position: relative;
    overflow: hidden;
    color: rgba(0, 0, 0, .85);    
    min-height: 100%;

    .read-content-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 40px;
        overflow: hidden;
        color: #fff;
        background-color: rgba(0, 0, 0, .9);
        transform: translateY(-100%);
        transition: transform .15s;
        z-index: 99;

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
    }

    .read-join-shelf {
        position: fixed;
        top: 50px;
        right: 0;
        height: 30px;
        width: 70px;
        line-height: 30px;
        text-align: center;
        border-radius: 15px 0 0 15px;
        overflow: hidden;
        color: #fff;
        background-color: rgba(0, 0, 0, .9);
        transform: translateX(100%);
        transition: transform .15s;
        z-index: 99;
    }

    .read-content-content {
        position: relative;
        overflow: hidden;
        padding: 10px 15px 80px;
        font-size: 14px;
        h4 {
            font-size: 12px;
            color: #666;
            font-weight: 400;
            position: fixed;
            top: 0px;
            left: 0px;
            right: 0;
            line-height: 30px;
            padding-left: 15px;
            z-index: 9;
        }
        .content-list {
            h3 {
                margin: 30px 0 20px;
                font-size: 20px;
            }
            p {
                text-indent: 2em;
                margin: 0.5em 0;
                letter-spacing: 0;
                line-height: 1.8;
            }
        }
        button.nextChapter {
            position: absolute;
            bottom: 20px;
            left: 10%;
            display: block;
            width: 80%;
            font-size: 16px;
            line-height: 36px;
            border: none;
            border-radius: 100px;
            color: #fff;
            background-color: #ed424b;
            z-index: 9999;
            outline: none;
        }
    }
    .read-content-set {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 50px;
        font-size: 14px;
        overflow: hidden;
        opacity: 0;
        display: none;
        transition: opacity .15s;
        color: #fff;
        background-color: rgba(0, 0, 0, .9);

        .read-set-bg-list {
            display: flex;
            padding: 10px 0;
            overflow: hidden;
            border-bottom: 1px solid rgba(255, 255, 255, .1);

            .read-set-bg-item {
                flex: 1;
                text-align: center;
                span {
                    position: relative;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: 2px solid rgba(0, 0, 0, .9);

                    .icon {
                        position: absolute;
                        top: 6px;
                        left: 7px;
                        font-size: 16px;
                        color: #ed424b;
                        opacity: 0;
                    }

                    &.active {
                        border-color: #ed424b;
                        .icon {
                            opacity: 1;
                        }
                    }
                }
            }
        }
        .read-set-switch {
            padding: 10px 0;
            display: flex;
            border-bottom: 1px solid rgba(255, 255, 255, .1);

            .read-set-switch-item {
                flex: 1;
                span {
                    display: inline-block;
                    width: 80%;
                    margin: 0 10%;
                    border: 1px solid #fff;
                    border-radius: 100px;
                    line-height: 36px;
                    text-align: center;
                    font-size: 20px;
                    color: #fff;

                    &.nochange {
                        opacity: .6;
                    }
                }
            }
        }
    }
    .read-content-footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50px;
        overflow: hidden;
        font-size: 12px;
        color: #fff;
        background-color: rgba(0, 0, 0, .9);
        transform: translateY(100%);
        transition: transform .15s;
        z-index: 9999;

        .footer-tab {
            position: relative;
            display: flex;
            padding: 7px 0;
        }
        .footer-tab-item {
            flex: 1;
            text-align: center;

            .icon {
                font-size: 20px;
            }

            .footer-tab-label {
                margin-top: 4px;
            }
        }
    }
    .read-opt {
        transform: translate(0%, 0%);
        opacity: 1;
        display: block;
    }

    .read-action-mid {
        position: fixed;
        width: 60%;
        height: 40%;
        top: 30%;
        left: 20%;
        z-index: 1000;
    }
}

.skin-default {
    background-color: #c4b395;
}

.skin-blue {
    background-color: #c3d4e6;
}

.skin-green {
    background-color: #c8e8c8;
}

.skin-pink {
    background-color: #F8C9C9;
}

.skin-dark {
    background-color: #3E4349;
}

.skin-light {
    background-color: #f6f7f9;
}

.night {
    color: rgba(255, 255, 255, .5);
    background-color: #1a1a1a;
}
</style>
