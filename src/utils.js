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
    return [{ n: "?" }];
  }
}

export { getMoves };
