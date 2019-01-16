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
    },
    {
      path: '/snake',
      name: 'snake',
      component: () => import('./views/Snake.vue'),
    },
    {
      path: '/tictactoe',
      name: 'tictactoe',
      component: () => import('./views/TicTacToe.vue'),
    },
    {
      path: '/tetris',
      name: 'tetris',
      component: () => import('./views/Tetris.vue'),
    },
  ],
});
