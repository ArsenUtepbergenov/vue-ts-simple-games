<template>
  <div class="menu">
    <router-link class="menu__link" :to="item.nav" v-for="(item, index) in items" :key="index">
      {{ item.title }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';

const Menu = createComponent({
  setup() {
    const items: object[] = [
      {title: 'Tic Tac Toe', nav: 'tictactoe'},
      {title: 'Snake', nav: 'snake'},
      {title: 'Tetris', nav: 'tetris'},
      {title: 'Arkanoid', nav: 'arkanoid'},
      {title: 'Pong', nav: 'pong'},
      {title: 'Tanks', nav: 'tanks'},
    ];
    return {
      items,
    };
  },
});
export default Menu;
</script>
