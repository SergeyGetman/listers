export const changeDataFormMinimalSend = (data: any) => {
  const upgradeData = {
    transport_type: localStorage.getItem('transportType'),
    year: data.year.value,
    make: data.make.label,
    model: data.model.label,
  };

  return upgradeData;
};
