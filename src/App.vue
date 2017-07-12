<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'app',
  created() {
      this.INIT_STATE();
  },
  methods: {
      ...mapMutations([
          'INIT_STATE'
      ])
  }
}
</script>

<style lang="scss">
@import 'src/assets/css/reset';
@import 'src/assets/css/common';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  // overflow: hidden;
  /*text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
</style>
