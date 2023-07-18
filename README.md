¿Qué sucedio al usar async y await?
Rta: Al utilizar async y await, indicamos que una función es asíncrona y podemos utilizar await para pausar la ejecución y esperar a que se resuelvan las promesas.

¿Qué sucedio al usar el método then()?
Rta: El método then() se utiliza para encadenar operaciones después de que una promesa se resuelva, lo que permite especificar una función de callback que se ejecutará cuando la promesa se resuelva exitosamente

¿Qué diferencias encontraste entre async, await y el método then()?
Rta: 

 * async y await proporcionan una sintaxis más limpia y legible para manejar operaciones asíncronas, mientras que el método then() es más adecuado para encadenar múltiples operaciones y controlar el flujo de ejecución.

 * async/await simplifica el manejo de errores utilizando bloques try...catch, mientras que con el método then() se utilizan las funciones catch() para capturar y manejar errores.

 * async/await es más adecuado para escribir código más secuencial y lineal, mientras que el método then() ofrece más flexibilidad para manejar múltiples promesas en paralelo y realizar acciones adicionales en cada paso