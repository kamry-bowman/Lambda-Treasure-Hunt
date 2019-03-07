<template>
  <div v-bind:class="{ occupied: data }"></div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    data: Object
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
