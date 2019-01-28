<template>
  <ul class="menu">
    <li class="menu__item" v-for="(item, index) in menuList" :key="index">
      <router-link class="menu__link" :to="item">{{ item }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Menu extends Vue {
  @Prop() private menuList!: string[];
}
</script>

<style lang="scss" scoped>
.menu {
  list-style-type: none;
  margin: auto;
  padding: 0;
  min-width: 300px;
  &__item {
    padding: 10px 0;
    width: 100%;
    text-align: center;
  }
  &__link {
    color: #323432;
    cursor: pointer;
    text-decoration: none;
  }
  &__link:hover {
    color: #df3222;
  }
}
</style>
