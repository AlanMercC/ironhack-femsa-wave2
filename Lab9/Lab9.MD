## Esquema de Arquitectura de Microservicios
### Diagrama de la Arquitectura Propuesta
A continuación, se muestra un diagrama simplificado de la arquitectura de microservicios para mostrar cómo interactúan entre sí igual en la misma carpeta agrego una imagen de como quedaria exactamente, ya que aquí en marckdown no lo puedo poner mas detallado:
```
+-----------------------+       +---------------------+      +---------------------+
| Microservicio de       |       | Microservicio de     |      | Microservicio de|
| User Management   |<----->| Product Catalog|<---->           |Order Processing|
|                       |       |                     |        |                |
+-----------------------+       +---------------------+      +---------------------+
        ^                            ^                             |
        |                            |                             |
+-----------------------+          +---------------------+          |
| Microservicio de       |<----->  | Soporte al Cliente  |  <  -  -    -         Base de datos para cada microservicio
| Customer Support      |         |                     |
+-----------------------+          +---------------------+

```
### Explicación de la Interacción entre Servicios y Flujo de Comunicación
1. **Frontend**: El usuario interactúa con la interfaz, que a su vez se conecta al API GATEWAY.
2. **API Gateway**: el componente actúa como el punto de entrada principal, redirigiendo las solicitudes del usuario/frontend a los servicios correspondientes y permitiendo el balanceo de carga.
3. **Microservicios**:
    - **User Management**: Este servicio se encarga de la administración de los perfiles de usuario, autenticación y autorización.
    - **Product Catalog**: Este servicio maneja el catálogo de los productos y sus datos mas importantes como son: descripcion, precio, imágenes e inventario.
    - **Order Processing**: Adminstra todo el proceso de pedidos, por ejemplo la selección del producto, pago y la gestión de órdenes.
    - **Customer Support**: Maneja las consultas y problemas de los clientes a través de un sistema de tickets.
4. **Base de Datos**: Cada microservicio tiene su propia base de datos independiente.
## Plan de Migración Detallado
### Prioridades de Migración de Servicios
1. **User Management**: El login y signUP son servicios importantes y deben ser migrados en primera instancia y así garantizar que los usuarios puedan seguir usando la aplicación.
2. **Order Processing**: Dado que el servicio de ordenes es importante de igual manera, al migrarlo en un microservicio nos ayudará a aislar problemas y la escalabilidad.
3. **Product Catalog**: El catalogo puede ser migrado en una tercera iteración ya que no es muy prioritario.
4. **Customer Support**: El servició al cliente puede ser migrado al final ya que no es una operación critica.

### Estrategia para Manejar Dependencias de Datos
- **Base de Datos Independiente**: Cada microservicio tendra su propia base de datos para tener bajo acoplamiento
- **Sincronización de Datos**: Los servicios que interactuen entre si deben de compartir información a travez de apis
- **Eventos y Mensajería**: Utilizar patrones de mensajería como por ejemplo RabbitMQ

### Descripción del Proceso de Migración de la Base de Datos Monolítica a un Entorno de Microservicios
1. **Descomposición de la Base de Datos**: Identificar las tablas de la base monolitica y de esta formaa pasarla a la base de datos correspondientes ejemplo separar todas las tablas de cliente etc.
2. **Migración Incremental**: Transferir poco a poco los  datos e la base de datos monolitica a alas bases indeendientes teniendo en cuenta que en este proceso debe seguir funcionando la base de datos monolitica.
3. **Implementación de APIs de Acceso**: Agregar apis de acceso para que los servicios interactuen entre ellas en vez de directamente en la base de datos
4. **Aseguramiento de la Consistencia de los Datos**: Garantizar que las operaciones entre microservicios sean consistentes y seguras.

## Informe de Reflexión
### Desafíos en el Diseño
1. **Identificación de Límites de Servicio**: Uno de los mayores desafíos fue definir los límites correctos para cada microservicio. ya que esto requiere de un analisis minucioso.
2. **Manejo de la Consistencia de Datos**: Al dividir la base de datos monolítica en bases de datos independientes para cada microservicio, la consistencia de los datos es difícil de mantener.
3. **Migración Gradual sin Interrumpir el Servicio**: La migración debe hacerse de manera gradual para evitar interrumpir la la funcionalidad de la aplición

### Decisiones de Migración
1. **Uso de APIs para Comunicación**: Decidimos que la comunicación entre microservicios debería ser principalmente a través de APIs, dado que esto permite comunicación de servicios de manera flexible.
2. **Descomposición de la Base de Datos**: Optamos por una migración incremental de la base de datos monolítica a bases de datos independientes para cada microservicio. Esto permite aislar problemas y reducir la complejidad de la migración.
3. **Escalabilidad y Alta Disponibilidad**: La prioridad en la arquitectura de microservicios es mejorar la escalabilidad.

