# Test Backend Público

Vank es una fintech que opera en varios paises del mundo y se ha especializado en el estudio de facturas y documentos financieros.

Uno de sus clientes requiere una conexión dedicada aparte de los datos de Vank, por lo que han optado por disponer de una API REST.  El equipo de Vank ha visto en esto una oportunidad para ofrecer esta API como una nueva línea de negocios, por lo que eventualmente el servicio será ofrecido a varios de sus clientes.

Usted como parte del área de ingeniería, le han encomendado la tarea de diseñar y desarrollar la API para que esté disponible para todos los clientes de Vank.
La versión MVP del servicio deberá cumplir los siguientes requisitos:

1. Vank internamente tendrá disponible un endpoint para registrar nuevos clientes en el servicio. Los datos que recibe este endpoint son: Nombre de la compañía,código interno, ID tributario, moneda en la que opera (USD,EUR o CLP), quota mensual de llamadas a la API y un conjunto registros de bancos a los que tiene acceso (representados como un arreglo de enteros). En caso de éxito o fracaso, el endpoint debe enviar como respuesta un elemento con solo un atributo "message".

2. Por requerimiento del área Legal de Vank, el nuevo servicio no puede acceder a los datos ofrecidos en real time, por lo que han disponibilizado un archivo CSV accesible via HTTPS con los datos de días anteriores. Diseñar e implementar una estrategia para almacenar y actualizar los datos.

Algunas consideraciones:
    - El nuevo sistema debe actualizar los datos una vez al día.
    - La URL del archivo CSV es [https://gist.github.com/rogelio-meza-t/f70a484ec20b8ea43c67f95a58597c29](https://gist.github.com/rogelio-meza-t/f70a484ec20b8ea43c67f95a58597c29)

3. Vank disponibiliza sus clientes un endpoint para retornar invoices con los siguientes filtros opcionales: vendor e invoice_date (rango de fechas abierto). El endpoint debe retornar los valores de invoiceId, vendorId, invoiceNumber,invoiceTotal, paymentTotal, creditTotal y bankId. Los atributos que representan un valor monetario deben ser devueltos en la moneda que opera el cliente. Además, el endpoint permite recibir como parámetro en que moneda se necesita la salida. Para efectos de conversión, Vank usa el siguiente servicio [https://free.currencyconverterapi.com/](https://free.currencyconverterapi.com/)

4. Vank disponibiliza un endpoint a sus clientes para que puedan editar sus datos: ID tributario y moneda en la que opera

5. Agregar en el proyecto archivos necesarios para correr la aplición completa en un container (podman, docker, etc), los comandos necesarios para task específicas y/o las recetas necesarias para levantar la infraestructura o todo lo que no sea considerado como parte del desarrollo.

6. Una vez que el MVP ha terminado, el desarrollo del servicio parará a manos de otro quipo, por lo cual en un archivo README debe incluir toda la documentación necesaria para hacer uso de los endpoints y entender el diseño y arquitectura del servicio.

- Requerimientos:
    - Usar NodeJS + framework a elección
    - Usar Git como VCS
- Bonus:
    - Usar typescript
    - Hacer test unitarios
    - Implementar estrategia de cache
    - Implementar un motor de búsqueda avanzado
    - Desplegar la app en un PaaS
    - Ejemplos de uso (colección postman, archivo con curls, etc)