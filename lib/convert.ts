const convert = (time: Date) => {
  const millisPerSpark = 21093.75; // 86400000 / 16^3

  const millis =
    1000 * 60 * 60 * time.getHours() +
    1000 * 60 * time.getMinutes() +
    1000 * time.getSeconds() +
    time.getMilliseconds();
  const totalSparks = millis / millisPerSpark;
  const totalZaps = totalSparks / 16;
  const totalBolts = totalZaps / 16;

  const sparks = Math.floor(totalSparks) % 16;
  const zaps = Math.floor(totalZaps) % 16;
  const bolts = Math.floor(totalBolts) % 16;

  const timeString = bolts.toString(16) + "~" + zaps.toString(16) + "~" + sparks.toString(16);
  return timeString;
};

export default convert;
