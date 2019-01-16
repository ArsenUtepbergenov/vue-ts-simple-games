<template>
  <div class="home">
    <Menu :menuList="menuList" />
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
