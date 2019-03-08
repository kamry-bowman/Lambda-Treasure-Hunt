<template>
  <div>
    <h2>{{ room.title }} </h2>
    <p> {{ room.description }} </p>
  </div>
</template>

<script>

export default {
  name: "Info",
  
  props: {
    room: Object
  }
};
</script>

<style lang="scss" scoped>

</style>
