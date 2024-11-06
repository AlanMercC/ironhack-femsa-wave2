# Tasks:
# SQL Query Optimization

## 1. Provided SQL Queries for Optimization:

## Orders Query: Retrieve orders with many items and calculate the total price.

### query original 

```
SELECT Orders.OrderID, SUM(OrderDetails.Quantity * OrderDetails.UnitPrice) AS TotalPrice
FROM Orders
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
WHERE OrderDetails.Quantity > 10
GROUP BY Orders.OrderID;
```

### Analisis:

1. Eliminar el where ya que como se menciono la clase que si se puede filtrar mas datos antes del where es mucho mejor.

### Optimización: 

1. Agregar el filtro de OrderDetails.Quantity > 10 en el join para de esta manera limitar las filas que se unen y mejorar la eficiencia

2. Índices: Asegurarse que se tienen indices en las 2 tablas (Orders, OrderDetails), que en este caso serian llave primaria de Orders con llave secundaria de OrderDetails (OrderID)

```
SELECT Orders.OrderID, SUM(OrderDetails.Quantity * OrderDetails.UnitPrice) AS TotalPrice
FROM Orders
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID AND OrderDetails.Quantity > 10
GROUP BY Orders.OrderID;
```


## 2. Customer Query: Find all customers from London and sort by CustomerName.

### query original 

```
SELECT CustomerName FROM Customers WHERE City = 'London' ORDER BY CustomerName;
```

### Analisis:

1. Asegurarse de tener un indice en la columna city y por CustomerName ya que de no tener estos indices seria mas lenta la consulta

### Optimización:  

1. Crear índices en las columnas de City y CustomerName esto para poder hacer mas rapida la consulta ya que el where usa la city y el order by CustomerName:

```
CREATE INDEX idx_city_name ON Customers(City, CustomerName);
```

2. Tambien se podría optimizar creando una tabla city el cual contenga como llave primaria id_city con indice tambien en city y que en Customers tenga el id_city y se podria hacer la siguiente consulta 

```
CREATE INDEX idx_city_name ON City(city);

SELECT Customers.CustomerName FROM Customers 
JOIN City ON Customers.id_city=City.id_city and City.city = 'London'
```

---------------------------------------------------------------------------------

# 2. NoSQL Query Implementation

## 1. User Posts Query: Retrieve the most popular active posts and display their title and like count.
### query original 
```
db.posts
  .find({ status: "active" }, { title: 1, likes: 1 })
  .sort({ likes: -1 });
```

### Analisis:

1. El analisis que le veo a este problema es que debe tener indices para que la consulta sea mas rapida

### Optimización:
1. Crear 2 indices en status y likes para así optimizar la consulta, tomando en cuenta el ejemplo anterior tambien se ordena por likes y de esta forma la busqueda sera mucho mas rapida al igual que la ordenación

```
db.posts.createIndex({ status: 1, likes: -1 });
```

## 2. User Data Aggregation: Summarize the number of active users by location.

### query original 
```
db.users.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$location", totalUsers: { $sum: 1 } } },
]);
```


### Analisis:

1. El analisis que le veo es que debe tener un indice compuesto que cubra los campos de status y location

### Optimización:
1. Creación del indice compuesto status y location, Esto ayudará a que el $match sea más eficiente y reducirá el tiempo de ejecución

```
db.users.createIndex({ status: 1, location: 1 });

```

2. Tambien se podría dividir en dado caso que el numero de usuarios sea muy grande. Por ejemplo, primero hacer un $match y luego hacer un $group.