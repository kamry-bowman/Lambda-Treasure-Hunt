<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ info }}</p>
    <Map :map="map" :graph="graph" :player="player"/>
  </div>
</template>

<script>
import axios from "axios";
import Map from "./Map.vue";

function getCoords(coords) {
  const [_, x, y] = coords.match(/\((\d*),(\d*)\)/);
  return [Number(x), Number(y)];
}

export default {
  name: "Game",
  components: { Map },
  data() {
    return {
      map: [[]],
      current: null,
      graph: {},
      info: null,
      player: {
        pos: [0, 0]
      }
    };
  },
  props: {
    msg: String
  },
  mounted() {
    return axios.get("/adv/init/").then(({ data }) => {
      const { coordinates, room_id, exits } = data;
      const { map, graph, player } = this;
      console.dir(data);
      // update map
      const [x, y] = getCoords(coordinates);
      player.pos = [x, y];
      const width = map[0] && map[0].length > x + 1 ? map[0].length : x + 1;
      const height = y + 1;
      while (map.length < height) {
        map.push(Array.from({ length: width }).fill(null));
      }
      if (map[0].length < width) {
        for (let row of map) {
          while (row.length < width) {
            row.push(null);
          }
        }
      }
      console.log(map.length, y, map[y]);
      this.$set(map[y], x, data);

      if (!graph[room_id]) {
        this.$set(graph, room_id, {
          data,
          edges: exits.reduce((acc, dir) => ({ ...acc, [dir]: "?" }), {})
        });
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
