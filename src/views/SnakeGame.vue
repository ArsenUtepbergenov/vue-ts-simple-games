<template>
  <div class="snake">
    <div class="scores">
      <p class="scores__text scores--color-light">{{ previousScore }}</p>
      <p class="scores__text">{{ currentScore }}</p>
    </div>
    <canvas ref="games"></canvas>
    <button type="button" class="btn-restart" @click="restart()">Restart</button>
  </div>
</template>
<script src="@/components/SnakeGame.ts" lang="ts">
</script>