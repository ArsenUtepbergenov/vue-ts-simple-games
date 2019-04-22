<template>
  <div class="tetris">
    <div class="scores">
      <p class="scores__p scores--color-turquoise">Best result: {{ bestScore }}</p>
      <p class="scores__p scores--color-scarlet">Previous score: {{ previousScore }}</p>
      <p class="scores__p">Current score: {{ currentScore }}</p>
    </div>
    <canvas ref="game"></canvas>
    <Message v-if="isOver" :message="getMessage" :state="getStyleOfMessage" />
    <button type="button" class="btn-restart" @click="restart()">Restart</button>
  </div>
</template>
<script src="@/components/games/TetrisGame.ts" lang="ts">
</script>
