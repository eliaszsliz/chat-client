<template lang="pug">
  div
    div.MessagesWrapper(ref="messagesWrapper")
      chat-window-message(
        v-for="(m, index) in messages"
        :key="index + m.date"
        v-bind="m"
      )

    chat-window-input(
      @input="send"
    )
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ChatWindowMessage from './ChatWindowMessage.vue';
import ChatWindowInput from './ChatWindowInput.vue';

import SocketMixin from '../mixins/Socket';


export default {
  name: 'ChatWindow',
  mixins: [SocketMixin],
  components: {
    ChatWindowMessage,
    ChatWindowInput,
  },
  computed: {
    ...mapGetters({ messages: 'allMessages' }),
  },
  methods: {
    ...mapActions(['addMessage']),
    scrollChatWindowToBottom() {
      this.$refs.messagesWrapper.scrollTo(0, this.$refs.messagesWrapper.scrollHeight);
    },
    send(messageObject) {
      this.sendMessage(messageObject);
    },
  },
  watch: {
    messages: {
      handler() {
        this.$nextTick(() => {
          this.scrollChatWindowToBottom();
        });
      },
      immediate: false,
    },
  },
};
</script>

<style scoped lang="sass">
  .MessagesWrapper
    border: 2px solid #ccc
    margin: 12px auto
    height: 400px
    width: 500px
    overflow-y: auto
</style>
