# Red Social con Publicaciones y Comentarios
Este es un proyecto llamado "Red Social" que gestiona publicaciones y comentarios de una red social utilizando **Node.js**, **Express.js** y **MongoDB** con **Mongoose**. El objetivo es permitir a los usuarios crear publicaciones, agregar comentarios a estas publicaciones, y gestionar usuarios de manera sencilla a través de una API RESTful.

## Tecnologías

- **Node.js** (Entorno para ejecutar JavaScript en el servidor.)
- **Express.js** (Framework para crear servidores web y APIs en Node.js.)
- **MongoDB** (Base de datos NoSQL que almacena datos en formato JSON.)
- **Mongoose** (Biblioteca para interactuar con MongoDB, simplificando consultas y validaciones.)
- **dotenv** (para manejar variables de entorno)

## Estructura del Proyecto

El proyecto está dividido en los siguientes componentes:

### 1. **Modelos (Mongoose Schemas)**

- **User Model**: Define la estructura de los usuarios en la base de datos. Contiene campos como `nombreUsuario` y `gmail`.
  
- **Post Model**: Define las publicaciones y sus comentarios estos estan en el mismo modelo y se usa Embedding para integrar los comentarios a la publicación. Cada publicación tiene un campo para el contenido y un array de comentarios.

## Justifiación de Elección de Embedding y Referencing

- **Embedding**: Usamos embedding para los comentarios dentro de las publicaciones porque optimiza la lectura de los datos. Al almacenar los comentarios directamente dentro de la publicación, se reduce la cantidad de consultas a la base de datos cuando se necesita obtener una publicación con sus comentarios. (Esto es más eficiente cuando los comentarios no son demasiado grandes o numerosos).

- **Referencing**: Utilizamos referencing para vincular la publicación con el usuario que la creó. Al utilizar Referencing podemos mantener la relación entre los usuarios y las publicaciones de manera eficiente. Esto permite realizar consultas de manera más sencilla para obtener, por ejemplo, el autor de una publicación.


### 2. **Controladores**

Los controladores gestionan la lógica de la aplicación para manejar las solicitudes de la API. 

- **userController.js**: Contiene las funciones para crear, obtener, actualizar y eliminar usuarios.
  
- **postController.js**: Contiene las funciones para crear, obtener, actualizar y eliminar publicaciones.
  
- **commentController.js**: Contiene las funciones para agregar, actualizar y eliminar comentarios en publicaciones.

### 3. **Rutas**

Las rutas definen los endpoints de la API. Cada controlador de funcionalidades tiene su propia ruta:

- **userRouter.js**: Define las rutas para las operaciones de los usuarios (crear, obtener, actualizar, eliminar).
  
- **postRouter.js**: Define las rutas para las operaciones de las publicaciones (crear, obtener, actualizar, eliminar).
  
- **commentsRouter.js**: Define las rutas para las operaciones de los comentarios (agregar, actualizar, eliminar).

### 4. **Servidor (server.js)**

El archivo `server.js` configura el servidor Express, conecta con MongoDB y establece las rutas de la API.

## Endpoints

### Usuarios

- `POST /api/postUser` - Crear un nuevo usuario.
- `GET /api/getUser` - Obtener todos los usuarios.
- `GETID /api/getIdUser/:id` - Obtener un usuario por ID.
- `PUT /api/putUser/:id` - Actualizar un usuario.
- `DELETE /api/deleteUser/:id` - Eliminar un usuario.

### CRUD de Usuarios 
Usamos el Get.
![CreateUser](/asset/img/User/Get%20User.png)

Verificamos si la Base de Datos esta vacia.
![CreateUser](/asset/img/User/Get%20User%20Compass.png)

Crearmos un usuario.
![CreateUser](/asset/img/User/Create%20User.png)

Creamos más usuarios.
![CreateUser](/asset/img/User/Usuarios%20Creados.png)

