# Lab7
### 1. Design Problem Solving:
**Design Challenges:** 
#### 1.1 Global Configuration Management: Design a system that ensures a single, globally accessible configuration object without access conflicts.
**Patrón de Diseño:** 
**Singleton Pattern**
**Explicación del uso de este patron:** 
El patrón Singleton asegura que solo haya una sola instancia global por lo tanto esto evitaria la duplicidad sin conflicto de acceso

**Ejemplo de uso**
```
class Configuration {
  private static instance = null;
  constructor() {
  }

  static getInstance(){
    if(!this.instance){
        instance = new configuration()
        return instance;
    }
    return this.instance;
  }
}

// creación de instancías que van a compartir lo mismo ya que si la instancia ya fue incializada se regresa esta misma
const config1 = Configuration.getInstance();
const config2 = Configuration.getInstance();
```
---
###  1.2 Dynamic Object Creation Based on User Input: Implement a system to dynamically create various types of user interface elements based on user actions.
**Patrón de Diseño:**
**Factory Pattern**
**Explicación del uso de este patron:** 
El patrón Factory permite crear un objeto sin tener claro que tipo sera ya que puede ser creado dependiendo de la acción del usuario. En este caso, se utilizará una fábrica de elementos de la interfaz de usuario que creará dinámicamente los componentes basándose en las acciones del usuario.

**Ejemplo de uso**
```
interface UI {
    crear();
}
class Boton extends {
  crear() {
    return "Botón creado";
  }
}
class CampoTexto extends{
  crear() {
    return "Campo de texto creado";
  }
}
class UIFactory {
    UI elemento;
  crearElemento(tipo) {
    if (tipo === "boton") {
      elemento = new Boton();
    } else if (tipo === "campo_texto") {
      elemento= new CampoTexto();
    }
    return elemento;
  }
}

// aqui un ejemplo sencillo 
const uiFactory = new UIFactory();
const elemento = uiFactory.crearElemento("boton");
console.log(elemento.crear());  // Imprime "Botón creado"

```

###  1.3 State Change Notification Across System Components: Ensure components are notified about changes in the state of other parts without creating tight coupling.
**Patrón de Diseño:**
**Observer Pattern**
**Explicación del uso de este patron:** 
El patrón Observer permite que un objeto Subject notifique a otros objetos Observer cuando su estado cambie. Los observers se suscriben al subject y son notificados de cualquier cambio. este patron ayuda al bajo acoplamiento

**Ejemplo de uso**
```
class Subject {
  constructor() {
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  notificar() {
    this.observers.forEach(observer => observer.actualizar());
  }
}
class Observer {
  actualizar() {}
}
class ComponenteA extends Observer {
  actualizar() {
    console.log("Componente A ha sido notificado de un cambio");
  }
}

class ComponenteB extends Observer {
  actualizar() {
    console.log("Componente B ha sido notificado de un cambio");
  }
}

const subject = new Subject();
const componenteA = new ComponenteA();
const componenteB = new ComponenteB();
subject.addObserver(componenteA);
subject.addObserver(componenteB);
subject.notificar();  // Imprime "Componente A ha sido notificado de un cambio" y "Componente B ha sido notificado de un cambio"
```

###  1.4 Efficient Management of Asynchronous Operations: Manage multiple asynchronous operations like API calls which need to be coordinated without blocking the main application workflow.
**Patrón de Diseño:**
**Async/Await**
**Explicación del uso de este patron:** 
El patrón Async/Await permite crear tareas asincronas de manera sencilla y en este caso agrege el patron Async/Await ya que fue uno de los vistos en clase  

**Ejemplo de uso**

```
async function message(){

    console.log('hello world')

}

await message();
```

---------------------------------------------------------
# 2. Project Execution Simulation:
**Simulación**
Usando el ejemplo de estar desarrollando una aplicación de gestión de tareas para estudiantes de manera colaborativa que permite a los estudiantes gestionar sus tareas, configurar preferencias, ver el progreso y recibir notificaciones de cambios. Durante el proceso de desarrollo, se enfrentan varios desafíos relacionados con la configuración global, la creación dinámica de UI, la gestión de estados y la ejecución de operaciones asíncronas.
1. Global Configuration Management: Desde el inicio, decidimos que necesitábamos una configuración centralizada para las preferencias del usuario y las conexiones a APIs. Implementamos el patrón Singleton para la clase ConfiguracionGlobal, asegurando que no existieran conflictos de acceso. Esta clase es accesible desde cualquier parte de la aplicación, garantizando una única instancia compartida.
2. Dynamic Object Creation Based on User Input: Como la aplicación permite a los usuarios personalizar la interfaz, necesitamos crear elementos de UI basados en sus acciones. Usamos el patrón Factory para crear dinámicamente botones, cuadros de texto o menús dependiendo de las opciones seleccionadas por el usuario. Cada tipo de acción del usuario invoca un método de la Fábrica de Componentes UI, que decide qué objeto de UI crear y agregar a la pantalla.
3. State Change Notification Across System Components: Al permitir que varios usuarios modifiquen tareas en tiempo real, es fundamental notificar a todos los componentes relevantes cuando se realiza un cambio. Implementamos el patrón Observer en el GestorDeTareas, de modo que cada vez que se agregue, elimine o modifique una tarea, todos los componentes visuales (como las vistas de tareas) sean notificados y actualizados automáticamente.
4. Efficient Management of Asynchronous Operations: La aplicación hace numerosas llamadas a APIs externas para obtener o modificar tareas. Estas operaciones son asíncronas y no pueden bloquear la interfaz de usuario. Implementamos el patrón Async/Await para usar cada solicitud en un hilo diferente sin bloquear el hilo principal. Los comandos se ejecutan en segundo plano y notifican a los componentes correspondientes cuando se completan.

