<template>
  <div class="home">
    <Menu :menuItems="menuItems" />
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
      menuItems: [
        {title: 'Tic Tac Toe', nav: 'tictactoe'},
        {title: 'Snake', nav: 'snake'},
        {title: 'Tetris', nav: 'tetris'},
      ],
    };
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: 300px 1fr;
}
</style>
