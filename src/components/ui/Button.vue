<template>
  <button type="button" class="btn" @click="handleClick">
    <slot />
    <slot name="icon" />
  </button>
</template>

<script lang="ts">
import { createComponent, toRefs } from '@vue/composition-api';

const Button = createComponent({
  setup(props, { emit }) {
    function handleClick() {
      emit('click');
    }

    return {
      handleClick,
    };
  },
});
export default Button;
</script>
