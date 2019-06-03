<template>
  <div class="tictactoe">
    <div class="modes">
      <button type="button" class="btn-outline btn-outline--play-with-ai" @click="setOpponent('AI')">Play with AI</button>
      <button type="button" class="btn-outline btn-outline--game-for-two" @click="setOpponent('Two')">Game for two</button>
    </div>
    <div class="scores">
      <p class="scores__p scores--color-turquoise">Score of first player: {{ getFirstPlayerScore }}</p>
      <p class="scores__p scores--color-light-blue">Score of second player: {{ getSecondPlayerScore }}</p>
      <p class="scores__p scores--color-scarlet">Score of AI: {{ getAiScore }}</p>
    </div>
    <div class="tictactoe__game">
      <canvas ref="game"></canvas>
      <Message v-if="isMessage" :message="getMessage" :state="getStyleOfMessage" />
      <button type="button" class="btn-outline btn-outline--restart" @click="restart()">Restart</button>
    </div>
  </div>
</template>
<script src="@/components/games/TicTacToeGame.ts" lang="ts"></script>
