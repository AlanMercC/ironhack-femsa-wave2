class UIComponent {
    constructor(width) {
      this.width = width;
    }

    adjustsToScreenSize(screenWidth) {
        //revisa que el dato que se inyecto sea el mismo que se esta validando
      return this.width === screenWidth;
    }
  }
  function setupUIComponent(width) {
    // Simula un tamaño de pantalla
    return new UIComponent(width);
  }
  module.exports = { UIComponent, setupUIComponent };