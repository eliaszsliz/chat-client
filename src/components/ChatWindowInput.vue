<template lang="pug">
  div
    div.ChatWindowInput__FieldsWrapper
      label Username
        input.AuthorInput(
          v-model="message.author"
          :class="{ AuthorInput: true, 'AuthorInput--has-error': !isValid }"
          @input="isValid = true"
        )

      textarea(
        v-model="message.body"
        :class="{ BodyInput: true, 'BodyInput--has-error': !isValid }"
        cols="30"
        rows="10"
        @input="isValid = true"
        @keyup.enter="validAndSend"
      )

      button(@click="validAndSend") Send

    p.ChatWindowInput__Error(v-if="!isValid") Fill in author and message field, please
</template>

<script>
export default {
  name: 'ChatWindowInput',
  props: {
    sendToSocket: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      message: {
        author: '',
        body: '',
      },
      isValid: false,
    };
  },
  methods: {
    valid() {
      const { author, body } = this.message;
      return author.length > 0 && body.length > 0;
    },
    validAndSend() {
      this.isValid = this.valid();

      if (this.isValid) {
        this.sendToSocket(this.message);
        this.message.body = '';
      }
    },
  },
};
</script>

<style scoped lang="sass">
  .ChatWindowInput
    &__Error
      color: indianred

    &__FieldsWrapper
      display: flex
      flex-direction: column
      max-width: 500px
      margin: auto

      .AuthorInput
        padding:  12px
        border: 1px solid #ccc
        margin-bottom: 10px
        margin-left: 10px

      .BodyInput
        padding: 12px
        border: 1px solid #ccc

      .AuthorInput, .BodyInput
        &--has-error
          border: 2px solid indianred

      button
        background-color: rgba(238, 46, 0, 0.52)
        color: white
        border: none
        padding: 15px
        font-size: 1.2rem
</style>
