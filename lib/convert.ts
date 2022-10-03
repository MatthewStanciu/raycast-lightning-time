export const convertToLightning = (time: Date) => {
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

export const convertFromLightning = (time: string) => {
  const timeSplit = time.split("~");
  const bolts = parseInt(timeSplit[0], 16);
  const zaps = parseInt(timeSplit[1], 16);
  const sparks = parseInt(timeSplit[2], 16);

  const elapsed = (bolts * 16 + zaps) * 16 + sparks;
  const millis = (elapsed * 86400000) / 4096;

  return msToTime(millis);
};

const msToTime = (millis: number) => {
  const ms = millis % 1000;
  millis = (millis - ms) / 1000;
  const secs = millis % 60;
  millis = (millis - secs) / 60;
  const mins = millis % 60;
  const hrs = (millis - mins) / 60;

  const date = new Date();
  date.setHours(hrs);
  date.setMinutes(mins);
  date.setSeconds(secs);

  return date.toLocaleTimeString();
};
