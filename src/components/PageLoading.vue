<template>
<section class="page-loading">
	<img class="loading" src="../assets/page-animation.gif" alt="翻页加载动画">
</section>
</template>

<script>
export default {
	name: 'pageLoading',
	data() {
		return {}
	}
}
</script>

<style lang="scss">
.page-loading {
    position: fixed;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 60px;
    z-index: 99999;
    background-color: #fff;

    img.loading {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-100%);
        width: 20%;
    }
}
</style>
