<template>
  <div class="scores">
    <p class="scores__p" v-for="(score, index) in scores" :key="index" :class="colors[index]">
      {{ score.message }} - {{ score.value }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Scores extends Vue {
  private readonly colors: string[] = [
    'scores--c-scarlet',
    'scores--c-turquoise',
    'scores--c-light-blue',
  ];
  @Prop({ default: [] }) private readonly scores!: object[];
}
</script>
