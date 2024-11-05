const { fetchData, processData } = require('./dataProcessor');
// Mockear la función fetchData
jest.mock('./dataProcessor', () => ({
  ...jest.requireActual('./dataProcessor'),
  fetchData: jest.fn()
}));
describe('Pruebas de Procesamiento de Datos', () => {
  // Prueba de procesamiento exitoso
  test('Los datos deben ser procesados con éxito', () => {
    const mockData = { data: [1, 2, 3, 4], processedSuccessfully: false };
    fetchData.mockReturnValue(mockData);
    processData(mockData); // al momento de enviar datos va a regresar verdadero
    expect(mockData.processedSuccessfully).toBe(true);
    mockData.data = [];
  });
  // Prueba de manejo de errores
  test('El procesamiento de datos debe de arrojar un error', () => {
    const invalidData = { data: null }; // no tiene datos por lo tanto va a causar un error
    expect(() => processData(invalidData)).toThrow('Data processing error');
  });
});
