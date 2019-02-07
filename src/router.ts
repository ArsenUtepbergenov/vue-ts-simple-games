import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'snake',
          component: () => import('./views/SnakeGame.vue'),
        },
        {
          path: 'tictactoe',
          component: () => import('./views/TicTacToe.vue'),
        },
        {
          path: 'tetris',
          component: () => import('./views/Tetris.vue'),
        },
      ],
    },
  ],
});
