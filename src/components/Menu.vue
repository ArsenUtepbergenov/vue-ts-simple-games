<template functional>
  <div class="menu">
    <router-link class="menu__link" :to="item.nav" v-for="(item, index) in props.menuItems" :key="index">
      {{ item.title }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';

const Menu = createComponent({
  props: {
    menuItems: Array,
  },
});
export default Menu;
</script>
