<template>
<header class="header">
	<h2 class="header-logo">{{ headerTitle }}</h2>
	<nav class="nav-group" v-if="isShow">
		<h3 :class="['nav-item', { active: sexType === 'male' }]" @click="changSex('male')">男生</h3>
		<h3 :class="['nav-item', { active: sexType === 'female' }]" @click="changSex('female')">女生</h3>
	</nav>
	<div class="header-search">
		<router-link :to="{ name: 'search' }">
			<svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-search"></use>
                </svg>
		</router-link>
	</div>
</header>
</template>

<script>
import { mapState } from 'vuex';
import { FEATURED_PAGE, RANK_PAGE } from '../util/util';

export default {
	name: 'header',
	props: {
		sex: {
			type: String,
			default: ''
		}
	},
	computed: {
		...mapState([
			'headerTitle',
			'headerType'
		])
	},
	data() {
		return {
			isShow: false,
			sexType: ''
		};
	},
	created() {
		if (this.headerType === FEATURED_PAGE || this.headerType === RANK_PAGE) {
			this.isShow = true;
		}
		this.sexType = this.sex;
	},
	methods: {
		changSex: function (sex) {
			this.sexType = sex;
			this.$emit('change-sex', sex);
		}
	}
}
</script>

<style lang="scss">
.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
    width: 100%;
    height: 40px;
    overflow: hidden;
    // border-bottom: 1px solid #ed424b;
	color: #fff;
	background-color: #ed424b;
    box-sizing: border-box;
	z-index: 99;

    h2.header-logo {
        position: absolute;
        top: 12px;
        left: 15px;
        color: #fff;
        line-height: 20px;
    }
    .nav-group {
        margin: 10px auto;
        display: table;
        border: 1px solid #fff;
        border-radius: 4px;

        .nav-item {
            display: table-cell;
            font-weight: 400;
            line-height: 20px;
            padding: 0 10px;
            color: #fff;

            &.active {
                color: #666;
                background-color: #fff;
            }
        }
    }

    .header-search {
        position: absolute;
        display: inline-block;
        top: 12px;
        right: 15px;

        .icon {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
