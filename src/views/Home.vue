<template>
  <div class="home">
    <Menu />
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
})
export default class Home extends Vue {}
</script>
