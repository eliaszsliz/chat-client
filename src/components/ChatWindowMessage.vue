<template lang="pug">
  div.Message
    div(:class="`Message__Content Message__Content--from-${origin.toLowerCase()}`")
      b {{ author }} {{ readableDate }}
      span.text {{ body }}
</template>

<script>
export default {
  name: 'ChatWindowMessage',
  props: {
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      validator(value) {
        return ['SERVER', 'OTHER', 'ERROR'].indexOf(value) !== -1;
      },
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    readableDate() {
      const { date } = this;

      const hh = `0${date.getHours()}`.slice(-2);
      const mm = `0${date.getMinutes()}`.slice(-2);

      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} -
       ${hh}:${mm}`;
    },
  },
};
</script>

<style scoped lang="sass">
  .Message
    margin: 12px

    .Message__Content
      display: inline-block
      padding: 12px

      .text
        margin-left: 4px

      &--from-server
        background-color: lightblue

      &--from-other
        background-color: lightgray

      &--from-error
        background-color: lightcoral

</style>
