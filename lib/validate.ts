const validate = (lightningTime: string) => {
  const tildeCount = (lightningTime.match(/~/g) || []).length;
  return tildeCount === 2 && lightningTime.length === 5;
};

export default validate;
