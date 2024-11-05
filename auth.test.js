const { authenticate, getUserPasswordFromDB } = require('./auth');
// Mockear la función getUserPasswordFromDB y la libreria auth se queda como viene
jest.mock('./auth', () => ({
  ...jest.requireActual('./auth'),
  getUserPasswordFromDB: jest.fn()
}));
describe('Pruebas de Autenticación de Usuario', () => {
  // Prueba con credenciales válidas
  test('La autenticación debe tener éxito con credenciales correctas', () => {
    // Mockear el valor de retorno de getUserPasswordFromDB
    getUserPasswordFromDB.mockReturnValue('validPass');
    expect(authenticate('validUser', 'validPass')).toBe(true);
  });
  // Prueba con credenciales incorrectas
  test('La autenticación debe fallar con credenciales incorrectas', () => {
    getUserPasswordFromDB.mockReturnValue('validPass');
    expect(authenticate('validUser', 'wrongPass')).toBe(false);
  });
  // Prueba cuando el usuario no existe
  test('La autenticación debe fallar si el usuario no existe', () => {
    getUserPasswordFromDB.mockReturnValue(null);
    expect(authenticate('validUser', 'pass')).toBe(false);
  });
});
