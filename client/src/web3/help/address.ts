const shortAddress = (add: string, start = 8, end = 6) => {
  if (!add || add.length < 42) return add;

  return `${add.slice(0, start)}... ...${add.slice(
    add.length - end,
    add.length
  )}`;
};

export default shortAddress;
