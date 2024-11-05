const { UIComponent, setupUIComponent } = require('./uiComponent');
// mocks
jest.mock('./uiComponent', () => ({
  ...jest.requireActual('./uiComponent'),
  setupUIComponent: jest.fn()
}));
describe('Pruebas de Tamaño de la Pantalla de Usuario', () => {

  // prueba con el tamaño dado originalmente
  test('El UI debe ser de 1024 píxeles', () => {
    const mockComponent = new UIComponent(1024);
    setupUIComponent.mockReturnValue(mockComponent);
    const uiComponent = setupUIComponent(1024);
    expect(uiComponent.adjustsToScreenSize(1024)).toBe(true);
  });

  // Prueba para un ancho diferente
  test('El UI debe ser de 768 píxeles', () => {
    const mockComponent = new UIComponent(768);
    setupUIComponent.mockReturnValue(mockComponent);
    const uiComponent = setupUIComponent(768);
    expect(uiComponent.adjustsToScreenSize(768)).toBe(true);
  });
});
