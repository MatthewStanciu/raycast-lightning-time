import msToTime from "./ms-to-time";
import getParts from "./get-parts";

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

  const lightningString = bolts.toString(16) + "~" + zaps.toString(16) + "~" + sparks.toString(16);
  return {
    lightningString,
    originalTimeString: time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
  };
};

export const convertFromLightning = (time: string) => {
  const { bolts, zaps, sparks, charges } = getParts(time);

  let elapsed = (bolts * 16 + zaps) * 16 + sparks;
  if (charges > 0) {
    elapsed = elapsed * 16 + charges;
  }
  const millis = (elapsed * 86400000) / (charges > 0 ? 65536 : 4096);

  return msToTime(millis, time);
};
