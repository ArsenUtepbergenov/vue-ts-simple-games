<template>
  <div class="tanks">
    <Scores :scores="getScores" />
    <canvas ref="game"></canvas>
    <button type="button" class="btn-outline btn-outline--restart" @click="restart()">Restart</button>
  </div>
</template>
<script src="@/components/games/TanksGame.ts" lang="ts"></script>
