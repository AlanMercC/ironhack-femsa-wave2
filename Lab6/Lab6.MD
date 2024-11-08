# Análisis del Proceso de CI/CD con Docker
## 1. Build Stage 
1. **Code Commit**: Developers commit code to a version control system, triggering the CI pipeline.
2. **Docker Image Creation**: Dockerfiles define the environment and dependencies, and Docker builds an image which encapsulates the application and its runtime.

### Ventajas:
- **Consistencia en el Entorno**: Docker asegura que en todos entornos sea lo mismo. Así resolviendo el clásico "funciona en mi máquina", que que toddos usan el mismo contenedor.
- **Portabilidad**: Los contenedores son portables ya que se pueden usar en cualquier dispositivo y plataforma
- **Reproducibilidad**: Las imágenes Docker son inmutables, siemprese genera el mismo resultado

### Desventajas:
- **Tiempos de Construcción Largos**: Si el Dockerfile es muy complejo puede tardar tiempo en construir, como se menciono en clase deben ser las instrucciones minimas necesarias
- **Tamaño Grande de la Imagen**: Se puede generar algún problema si las imagenes crecen bastante en tamaaño  

### Mejoras:
- **Optimización del Dockerfile**: Puedes organizar el Dockerfile de manera eficiente y así reducir el tiempo de construcción por ejemplo lo que vimos en la clase con las librerias **node:alpine**.
- **Reducción del Tamaño de la Imagen**: Eliminar la cache y los archivos temporales como el ejemplo que vimos en clase

```
# Usamos una imagen base ligera de Node.js
FROM node:14-alpine
# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiamos los archivos de dependencias al contenedor
COPY package.json ./
COPY package-lock.json ./
# Instalamos las dependencias de la aplicación
RUN npm install
# Copiamos el resto del código de la aplicación
COPY . .
# Exponemos el puerto donde se ejecutará la aplicación
EXPOSE 8899
# Comando por defecto para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "start"]
```

## 2. Test Stage
**Automated Testing**: Docker images are used to spin up containers where automated tests are conducted, ensuring that the application behaves as expected in an environment identical to production.

### Ventajas:
- **Entorno para Pruebas**: En docker se usa una replica exacta de producción por lo tanto las pruebas se ejecutan de manera mas efectiva.
- **Aislamiento de las Pruebas**: Cada prueba se puede ejecutar en un contenedor aislado.
- **Facilidad de Escalado**: Docker permite ejecutar múltiples contenedores para pruebas de manera simultánea.

### Desventajas:
- **Consumo Elevado de Recursos**: Ejecutar contenedores sismultaneos puede generar mucho uso de recursos
- **Dependencias entre Contenedores**: Las  pruebas pueden depender de recursoss adicionales que pueden fallar

### Mejoras:
- **Control de la Cantidad de Contenedores**: Limitar el uso de contenedores, esto puede ayudar a la sobre carga
- **Uso de Docker Compose para Pruebas**: Docker Compose permite definir múltiples servicios necesarios para las pruebas

## 3. Deployment Stage (Etapa de Despliegue)
1. **Container Registry**: Successfully tested Docker images are tagged and pushed to a Docker registry.
2. **Orchestration and Deployment**: Tools like Kubernetes or Docker Swarm manage the deployment of these images into containers across different environments, handling scaling and load balancing.

### Ventajas:
- **Despliegue Rápido y Seguro**: Docker permite realizar despliegues consistentes, rápidos y automatizados
- **Escalabilidad Automática**: La orquestación de contenedores permite que los servicios escalen automáticamente
- **Alta Disponibilidad**: si los contenedores fallan, el kubernetes puede generar otro

### Desventajas:
- **Complejidad en la configuración de Kubernetes**: Pueden ser complejas de configurar, para equipos sin experiencia previa
- **Vulnerabilidades de Seguridad en las Imágenes Docker**: Las imágenes Docker pueden contener vulnerabilidades si no se escanean adecuadamente antes de ser desplegadas como se  menciono en la explicación del laboratorio.

### Mejoras:
- **Uso de Plataformas Gestionadas de Orquestación**: Plataformas como **Amazon EKS**, **Google GKE** o **Azure AKS** simplifican la configuración y administración de Kubernetes, reduciendo la complejidad operativa.
- **Escaneo de Seguridad de las Imágenes Docker**: Implementar escaneos automáticos de seguridad para asi descartar vulnerabilidades

### Ejemplo generico para los puntos vistos en clase build, test y deploy

```
# Definimos las etapas del pipeline: build (construcción), test (pruebas) y deploy (despliegue)
stages:
  - build
  - test
  - deploy
# Variables globales
variables:
  DOCKER_IMAGE: "miapp"       # Nombre de la imagen Docker
  DOCKER_TAG: "v1"            # Etiqueta de la imagen Docker
  DOCKER_REGISTRY: "docker.io"  # URL del registro Docker (puede ser Docker Hub, GitLab, etc.)
# Etapa de Build: Construcción de la imagen Docker
build:
  stage: build
  image: docker:latest        # Usamos la imagen oficial de Docker
  services:
    - docker:dind             # Docker-in-Docker para permitir la construcción de imágenes dentro del pipeline
  script:
    - docker build -t $DOCKER_REGISTRY/$CI_PROJECT_NAMESPACE/$DOCKER_IMAGE:$DOCKER_TAG .   # Construir la imagen Docker
    - docker push $DOCKER_REGISTRY/$CI_PROJECT_NAMESPACE/$DOCKER_IMAGE:$DOCKER_TAG    # Subir la imagen al registro
# Etapa de Test: Ejecutar pruebas en la imagen Docker
test:
  stage: test
  image: node:14               # Usamos una imagen oficial de Node.js para ejecutar las pruebas
  script:
    - npm install              # Instalar dependencias
    - npm test                 # Ejecutar pruebas
    # Aquí se puede usar cualquier otro comando para ejecutar pruebas en tu aplicación
# Etapa de Deploy: Despliegue de la aplicación
deploy:
  stage: deploy
  image: google/cloud-sdk:alpine  # Usamos la imagen de Google Cloud SDK para desplegar en Kubernetes
  script:
    - kubectl apply -f k8s/deployment.yaml  # Aplicamos la configuración del despliegue en Kubernetes
    - kubectl rollout status deployment/miapp  # Verificamos que el despliegue fue exitoso
  only:
    - main  # Solo hacer deploy si estamos en la rama principal (main)
```