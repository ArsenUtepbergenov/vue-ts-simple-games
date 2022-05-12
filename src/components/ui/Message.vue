<template>
  <div class="message">
    <p :class="['message__p', type]">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { MsgType } from '@/models/enums';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Message extends Vue {
  @Prop() message!: string;
  @Prop({ default: MsgType.DEFAULT }) type?: MsgType;
}
</script>
