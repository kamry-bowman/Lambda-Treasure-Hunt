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
  height: 100%;
  flex: 1 10px;
  background-color: gray;

  &.explored {
    background-color: red;

    &.nWall {
      border-top: 2px solid white;
    }

    &.sWall {
      border-bottom: 2px solid white;
    }
    &.wWall {
      border-left: 2px solid white;
    }
    &.eWall {
      border-right: 2px solid white;
    }

    &.center {
      background-color: blue;
    }
  }
}
</style>
