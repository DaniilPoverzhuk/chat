module.exports = (payload) => {
  if (!payload) return;

  const { dataValues } = payload;
  return dataValues;
};
