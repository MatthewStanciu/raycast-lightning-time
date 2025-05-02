import rgbHex from "rgb-hex";
import getParts from "./get-parts";

type Colors = {
  boltColor: string;
  zapColor: string;
  sparkColor: string;
};

const getColors = (lightningString: string): Colors => {
  const { bolts, zaps, sparks, charges } = getParts(lightningString);
  const boltColor = rgbHex(161, 0, bolts * 16 + zaps);
  const zapColor = rgbHex(zaps * 16 + sparks, 214, 50);
  const sparkColor = rgbHex(133, sparks * 16 + charges, 246);

  return {
    boltColor,
    zapColor,
    sparkColor,
  };
};

export default getColors;
