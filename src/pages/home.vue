<template>
    <div class="home">
      <!-- 首页
      <button type="button" name="button" @click="getHomeData">点击查看数据</button> -->
        <div class="swiper">
            <swiper></swiper>
        </div>
        <div>
            <book-list v-for="module in modules" :book-info="module" v-if="module.type === 0" :key="module._id"></book-list>
        </div>
        <tabbar></tabbar>
    </div>
</template>

<script>
import api from '../fetch/api';
import bookList from '@/components/BookList';
import swiper from '@/components/Swiper';
import tabbar from '@/components/Tabbar';

export default {
  name: 'home',
  components: {
      swiper,
      bookList,
      tabbar
  },
  data() {
    return {
        modules: []
    };
  },
  created: function() {
    api.getHomeData()
      .then(data => {
        this.modules = data;
      })
  }
}
</script>

<style scoped lang="scss">

</style>
