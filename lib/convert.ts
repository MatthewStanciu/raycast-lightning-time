import msToTime from "./ms-to-time";

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
  const sparks = parseInt(time.includes("|") ? timeSplit[2].split("|")[0] : timeSplit[2], 16);
  const charges = parseInt(timeSplit[2].split("|")[1], 16) || 0;
  console.log(bolts, zaps, sparks, charges);

  let elapsed = (bolts * 16 + zaps) * 16 + sparks;
  if (charges > 0) {
    elapsed = elapsed * 16 + charges;
  }
  const millis = (elapsed * 86400000) / 4096;

  return msToTime(millis);
};
