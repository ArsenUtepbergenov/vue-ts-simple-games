<template>
  <div class="menu">
    <router-link class="menu__link" :to="item.nav" v-for="(item, index) in menuItems" :key="index">
      {{ item.title }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Menu extends Vue {
  @Prop() private menuItems!: object[];
}
</script>
