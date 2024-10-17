# Pre entrega Proyecto-ProgBackend II
Programación Backend II

Crear un modelo User
    - first_name:String
    - last_name: String
    - fecha_nacimiento
    - password:String(Hash)
    - cartId: ref Carts
    - role: [default:user]

Encriptar contraseña con bcrypt usando metodo "hashSync"

Desarrollar estrategias Passport para que funcione con este modelo de usuarios

Implementar un sistema de login que trabaje con jwt

Desarrollar una estrategia "current" (endpoint) para extraer cookie que contiene el token y con ese token obtener el usuario asociado.
En caso de tener token, devolver el usuario asociado.
En caso de no tener devolver un error de passport 
Utilizar un extractor de cookie

Agregar al router "/api/sessions" la ruta "/current"
La cual validara al usuario logueado y devolvera en una respuesta sus datos asociados al JWT

Usar PASSPORT CON JWT

npm i bcrypt 
npm i passport-jwt

++++++++++++++++++++++++++++++++++++++++
http://localhost:8080/register funciona
http://localhost:8080/login funciona

Pero al loguearse e ir a http://localhost:8080/api/sessions/current sale el problema con 

{"error":"No auth token"}

