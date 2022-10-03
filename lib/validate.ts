const validate = (lightningTime: string) => {
  const tildeCount = (lightningTime.match(/~/g) || []).length;
  const validCharacters = /[0-9a-f]+$/g.test(lightningTime.replace("~", "").replace("|", ""));
  const correctLength = lightningTime.includes("|") ? 7 : 5;
  return tildeCount === 2 && lightningTime.length === correctLength && validCharacters;
};

export default validate;
