const validate = (lightningTime: string) => {
  const tildeCount = (lightningTime.match(/~/g) || []).length;
  const validLetters = /[a-f]+$/g.test(lightningTime.replace("~", ""));
  return tildeCount === 2 && lightningTime.length === 5 && validLetters;
};

export default validate;
