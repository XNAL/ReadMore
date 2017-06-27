<template>
  <div class="home">
    首页
    <button type="button" name="button" @click="getHomeData">点击查看数据</button>
  </div>
</template>

<script>
import api from '../fetch/api';
  export default {
    name: 'home',
    data () {
      return {

      };
    },
    methods: {
        getHomeData: function () {
            api.getHomeData()
                .then(res => {
                    console.log(res);
                })
        }
    }
  }
</script>

<style scoped lang="scss">

</style>
