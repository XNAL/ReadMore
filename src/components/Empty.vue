<template>
    <section class="empty">
        <router-link :to="{ name: 'featured', params: { sex: 'male' } }">    
            <div class="empty-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-add_shelf"></use>
                </svg>
            </div>
            <p class="empty-notice">快去添加你喜欢的小说吧</p>
        </router-link>
    </section>
</template>

<script>
export default {
    name: 'empty',
    data(){
        return {}
    }
}
</script>

<style lang="scss">
.empty {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    a {
        display: block;
        text-align: center;
        margin-top: -50px;
        // margin: auto;
    }

    .empty-icon {
        font-size: 80px;
        color: #ccc;
    }

    .empty-notice {
        margin-top: 10px;
        color: #999;
    }
}
</style>


