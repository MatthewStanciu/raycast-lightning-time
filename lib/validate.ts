const validate = (lightningTime: string) => {
  const tildeCount = (lightningTime.match(/~/g) || []).length;
  const validCharacters = /[0-9a-f]+$/g.test(lightningTime.replace("~", ""));
  return tildeCount === 2 && lightningTime.length === 5 && validCharacters;
};

export default validate;
