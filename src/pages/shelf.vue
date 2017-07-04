<template>
    <section class="shelf">
        <empty></empty>
        <tabbar></tabbar>
    </section>
</template>

<script>
import empty from '@/components/Empty';
import tabbar from '@/components/Tabbar';

export default {
    name: 'shelf',
    components: {
        empty,
        tabbar
    },
    data() {
        return {
            bookList: []
        }
    }
}
</script>

<style lang="scss">

</style>

