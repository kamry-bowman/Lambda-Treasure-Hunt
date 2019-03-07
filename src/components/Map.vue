<template>
  <div id="map">
    <div class="grid" v-for="(row, rowIndex) in map" :key="rowIndex">
      <div class="row" v-for="(col, colIndex) in row" :key="colIndex">
        <Cell :data="col"/>
      </div>
    </div>
    <div>{{ graph }}</div>
  </div>
</template>

<script>
import Cell from "./Cell";
export default {
  name: "Map",
  components: {
    Cell
  },
  props: {
    map: Array,
    graph: Object
  }
};
</script>

<style lang="scss" scoped>
div.grid {
  display: flex;
}
div.row {
  display: flex;
}
</style>
