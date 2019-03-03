<template>
  <div class="pong">
    <div class="scores">
      <p class="scores__p scores--color-turquoise">Score of first player: {{ getFirstPlayerScore }}</p>
      <p class="scores__p scores--color-scarlet">Score of AI: {{ getAiScore }}</p>
    </div>
    <canvas ref="game"></canvas>
    <button type="button" class="btn-restart" @click="restart()">Restart</button>
  </div>
</template>
<script src="@/components/games/PongGame.ts" lang="ts"></script>
