const getParts = (time: string) => {
  const timeSplit = time.split("~");
  const bolts = parseInt(timeSplit[0], 16);
  const zaps = parseInt(timeSplit[1], 16);
  const sparks = parseInt(time.includes("|") ? timeSplit[2].split("|")[0] : timeSplit[2], 16);
  const charges = parseInt(timeSplit[2].split("|")[1], 16) || 0;

  return {
    bolts,
    zaps,
    sparks,
    charges,
  };
};

export default getParts;