Buscamos un usuario por ID.
![CreateUser](/asset/img/User/Get%20User%20ID.png)

Actualizamos el nombre del usuario.
![CreateUser](/asset/img/User/Put%20User.png)

Vemos el nombre del usuario actualizado.
![CreateUser](/asset/img/User/User%20Actualizado%20Compass(put).png)

Eliminamos el usuario.
![CreateUser](/asset/img/User/Delete%20User.png)

Verificamos si se borro el usuario en la Base de Datos.
![CreateUser](/asset/img/User/Delete%20User%20Compass.png)

### Publicaciones

- `POST /api/createPost` - Crear una nueva publicación.
- `GET /api/getPost` - Obtener todas las publicaciones.
- `GET /api/getIdPost/:id` - Obtener una publicación por ID.
- `PUT /api/getIdPost/:id` - Actualizar una publicación.
- `DELETE /api/deletePost/:id` - Eliminar una publicación.

### CRUD de Publicaciones  
Usamos el Get.
![CreateUser](/asset/img/Post/Get%20%20Post.png)

Verificamos si la base de datos esta vacia.
![CreateUser](/asset/img/Post/Get%20Post%20Compass.png)

Crearmos una Publicación.
![CreateUser](/asset/img/Post/Create%20Post.png)

Verificamos si se creo la Publicación en la Base de Datos.
![CreateUser](/asset/img/Post/Get%20Post%20Creado.png)

Buscamos la publicación por ID.
![CreateUser](/asset/img/Post/Get%20Id%20Post.png)

Actualizamos la publicación.
![CreateUser](/asset/img/Post/Put%20Post.png)

Vemos si la publicación se actualizado.
![CreateUser](/asset/img/Post/Put%20Post%20Compass.png)

Eliminamos la publicación.
![CreateUser](/asset/img/Post/Delete%20Post.png)

Verificamos si se borro la publicación en la Base de Datos.
![CreateUser](/asset/img/Post/Delete%20Post%20Compass.png)

### Comentarios

- `POST /api/postComment/:id` - Agregar un comentario a una publicación.
- `PUT /api/putComment/:postId/:commentId` - Actualizar un comentario.
- `DELETE /api/deleteComment/:postId/:commentId` - Eliminar un comentario.
# Nota: Aqui no usamos un GET ya que para ver los comentarios debemos irnos a la publicación.
### CRUD de Publicaciones  
Crear un comentario en la publicacion del usuario duem04.
![CreateUser](/asset/img/Commets/Post%20Comment.png)

Verificamos si se creo el comentario en la publicación.
![CreateUser](/asset/img/Commets/Post%20Comment%20Compass.png)

Actualizamos el comentario.
![CreateUser](/asset/img/Commets/Put%20Comment.png)

Verificamos si se actualizo el comentario de la Publicación.
![CreateUser](/asset/img/Commets/Put%20Coment%20Get.png)

Eliminamos el comentario de la publicación.
![CreateUser](/asset/img/Commets/Delete%20Comments.png)

Vemos si se elimino el comentario de la publicación.
![CreateUser](/asset/img/Commets/Delete%20Comment%20confirmado.png)

Vemos si se elimino el comentario de la publicación en la Base de Datos.
![CreateUser](/asset/img/Commets/Delete%20Comment%20Compass.png)


## Manual de Instalación

Sigue estos pasos para instalar y ejecutar la API de Inventario en tu máquina local.

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión recomendada: 16+)
- **MongoDB** (local o en la nube)
- **Git** (para clonar el repositorio)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - Crea un archivo `.env` en la raíz del proyecto y agrega:
     ```env
     MONGO_URI=mongodb://localhost:27017/InventarySystem
     PORT=3005
     ```

4. **Ejecutar el servidor**
   ```bash
   npm start
   ```
   O si usas nodemon para desarrollo:
   ```bash
   npm run dev

# Autor 
*_Duilio Ortega_
*_Universidad Linda Vista_
*_Base de DatosII_
