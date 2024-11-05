function fetchData() {
    //funcion que retorna los datos
    return { data: [1, 2, 3, 4], processedSuccessfully: false };
  }
  function processData(data) {
    // en el caso que no tenga datos va a regresar un error
    if (!data || !Array.isArray(data.data)) {
      throw new Error('Data processing error');
    }
    data.processedSuccessfully = true;
  }
  module.exports = { fetchData, processData };