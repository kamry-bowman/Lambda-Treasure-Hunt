<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ player.room }}</p>
    <Map :map="map" :graph="graph" :player="player"/>
    <Clock :alarm="next_move_time"/>
  </div>
</template>

<script>
import axios from "axios";
import Map from "./Map.vue";
import Clock from "./Clock.vue";

function getCoords(coords) {
  const [_, x, y] = coords.match(/\((\d*),(\d*)\)/);
  return [Number(x), Number(y)];
}

export default {
  name: "Game",
  components: { Map, Clock },
  data() {
    return {
      map: [[]],
      graph: {},
      info: null,
      next_move_time: new Date(),
      player: {
        pos: [0, 0],
        room: null
      }
    };
  },
  props: {
    msg: String
  },
  methods: {
    updateGame(data) {
      const { cooldown, ...room } = data;
      const { coordinates, room_id, exits } = room;
      const { map, graph, player } = this;
      console.dir(data);
      // update map
      const [x, y] = getCoords(coordinates);
      player.pos = [x, y];
      player.room = room;
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
      this.$set(map[y], x, room);

      if (!graph[room_id]) {
        this.$set(graph, room_id, {
          room,
          edges: exits.reduce((acc, dir) => ({ ...acc, [dir]: "?" }), {})
        });
      }

      // update cooldown
      this.next_move_time = Date.now() + cooldown * 1000;
    },
    async move(dir) {
      try {
        const { data } = await axios.post("/move/", { direction: dir });
        console.dir(data);
        this.updateGame(data);
      } catch (err) {
        console.dir(err);
      }
    },
    handleKeys(event) {
      console.log(event.key);
      switch (event.key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
          this.move("s");
          break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
          this.move("n");
          break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
          this.move("w");
          break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
          this.move("e");
          break;
        case "Enter":
          // Do something for "enter" or "return" key press.
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }

      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    }
  },
  async mounted() {
    const { data } = await axios.get("/adv/init/");
    this.updateGame(data);
    window.addEventListener("keydown", this.handleKeys);
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
