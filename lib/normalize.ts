const normalize = (lightningString: string) => {
  const normalizedLightningString = lightningString.match(/[0-9a-f]~[0-9a-f]~[0-9a-f](\|[0-9a-f]+)?/g)?.[0];
  const isValid = /[0-9a-f]~[0-9a-f]~[0-9a-f](\|[0-9a-f]+)?/g.test(lightningString);
  return {
    normalizedLightningString: normalizedLightningString || "",
    isValid,
  };
};

export default normalize;
