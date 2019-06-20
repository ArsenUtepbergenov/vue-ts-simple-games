<template>
  <div class="scores">
    <p class="scores__p" v-for="(score, index) in scores" :key="index" :class="score.styleOfMessage">
      {{score.message}} - {{score.value}}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Scores extends Vue {
  @Prop({ default: [] }) private readonly scores!: object[];
}
</script>
