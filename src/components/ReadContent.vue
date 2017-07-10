<template>
    <section :class="['read-content', skinColor, { night: nightMode }]" ref="content">
        <div class="read-action-mid" @click="showOpt"></div>
        <div :class="['read-content-header', { 'read-opt': isShowOpt }]">
            <span class="back" @click="$router.go(-1)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-back"></use>
                </svg>
            </span>
        </div>
        <div class="read-content-content">
            <h4 :class="skinColor">{{ curBook.title }}</h4>
            <div class="content-list" v-for="rc in readContent" v-if="readContent.length > 0">
                <h3>{{ rc.contentTitle }}</h3>
                <p v-for="content in rc.contentList" v-if="content.trim() !== ''">{{ content }}</p>
            </div>
            <button class="nextChapter" @click="$emit('next-chapter')">加载下一章</button>
        </div>
        <div :class="['read-content-set', { 'read-opt': isShowSet }]">
            <ul class="read-set-bg-list">
                <li v-for="skin in skinBgList" class="read-set-bg-item" @click="changeBkColor(skin)" :key="skin">
                    <span :class="[skin, { active: skin === skinColor }]"></span>
                </li>
            </ul>
            <div class="read-set-switch">
                <div class="read-set-switch-item">
                    <span :class="{ active: !isSwipeLR}" @click="setSwipeMode(false)">上下滑动</span>
                </div>
                <div class="read-set-switch-item">
                    <span :class="{ active: isSwipeLR}" @click="setSwipeMode(true)">左右滑动</span>
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
    computed: {
        ...mapState([
            'curBook',
            'nightMode',
            'skinColor'
        ])
    },
    data() {
        return {
            isShowOpt: false,
            isShowSet: false,
            isSwipeLR: false,
            skinBgList: ['skin-default', 'skin-blue', 'skin-green', 'skin-pink', 'skin-dark', 'skin-light']
        }
    },
    created() {
        if(!this.skinBgList.includes(this.skinColor)) {
            this.SET_SKIN_COLOR('skin-default');
        }
    },
    methods: {
        ...mapMutations([
            'SET_NIGHT_MODE',
            'SET_SKIN_COLOR'
        ]),
        showMenu: function () {
            this.isShowOpt = false;
            this.$emit('show-menu');
        },
        switchMode: function () {
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
            this.isShowOpt = false;
            this.isShowSet = true;
        },
        setSwipeMode(swipeLR) {
            this.isSwipeLR = swipeLR;
        },
        changeBkColor(skin) {
            this.SET_NIGHT_MODE(false);
            this.SET_SKIN_COLOR(skin);
        }
    }
}
</script>

<style lang="scss">
.read-content {
    position: relative;
    overflow: hidden;
    color: rgba(0, 0, 0, .85);

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

    .read-content-content {
        position: relative;
        overflow: hidden;
        padding: 10px 15px 20px;
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
                margin-top: 30px;
                line-height: 40px;
                font-size: 16px;
            }
            p {
                text-indent: 2em;
                margin: 0.5em 0;
                letter-spacing: 0;
                line-height: 1.5;
            }
        }
        button.nextChapter {
            display: block;
            margin: 20px auto 0;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            color: #fff;
            background-color: #ed424b;
        }
    }
    .read-content-set {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 14px;
        overflow: hidden;
        transform: translateY(100%);
        transition: transform .15s;
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
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: 2px solid rgba(0, 0, 0, .9);

                    &.active {
                        border-color: #ed424b;
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
                    border-radius: 4px;
                    padding: 10px 0;
                    text-align: center;
                    transition: opacity .15s;
                    opacity: .4;

                    &.active {
                        opacity: 1;
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
        z-index: 99;

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
        transform: translateY(0%);
    }

    .read-action-mid {
        position: fixed;
        width: 40%;
        height: 40%;
        top: 30%;
        left: 30%;
        z-index: 10000;
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
