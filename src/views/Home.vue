<template>
  <div class="home">
    <Menu :menuList="menuList" />
    <div class="home__games">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/components/Menu.vue';

@Component({
  components: {
    Menu,
  },
  data() {
    return {
      menuList: ['TicTacToe', 'Snake', 'Tetris'],
    };
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  width: 100vw;
  height: 100vh;
  &__games {
  }
}
</style>