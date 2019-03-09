<template>
  <div id="map">
    <div class="grid">
      <div class="row" v-for="(row, rowIndex) in view" :key="rowIndex">
        <Cell
          v-for="(col, colIndex) in row"
          :key="col.mapPos"
          :col="colIndex"
          :row="rowIndex"
          :cell="col"
          :center="center"
        />
      </div>
    </div>
    <!-- <div>{{ graph }}</div> -->
  </div>
</template>

<script>
import Cell from "./Cell";

const WIDTH = 10;
const HEIGHT = 10;

export default {
  name: "Map",
  components: {
    Cell
  },
  data() {
    return { center: [Math.floor(WIDTH / 2), Math.floor(HEIGHT / 2)] };
  },
  computed: {
    view: function() {
      const grid = [];
      const { map, player } = this;
      let [x, y] = player.pos;
      // convert y to col
      y = map.length - 1 - y;
      // build a grid up 10 x 10 surrounding current position
      for (let i = 0; i < HEIGHT; i++) {
        // convert player's vertical index relative to player to a grid height
        const relPos = i - Math.floor(HEIGHT / 2);
        const gridRow = y + relPos;
        // if this column is on grid, we need to grab any cells included in our map
        if (map[gridRow]) {
          // create a row, then grab any values we can from the map, otherwise set value to null
          const row = [];
          for (let j = 0; j < WIDTH; j++) {
            const relPos = j - Math.floor(WIDTH / 2);
            const gridCol = x + relPos;
            const cellFromMap = map[gridRow][gridCol];
            row[j] = cellFromMap || {
              mapPos: `${gridCol},${gridRow}`,
              explored: false
            };
          }
          grid.push(row);
        } else {
          // create an empty row
          const row = [];
          for (let j = 0; j < WIDTH; j++) {
            const relPos = j - Math.floor(WIDTH / 2);
            const gridCol = x + relPos;
            row[j] = { mapPos: `${gridCol},${gridRow}`, explored: false };
          }
          grid.push(row);
        }
      }
      return grid;
    }
  },
  props: {
    map: Array,
    graph: Object,
    player: Object
  }
};
</script>

<style lang="scss" scoped>
#map {
  width: 320px;
  height: 320px;
}
div.grid {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
div.row {
  flex-grow: 1;
  display: flex;
}
</style>
