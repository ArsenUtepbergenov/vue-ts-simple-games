<template>
  <div class="tictactoe">
    <div class="scores">
      <p class="scores__p scores--color-turquoise">Score of first player: {{ getFirstPlayerScore }}</p>
      <p class="scores__p scores--color-turquoise">Score of second player: {{ getSecondPlayerScore }}</p>
      <p class="scores__p scores--color-scarlet">Score of AI: {{ getAiScore }}</p>
    </div>
    <div class="tictactoe__game">
      <canvas ref="game"></canvas>
      <Message v-if="isOver" :message="getMessage" :state="getStyleOfMessage" />
      <button type="button" class="btn-restart" @click="restart()">Restart</button>
    </div>
  </div>
</template>
<script src="@/components/games/TicTacToeGame.ts" lang="ts"></script>
