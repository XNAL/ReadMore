<template>
<header class="header">
	<h2 class="header-logo">{{ title }}</h2>
	<nav class="nav-group" v-if="isShow">
		<h3 :class="['nav-item', { active: sex === 'male' }]">
                <router-link :to="{ name: linkName, params: { sex: 'male'} }" class="nav-link">男生</router-link>
            </h3>
		<h3 :class="['nav-item', { active: sex === 'female' }]">
                <router-link :to="{ name: linkName, params: { sex: 'female'}  }" class="nav-link">女生</router-link>
            </h3>
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
export default {
	name: 'header',
	props: {
		title: {
			type: String,
			required: true,
			default: 'RM'
		},
		sex: {
			type: String,
			default: ''
		},
		linkName: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			isShow: false
		};
	},
	created: function() {
		console.log(this.linkName)
		if (this.linkName !== '') {
			this.isShow = true;
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
