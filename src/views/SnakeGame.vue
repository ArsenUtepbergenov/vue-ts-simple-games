<template>
  <div class="snake">
    <Scores :scores="getScores" />
    <canvas ref="game"></canvas>
    <Message v-if="isMessage" :message="getMessage" :state="getStyleOfMessage" />
    <button type="button" class="btn-outline btn-outline--restart" @click="restart()">Restart</button>
  </div>
</template>
<script src="@/components/games/SnakeGame.ts" lang="ts"></script>
