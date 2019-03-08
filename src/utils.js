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
    return findNearestUnvisited(graph, room_id);
  }
}

function findNearestUnvisited(graph, room) {
  let currentId = room;
  const q = [];
  const visited = {};
  Object.keys(graph[currentId]).forEach(dir => {
    q.unshift({ room: currentId, dir });
  });
  let found = false;
  while (!found && q.length) {
    // grab off right of queue
    const { room: lastId, dir } = q.pop();
    currentId = graph[lastId][dir];
    if (!visited[currentId]) {
      visited[currentId] = [
        { room: currentId, dir },
        ...(visited[lastId] || [])
      ];
      const options = graph[currentId];
      for (let opt of Object.keys(options)) {
        if (options[opt] === "?") {
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

// const exampleGraph = JSON.parse(
//   '{"0":{"n":10,"s":2,"e":"?","w":"?"},"2":{"n":0,"s":6,"e":"?"},"6":{"n":2,"w":7},"7":{"n":8,"e":6,"w":"?"},"8":{"s":7,"w":16},"10":{"n":19,"s":0,"w":"?"},"16":{"n":58,"e":8,"w":"?"},"19":{"n":20,"s":10,"w":"?"},"20":{"n":63,"s":19,"e":"?","w":"?"},"58":{"s":16,"w":65},"63":{"n":72,"s":20,"w":"?"},"65":{"n":74,"e":58,"w":"?"},"72":{"s":63,"w":76},"74":{"n":87,"s":65,"w":161},"76":{"n":83,"e":72,"w":"?"},"83":{"s":76,"e":"?","w":125},"87":{"s":74},"125":{"n":165,"e":83,"w":"?"},"161":{"e":74},"165":{"n":203,"s":125,"w":"?"},"203":{"n":268,"s":165,"e":"?"},"268":{"s":203,"e":"?","w":312},"312":{"n":328,"e":268},"328":{"n":332,"s":312,"e":"?","w":"?"},"332":{"n":350,"s":328},"350":{"n":436,"s":332,"e":404},"404":{"n":481,"w":350},"436":{"s":350},"481":{"s":404}}'
// );
// const room = 161;
// console.dir(findNearestUnvisited(exampleGraph, room));

export { getMoves };
