<template>
    <header class="header">
        <router-link :to="{ name: '' }" class="header-logo">
            <h1 class="logo">多读书</h1>            
        </router-link>
        <nav class="nav-group">
            <p class="nav-item">
                <router-link :to="{ name: 'featured' }" class="nav-link">男生</router-link>
            <p>
            <p class="nav-item">
                <router-link :to="{ name: 'featured/female' }" class="nav-link">女生</router-link>
            <p>
        </nav>
        <div class="header-search">
            <router-link :to="{ name: 'search' }" >搜索</router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: 'header',
    data() {
        return {};
    }
}
</script>

<style lang="scss">

</style>


