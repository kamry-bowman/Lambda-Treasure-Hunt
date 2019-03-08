<template>
  <div>
    <h2>{{ player.room.title }} </h2>
    <p> {{ player.room.description }} </p>
  </div>
</template>

<script>

export default {
  name: "Info",
  
  props: {
    player: Object
  }
};
</script>

<style lang="scss" scoped>

</style>
