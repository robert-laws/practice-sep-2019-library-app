const durationIntervals = (start, finish, interval) => {
  let intervals = [];
  do {
    intervals.push(start);
    start = start + interval;
  }
  while(start <= finish)
  return intervals;
}

export default durationIntervals;