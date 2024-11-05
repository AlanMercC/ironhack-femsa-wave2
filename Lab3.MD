# Scenario 1: User Authentication Tests

```
TEST UserAuthentication
  ASSERT_TRUE(authenticate("validUser", "validPass"), "Should succeed with correct credentials")
  ASSERT_FALSE(authenticate("validUser", "wrongPass"), "Should fail with wrong credentials")
END TEST
```


## Problemas Identificados:

Falta de separación: ambas pruebas están en un solo caso, lo que puede complicar el diagnóstico si una falla.
Los mensajes de aserción pueden ser mejorados para mayor claridad.


## Respuesta

Se separa en 3 casos 1 valido y 2 invalidos y se agregan titulos mas descriptivos

```
TEST UserAuthentication_ValidCredentials
    ASSERT_TRUE(authenticate("validUser", "validPass"), "Should succeed with correct credentials") 
END TEST

TEST UserAuthentication_InvalidCredentials
    ASSERT_FALSE(authenticate("validUser", "wrongPass"), "Should fail with wrong credentials") 
END TEST

TEST UserAuthentication_UserNotExist
    ASSERT_FALSE(authenticate("validUser", "Pass"), "user not found") 
END TEST
```



# Scenario 2: Data Processing Functions
```
TEST DataProcessing
  DATA data = fetchData()
  TRY
    processData(data)
    ASSERT_TRUE(data.processedSuccessfully, "Data should be processed successfully")
  CATCH error
    ASSERT_EQUALS("Data processing error", error.message, "Should handle processing errors")
  END TRY
END TEST
```


## problemas identificados:

Mezcla de pruebas de flujo normal y de manejo de excepciones en un solo caso.
La captura de errores dentro de la prueba puede dificultar la claridad del resultado.


## Respuesta

se separa en 2 test Success y ErrorHandling en los cuales primero se procesa la información y despues se eliminan los datos y se agregan titulos mas descriptivos

```
TEST DataProcessing_Success 
  DATA data = fetchData() 
  processData(data)    
  ASSERT_TRUE(data.processedSuccessfully, "Data should be processed successfully")
  cleanData(data)
END TEST

TEST DataProcessing_ErrorHandling 
  DATA data = fetchData() 
  TRY 
    processData(data) 
  CATCH error 
    ASSERT_EQUALS("Data processing error", error.message, "Should handle processing errors")
  END TRY
  cleanData(data)
END TEST
```

# Scenario 3: UI Responsiveness

```
TEST UIResponsiveness
  UI_COMPONENT uiComponent = setupUIComponent(1024)
  ASSERT_TRUE(uiComponent.adjustsToScreenSize(1024), "UI should adjust to width of 1024 pixels")
END TEST
```

## Problemas Identificados:

El nombre del test podría ser más descriptivo.
No hay pruebas de otros tamaños o configuraciones de pantalla.


## Respuesta 

se hacen 2 pruebas con diferentes resoluciones y se agregan titulos mas descriptivos

```
TEST UIResponsiveness_Width1024 
  UI_COMPONENT uiComponent = setupUIComponent(1024) 
  ASSERT_TRUE(uiComponent.adjustsToScreenSize(1024), "UI should adjust to width of 1024 pixels")
END TEST

TEST UIResponsiveness_Width768 
  UI_COMPONENT uiComponent = setupUIComponent(768) 
  ASSERT_TRUE(uiComponent.adjustsToScreenSize(768), "UI should adjust to width of 768 pixels")
END TEST
```

# Si se ejecuta con yarn test correra con archivos de ejemplo para este lab 3

Nombre de los archivos auth.js, dataProcessor.js, uiComponent.js

```
yarn test
```


