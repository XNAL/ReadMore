<template>
    <section class="shelf">
        <header-bar :title="headerTitle"></header-bar>
        <empty></empty>
        <tabbar></tabbar>
    </section>
</template>

<script>
import empty from '@/components/Empty';
import tabbar from '@/components/Tabbar';
import headerBar from '@/components/Header';

export default {
    name: 'shelf',
    components: {
        empty,
        tabbar,
        headerBar
    },
    data() {
        return {
            bookList: [],
            headerTitle: '我的书架'
        }
    }
}
</script>

<style lang="scss">

</style>
