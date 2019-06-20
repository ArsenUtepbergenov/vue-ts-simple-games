<template>
  <div class="pong">
    <Scores :scores="getScores" />
    <canvas ref="game"></canvas>
    <button type="button" class="btn-outline btn-outline--restart" @click="restart()">Restart</button>
  </div>
</template>
<script src="@/components/games/PongGame.ts" lang="ts"></script>
