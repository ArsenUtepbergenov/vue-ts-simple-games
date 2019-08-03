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
import Menu from '@/components/menu.vue';

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
        {title: 'Arkanoid', nav: 'arkanoid'},
        {title: 'Pong', nav: 'pong'},
        {title: 'Tanks', nav: 'tanks'},
      ],
    };
  },
})
export default class Home extends Vue {}
</script>
