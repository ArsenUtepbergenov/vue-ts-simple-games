<template>
  <main>
    <Menu />
    <div class="home__games">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/components/ui/Menu.vue';

@Component({
  components: {
    Menu,
  },
})
export default class Home extends Vue {}
</script>
