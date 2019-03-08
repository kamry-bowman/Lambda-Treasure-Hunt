<template>
  <div
    v-bind:class="{
      explored: explored,
      center: here,
      nWall: exits.n,
      sWall: exits.s,
      eWall: exits.e,
      wWall: exits.w
    }"
  ></div>
</template>

<script>

export default {
  name: "Cell",
  computed: {
    explored: function() {
      return typeof this.cell.room_id === 'number';
    },
    here: function() {
      return this.col === this.center[0] && this.row === this.center[1];
    },
    exits: function() {
      const defaultObj = { n: true, s: true, w: true, e: true };
      return this.cell.exits
        ? this.cell.exits.reduce(
            (acc, dir) => {
              return { ...acc, [dir]: false };
            },
            { ...defaultObj }
          )
        : defaultObj;
    }
  },
  props: {
    col: Number,
    row: Number,
    cell: Object,
    center: Array
  }
};
</script>

<style lang="scss" scoped>
div {
  width: 10px;
  height: 10px;
  background-color: gray;

  &.explored {
    background-color: red;

    &.nWall {
      border-top: 1px solid white;
    }

    &.sWall {
      border-bottom: 1px solid white;
    }
    &.wWall {
      border-left: 1px solid white;
    }
    &.eWall {
      border-right: 1px solid white;
    }

    &.center {
      background-color: blue;
    }
  }
}
</style>
