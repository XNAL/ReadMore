<template>
<header class="header">
	<router-link :to="{ name: '' }" class="header-logo">
		<h2 class="logo">多读书</h2>
	</router-link>
	<nav class="nav-group">
		<h3 :class="['nav-item', { active: sex === 'male' }]">
                <router-link :to="{ name: 'featured', params: { sex: 'male'} }" class="nav-link">男生</router-link>
            </h3>
		<h3 :class="['nav-item', { active: sex === 'female' }]">
                <router-link :to="{ name: 'featured', params: { sex: 'female'}  }" class="nav-link">女生</router-link>
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
		sex: String
	},
	data() {
		return {};
	},
	created: function() {
		console.log(this.sex);
	}
}
</script>

<style lang="scss">
.header {
    width: 100%;
    height: 40px;
    position: relative;
    overflow: hidden;

    .header-logo {
        position: absolute;
        display: inline-block;
        top: 12px;
        left: 15px;

        h2 {
            line-height: 20px;
        }
    }
    .nav-group {
        margin: 10px auto;
        display: table;
        border: 1px solid #ed424b;
        border-radius: 4px;

        .nav-item {
            display: table-cell;
            font-weight: 400;
            line-height: 20px;
            padding: 0 10px;
            color: #ed424b;

            &.active {
                color: #fff;
                background-color: #ed424b;
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
