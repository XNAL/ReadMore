<template>
  <div class="home">
    首页
    <button type="button" name="button" @click="getHomeData">点击查看数据</button>
  
    <ul>
      <li v-for="data in datas">{{ data.title }}</li>
    </ul>
  </div>
</template>

<script>
import api from '../fetch/api';
export default {
  name: 'home',
  data() {
    return {
      datas: []
    };
  },
  methods: {
    getHomeData: function () {
      api.getHomeData()
        .then(data => {
          this.datas = data;
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
