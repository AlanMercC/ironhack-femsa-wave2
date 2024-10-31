
Task 2: Refactorización del codigo

``` 

//declare interface
interface IPaymentProcessor {
    process(amount);
}

class StandardPaymentProcessor implements IPaymentProcessor {
    // Handles standard payment processing
    process(amount) {
        if (paymentService.process(amount)) {
            return true;
        } else {
            throw new Error("Payment failed");
        }
    }
}

class ExpressPaymentProcessor implements IPaymentProcessor {
             // Handles express payment processing
    process(amount) {
        if (expressPaymentService.process(amount, "highPriority")) {
            return true;
        } else {
            throw new Error("Express payment failed");
        }
    }
}

class InventoryManager {
    //check inventory
    verifyInventory(order) {
        if (inventory < order.quantity) {
            throw new Error("Out of stock");
        }
    }
}

class NotifyCustomer {
    notify(order) {
        // Sends an email notification to the customer
        emailService.sendEmail(order.customerEmail, "Your order has been processed.");
    }
}

class OrderProcessor {
    NotifyCustomer notifyCustomer;
    InventoryManager inventoryManager;
    IPaymentProcessor paymentProcessor;

//injection dependency
    constructor(paymentProcessor, inventoryManager, notifyCustomer) {
        this.paymentProcessor = paymentProcessor;
        this.inventoryManager = inventoryManager;
        this.notifyCustomer = notifyCustomer;
    }

    processOrder(order) {
        this.inventoryManager.verifyInventory(order);
        //chose payment type
        if (order.type == "standard") {
            this.paymentProcessor = new StandardPaymentProcessor();
        } else if (order.type == "express") {
            this.paymentProcessor = new ExpressPaymentProcessor();
        }

        this.paymentProcessor.process(order.amount);
        updateOrderStatus(order, "processed");
        this.notifyCustomer.notify(order);
    }

    updateOrderStatus(order, status) {
        // Updates the order status in the database
        database.updateOrderStatus(order.id, status);
    }
}

```

Tarea 3

SOLID Violado: SRP.
Solución: Se dividió en varias clases: InventoryManager, NotifyCustomer y IPaymentProcessor(StandardPaymentProcessor, ExpressPaymentProcessor), cada una con una única responsabilidad.
Beneficio: Mejora la mantenibilidad del codigo y facilita la creación de pruebas unitarias.
Problema: No tenia nada de responsabilidad unica y por lo tanto no se podia extender.
SOLID Violado: OCP.
Solución: Implementación de una interfaz IPaymentProcessor que permite agregar nuevos tipos de procesadores de pago sin modificar el resto del sistema.
Beneficio: Se pueden agregar nuevos métodos de pago fácilmente.
Problema: Había dependencia directa entre metodos.
SOLID Violado: LCP.
Solución: Se puede modificar el tipo de la interfaz IPaymentProcessor sin romper el resto del sistema.
Beneficio: Se pueden agregar o modificar cualquier tipo implementado de esta interfaz.
Problema: Dependencia a los dos tipos de pago.
SOLID Violado: DIP.
Solución: Se introdujeron clases específicas para manejar pagos, lo que permite cambiar la implementación sin afectar a otras partes del código.
Beneficio: Flexibilidad y facilidad para realizar modificaciones y en su caso pruebas.
Problema: Solo existia una sola clase que tenia todas los metodos.
SOLID Violado: ISP.
Solución: Se creo una interfaz específica y clases que manejan tareas individuales sin mezclar otras responsabilidades.
Beneficio: Facilita el mantenimiento del código y la gestión del mismo.
problema: no había segregación de interfaces
