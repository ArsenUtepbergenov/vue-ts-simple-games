<template>
  <div class="message">
    <p :class="['message__p', styleState]">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Message extends Vue {
  @Prop() private message!: string;
  @Prop() private state?: string;

  get styleState(): string {
    let style = 'message--primary';
    if (this.state) {
      if (this.state === 'error') {
        style = 'message--error';
      }
      if (this.state === 'over') {
        style = 'message--over';
      }
    }
    return style;
  }
}
</script>
