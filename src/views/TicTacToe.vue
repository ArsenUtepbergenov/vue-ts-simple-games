<template>
  <div class="tictactoe">
    <div class="scores">
      <p class="scores__p scores--color-turquoise">AI score: {{ aiScore }}</p>
      <p class="scores__p scores--color-scarlet">Your score: {{ userScore }}</p>
    </div>
    <canvas ref="game"></canvas>
    <button type="button" class="btn-restart" @click="restart()">Restart</button>
  </div>
</template>
<script src="@/components/TicTacToeGame.ts" lang="ts"></script>
