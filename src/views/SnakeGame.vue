<template>
  <div class="snake">
    <div class="scores">
      <p class="scores__text scores--color-secondary">Best result: {{ bestScore }}</p>
      <p class="scores__text scores--color-secondary">Previous result: {{ previousScore }}</p>
      <p class="scores__text">Current score: {{ currentScore }}</p>
    </div>
    <canvas ref="games" class="snake__canvas"></canvas>
    <button type="button" class="btn-restart" @click="restart()">Restart</button>
  </div>
</template>
<script src="@/components/SnakeGame.ts" lang="ts">
import Score from '@/components/Score.vue';
</script>

<style lang="scss" scoped>
  .snake {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;

    &__canvas {
      max-width: 800px;
      margin: 0 auto;
    }
  }
</style>
