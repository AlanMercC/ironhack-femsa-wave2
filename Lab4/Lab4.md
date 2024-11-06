
---
# Scenario 1: Pseudo-Code for Authentication System
## Pseudo-Code Example:

```
FUNCTION authenticateUser(username, password):
  QUERY database WITH username AND password
  IF found RETURN True
  ELSE RETURN False
  ```

## Explicación del código:
Este código una función de autentificación, donde se verifica si un nombre de usuario y una contraseña coinciden con los registros de la base de datos. pero, presenta 2 vulnerabilidades que logre identificar:
1. Contraseñas en texto claro: el codigo no menciona si en la base de datos se estan guardando las contraseñas en texto plano o estan cifradas en dado caso que esten en texto plano si el atacante logra entrar a la base tendría todas las contraseñas.
2. Inyección SQL: Si el código usa consultas directas sin preparar, podría ser vulnerable a inyecciones SQL, permitiendo a un atacante manipular la base de datos.

## Mitigaciones sugeridas:
1. Almacenamiento seguro de contraseñas: Almacenar las contraseñas cifradas con algun algoritmo seguro y robusto
2. Preparación de consultas: Usar consultas preparadas para que de esta forma podamos prevenir ataques de inyección SQL.

## ejemplo de pseudocodigo corregido

```
FUNCTION authenticateUser(username, password):
    // Prevenir inyección SQL usando consultas preparadas
    QUERY database WITH preparedStatement("SELECT * FROM users WHERE username = ? AND password = ?", username, password)
    IF resultFound:
        RETURN True
    ELSE:
        RETURN False
```

---
# Scenario 2: JWT Authentication Schema
## Pseudo-Code Example:

```
DEFINE FUNCTION generateJWT(userCredentials):
  IF validateCredentials(userCredentials):
    SET tokenExpiration = currentTime + 3600 // Token expires in one hour
    RETURN encrypt(userCredentials + tokenExpiration, secretKey)
  ELSE:
    RETURN error
```

## Explicación del código:
Este códigogenera un token JWT si las credenciales son las correctas. pero presenta algunas preocupaciones de seguridad:

1. Almacenamiento de la clave secreta: La clave secreta para firmar el JWT debería estar bien protegida y no se debe tener al alcance del atacante en este pseudocodigo no se muestra donde esta almacenado
2. Encriptación de JWT: Aunque el código menciona encrypt, es importante destacar que JWT no se "encripta", sino que se firma digitalmente para asegurar su integridad y autenticidad. Es preferible usar un algoritmo de firma como HMAC con SHA-256 o RSA.
3. Gestión de la expiración del token: Aunque se define la expiración, no se menciona el proceso de verificación de la expiración en el servidor cuando el token se recibe.

## Mitigaciones sugeridas:
1. Firma del JWT: Usar una clave robusta para firmar el token y guardar la contraseña en un lugar seguro como almacenadores de variables de entorno o de contraseñas
2. Verificación de expiración: El proceso de verificación de que el token no este vencido
3. Protección contra la falsificación: Asegúrate de usar un algoritmo de firma adecuado para evitar la falsificación de tokens.

## Ejemplo de pseudocodigo corregido

```
DEFINE FUNCTION generateJWT(userCredentials):
    IF validateCredentials(userCredentials):
        // Generación de un tiempo de expiración para el token
        SET tokenExpiration = currentTime + 3600 // Expira en 1 hora
        // Crear un JWT firmado y cifrado de manera segura
        SET jwtPayload = {
            userCredentials,
            expiration: tokenExpiration
        }
        // Firmar el JWT con una clave secreta protegida (NO hardcodeada)
        SET signedToken = signJWT(jwtPayload, secretKey)  // secretKey debe estar protegida y no hardcodeada
        RETURN signedToken
    ELSE:
        RETURN error
// Función para firmar el JWT
DEFINE FUNCTION signJWT(payload, secretKey):
    // Cifrar y firmar el JWT de manera segura
    RETURN HMAC_SHA256(payload, secretKey)  // Ejemplo de cómo podría hacerse, dependiendo de la librería de cifrado usada
```

---
# Scenario 3: Secure Data Communication Plan
## Outline for Data Protection:

```
PLAN secureDataCommunication:
  IMPLEMENT SSL/TLS for all data in transit
  USE encrypted storage solutions for data at rest
  ENSURE all data exchanges comply with HTTPS protocols
```

## Explicación del código:
Este plan establece una estrategia de protección de datos mediantee SSL/TLS para asegurar la comunicación en tránsito y cifrado para los datos en reposo. Presento algunos datos a tener en cuenta para el pseudocodigo:
1. SSL/TLS para comunicación en tránsito: El uso de peticiones con SSL ya que esta es la versión obsoleta de TLS
2. Cifrado de datos en reposo.
3. Cumplimiento con HTTPS: Es importante asegurarse del cumplimiento del uso del HTTPS.

## Mitigaciones sugeridas:
1. Cifrado de datos en tránsito: Usar las versiones de protocolos TLS 1.2 o 1.3 y quitar versiones obsoletas.
2. Protección de claves y certificados: Protege las claves privadas de los certificados SSL/TLS y usa mecanismos de rotación de claves.
3. Cifrado de datos en reposo: Usar algoritmos de cifrado de alto nivel . Los sistemas de bases de datos y almacenamiento deben estar configurados para proteger los datos incluso si la infraestructura es comprometida.

## Ejemplo de seguridad corregido

```
PLAN secureDataCommunication:
// Asegurar que toda la comunicación entre el cliente y el servidor use SSL/TLS (HTTPS)
IMPLEMENT SSL/TLS for all data in transit (ENFORCE HTTPS)
// Asegurar que los datos almacenados en la base de datos estén cifrados en reposo
USE encrypted storage solutions for sensitive data at rest
    // Usar AES o algoritmos de cifrado fuertes para proteger datos almacenados
    ENCRYPT userCredentials USING AES-256
// Asegurar que las conexiones siempre usen HTTPS para todas las interacciones
ENSURE all data exchanges comply with HTTPS protocols
    // Realizar validaciones regulares para asegurar que HTTPS está habilitado
    CONFIGURE server to only allow HTTPS connections
```