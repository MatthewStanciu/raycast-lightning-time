const validate = (lightningString: string) => {
  return /[0-9a-f]~[0-9a-f]~[0-9a-f](\|[0-9a-f]+|)$/g.test(lightningString);
};

export default validate;
