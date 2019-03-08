<template>
  <div class="game">
    <h1>Good Game</h1>
    <Map :map="map" :graph="graph" :player="player"/>
    <Info :room="player.room" />
    <Clock :alarm="nextMoveTime" :autoMove="autoMove" :initialized="initialized"/>
  </div>
</template>

<script>
import axios from "axios";
import Map from "./Map.vue";
import Clock from "./Clock.vue";
import Info from './Info.vue';
import { getMoves } from "../utils";

const invertDirs = {
  n: "s",
  s: "n",
  e: "w",
  w: "e"
};

function getCoords(coords) {
  const [_, x, y] = coords.match(/\((\d*),(\d*)\)/);
  return [Number(x), Number(y)];
}

export default {
  name: "Game",
  components: { Map, Clock, Info },
  data() {
    return {
      initialized: false,
      map: [[]],
      graph: {},
      info: null,
      nextMoveTime: Date.now(),
      player: {
        pos: [0, 0],
        room: null
      },
      autopilot: true,
      nextMoves: []
    };
  },
  props: {
    msg: String
  },
  methods: {
    updateGame(data, trace) {
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
        map.unshift(Array.from({ length: width }).fill(null));
      }
      if (map[0].length < width) {
        for (let row of map) {
          while (row.length < width) {
            row.push(null);
          }
        }
      }
      this.$set(map[map.length - 1 - y], x, room);

      if (!graph[room_id]) {
        this.$set(
          graph,
          room_id,
          exits.reduce((acc, dir) => ({ ...acc, [dir]: "?" }), {})
        );
      }
      // update graph with direction info for room moved out of and moved into
      if (trace) {
        const { dir, from } = trace;
        if (graph[from][dir] === "?") {
          this.$set(graph[from], dir, room_id);
        }
        if (graph[room_id][invertDirs[dir]] === "?") {
          this.$set(graph[room_id], invertDirs[dir], from);
        }
      }

      // update cooldown
      this.nextMoveTime = Date.now() + cooldown * 1000;
    },
    async move({ dir, room }) {
      try {
        const from = this.player.room.room_id;
        const next_room_id = room === "?" ? undefined : String(room);
        const { data } = await axios.post("/move/", {
          direction: dir,
          next_room_id
        });
        this.updateGame(data, { dir, from });
      } catch (err) {
        // if error, check for cooldown update
        if (err.response.data && err.response.data.cooldown) {
          this.nextMoveTime = Date.now() + err.response.data.cooldown * 1000;
        }
      }
    },
    handleKeys(event) {
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
    },
    autoMove() {
      // check if a next move is already, cached, if not, generate next move
      if (!this.nextMoves.length) {
        const newMoves = getMoves(this.graph, this.player.room.room_id);
        const nextMove = newMoves.pop();
        console.log(nextMove);
        this.move(nextMove);
        this.nextMoves = [...this.nextMoves, ...newMoves];
      } else {
        const nextMove = this.nextMoves.pop();
        if (nextMove) {
          this.move(nextMove);
        }
      }
    }
  },
  async mounted() {
    const { data } = await axios.get("/adv/init/");
    this.updateGame(data);
    this.initialized = true;
    window.addEventListener("keydown", this.handleKeys);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
}
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
