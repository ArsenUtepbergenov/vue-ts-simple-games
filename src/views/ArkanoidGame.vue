<template>
  <div class="arkanoid">
    <div class="scores">
      <p class="scores__p scores--color-turquoise">Best result: {{ bestScore }}</p>
      <p class="scores__p scores--color-scarlet">Previous score: {{ previousScore }}</p>
      <p class="scores__p">Current score: {{ currentScore }}</p>
      <p class="scores__p scores--color-light-blue">Lives: {{ lives }}</p>
    </div>
    <canvas ref="game"></canvas>
    <button type="button" class="btn-outline btn-outline--restart" @click="restart()">Restart</button>
  </div>
</template>
<script src="@/components/games/ArkanoidGame.ts" lang="ts"></script>
