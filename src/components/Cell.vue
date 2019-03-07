<template>
  <div v-bind:class="{ occupied: col }"></div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    col: Object,
    row: Number
  }
};
</script>

<style lang="scss" scoped>
div {
  width: 10px;
  height: 10px;
  background-color: black;

  &.occupied {
    background-color: yellow;
  }
}
</style>
