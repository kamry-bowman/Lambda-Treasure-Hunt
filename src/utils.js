function getMoves(graph, room_id) {
  if (!graph[room_id]) {
    return [];
  }
  console.log(graph[room_id]);
  const options = Object.entries(graph[room_id]).filter(
    ([dir, room]) => room === "?"
  );
  console.log(options);
  if (options.length) {
    const [dir, room] = options[0];
    return [{ dir, room }];
  } else {
    // implement BFS here
    const options = Object.entries(graph[room_id]);
    console.log(options);
    const slicer = Math.floor(Math.random() * options.length);
    console.log(slicer);
    const resp = options[Math.floor(slicer)];
    console.log(resp);

    return [{ dir: resp[0], room: resp[1] }];
  }
}

const invertDirs = {
  n: "s",
  s: "n",
  w: "e",
  e: "w"
};

function findNearestUnvisited(graph, room) {
  const q = [];
  const visited = {};
  Object.entries(graph[room]).forEach(([dir, room]) => {
    q.unshift([{ room, dir }]);
  });
  const found = false;
  let currentId = room;
  while (!found && q.length) {
    // grab off right of queue
    const { room, dir } = q.pop();
    currentId = graph[room][dir];
    if (!visited[currentId]) {
      visited[currentId] = [...visited[room], { room, dir }];
      const options = graph[currentId];
      for (opt of Object.keys(current)) {
        if (current[opt] === "?") {
          found = opt;
          break;
        } else {
          q.unshift({ room: currentId, dir: opt });
        }
      }
    }
  }
  if (found) {
    return visited[currentId];
  } else {
    return false;
  }
}

export { getMoves };
