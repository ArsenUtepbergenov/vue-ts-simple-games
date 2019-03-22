<template>
  <div class="tanks">
    <div class="scores">
      <p class="scores__p scores--color-turquoise">Best result: {{ bestScore }}</p>
      <p class="scores__p scores--color-scarlet">Previous score: {{ previousScore }}</p>
      <p class="scores__p">Current score: {{ currentScore }}</p>
    </div>
    <canvas ref="game"></canvas>
    <button type="button" class="btn-restart" @click="restart()">Restart</button>
  </div>
</template>
<script src="@/components/games/TanksGame.ts" lang="ts"></script>
