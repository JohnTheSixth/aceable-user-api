const removePassword = (data) => {
  if (data && data.password) {
    const dataClone = { ...data };
    delete dataClone.password;

    return dataClone;
  }
};

const filterCreatedData = (data) => {
  return Promise.resolve(data.ops.map(data => removePassword(data)));
};

module.exports = {
  filterCreatedData,
  removePassword,
};
