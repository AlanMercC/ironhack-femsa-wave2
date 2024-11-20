# Designing Cloud Infrastructure
## Componentes a utilizar:
1. EC2: ya que se proporcionan instancias que nos permite ejecutar la logica de la aplicación.
Tipo de instancia: Se puede alegir cualquiera de las siguientes 3 intancia dependiendo del rendimiento, por ejemplo, instancias tipo t3.micro para desarrollo y t3.medium o t3.large para producción.
Escalabilidad: se puede utilizar el auto scaling para las instancias.
2. S3: Para almacenar objetos, ejemplo imágenes, archivos de usuario y backups.
Uso: Guardar archivos estáticos y medios generados por los usuarios, asegurando alta disponibilidad y durabilidad.
3. VPC: para aislar la infraestructura de la aplicación.
Subredes: Crear subredes públicas y privadas:
Subred pública: Para los balanceadores de carga (ELB) y acceso a internet.
Subred privada: Para las instancias EC2 que no necesitan acceso directo desde internet como pudiera ser una base de datos.
Internet Gateway: Para permitir la comunicación entre instancias de las redes.
NAT Gateway:hacer que la subred privada acceda a internet de forma segura.
4. ELB: Para distribuir el tráfico entrante entre las instancias EC2 de manera eficiente, asegurando alta disponibilidad.

# IAM Configuration
## Roles y Políticas:
1. Desarrolladores:
Permisos: Acceso restringido a los recursos necesarios para el desarrollo, como acceso a las instancias EC2, S3 (solo lectura), y logs en CloudWatch.
Política recomendada: AmazonEC2ReadOnlyAccess, AmazonS3ReadOnlyAccess, CloudWatchLogsReadOnlyAccess.
2. Administradores:
Permisos: Acceso total a todos los recursos, incluyendo la capacidad de gestionar EC2, VPC, IAM, y servicios de almacenamiento.
Política recomendada: AdministratorAccess.
3. Instancias de Aplicación:
Permisos: Acceso limitado a servicios específicos como S3 para cargar o recuperar archivos y bases de datos (aurora o DynamoDB), con permisos de solo lectura o escritura según sea necesario.
Política recomendada: Crear una política personalizada que permita acceso solo a los buckets de S3 requeridos y a las bases de datos específicas.
Principio de menor privilegio:
Crear políticas de IAM que otorguen solo los permisos mínimos necesarios para cada tipo de usuario o componente.
Las instancias EC2, deben tener un rol IAM que solo permita el acceso a los recursos que necesita para la ejecución de la aplicación.

# Resource Management Strategy
1. Auto Scaling:
Configurar grupos de Auto Scaling para ajustar automáticamente el número de instancias EC2 en función de la demanda. por posibles aumento de trafico
Política de escalado: Basada en métricas de CPU, memoria y tráfico de red para agregar o eliminar instancias automáticamente.
2. Balanceo de Carga (ELB):
Configurar un Application Load Balancer para distribuir el tráfico HTTP/HTTPS entre las instancias EC2.
Asegurar que el Application Load Balancer esté detrás de una VPC, para que solo se acceda a las instancias privadas a través de él.
3. Optimización de Costos (AWS Budgets):
AWS Budgets: Configurar presupuestos para monitorear el gasto de los recursos y evitar costos innecesarios.
Reservar instancias: Considerar el uso de instancias reservadas o planificar un modelo de "pago por uso" con instancias spot para reducir los costos en escenarios de alta disponibilidad como se vio en clase.
4. Monitoreo y Logs:
Configurar CloudWatch para monitorear el rendimiento de las instancias y servicios.
CloudWatch Logs: Usar para almacenar los logs de la aplicación y facilitar el análisis y diagnóstico de posibles problemas.


# Theoretical Implementation
Arquitectura:
VPC: La infraestructura de red está aislada en una VPC, con subredes públicas y privadas para separar los servicios accesibles desde internet y los recursos internos.
EC2: Instancias EC2 en subredes privadas, que ejecutan la aplicación web y se comunican con la base de datos.
S3: Usado para almacenar archivos estáticos como imágenes, videos, y documentos.
ELB: Un ALB que distribuye el tráfico web hacia las instancias EC2.
IAM: Roles IAM para los usuarios y servicios, implementando el principio de menor privilegio.
Auto Scaling: Se utiliza para ajustar automáticamente el número de instancias EC2 en función de la carga.
Flujo de datos:
Los usuarios acceden a la aplicación a través del ALB, que distribuye el tráfico a las instancias EC2 que ejecutan la aplicación.
Las instancias EC2 acceden a S3 para almacenar y recuperar archivos, y a la base de datos (RDS o DynamoDB) para almacenar datos persistentes.
Los desarrolladores y administradores gestionan la infraestructura utilizando permisos IAM específicos, asegurando que solo tengan acceso a los recursos que necesitan.


# Discussion and Evaluation
1. Elección de Servicios:
Los servicios como EC2, S3, y VPC son fundamentales para construir aplicaciones web escalables y seguras. EC2 permite ejecutar la lógica de la aplicación, S3 proporciona un almacenamiento duradero y económico, y VPC permite aislar y controlar el tráfico entre los servicios.
2. Políticas IAM:
El diseño de políticas IAM basado en el principio de menor privilegio asegura que cada usuario o servicio tenga solo los permisos necesarios para realizar su tarea, minimizando el riesgo de accesos no autorizados.
3. Estrategia de Gestión de Recursos:
La combinación de Auto Scaling y ELB garantiza que la aplicación pueda manejar cargas variables de manera eficiente, mientras que AWS Budgets ayuda a mantener los costos bajo control. La optimización de costos se logra utilizando instancias spot, Auto Scaling y la reserva de instancias cuando sea posible.
Con esta infraestructura, la aplicación es escalable, resiliente, y optimizada tanto en términos de rendimiento como de costos.
4. un ejemplo de implementación se encuentra la imagen dentro de la misma carpeta de este lab