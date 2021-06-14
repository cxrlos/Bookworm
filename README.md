<div align="center">
    <h1>
     <img width = 500px, src=Bookworm.jpg />
    </h1>
    <h4>Welcome to your organized reading life</h4>
</div>

## Descripcion
---------------------------------------
Bookworm será una aplicación móvil que funcionará para establecer y darle seguimiento a una meta de lectura anual establecida por el usuario; contará con un dashboard fácil de interpretar que permitirá el análisis del hábito lector. En esta, los usuarios podrán almacenar una biblioteca que se pueda dividir en géneros literarios y tres clases: por leer, leyendo y leído. Además de esto, la aplicación le recordará a los usuarios leer frecuentemente para que la meta establecida sea cumplida.

## Objetivo
---------------------------------------
Crear una herramienta tecnológica que permita a un usuario establecer una meta de lectura anual y, que con esta, pueda hacer un seguimiento de su cumplimiento.


## Gama de Colores 
---------------------------------------
Se tomará como base la gama de colores llamada "gruvbox" ya que fue desarrollada con el fin de evitar la fatiga visual y creemos que esto beneficiará al usuario final. El proyecto se encuentra en el GitHub del autor, la paleta que utilizaremos es la siguiente:
![Palette Dark](http://i.imgur.com/wa666xg.png)

## Funcionalidades y elementos a utilizar
---------------------------------------
### Página principal
#### Funcionalidades a implementar:
- [X] Barra de búsqueda
- [X] Mostrar las páginas restantes para completar la meta diaria del usuario
- [X] Despliegue de todos los libros que se están leyendo actualmente
    - Portada del libro
    - Título
    - Autor
    - Progreso (por páginas)
    - Botón para actualizar progreso
- [X] Al presionar un libro Go to > «Libro leyendo» 
#### Elementos a utilizar:
- Image 
- Text
- Button
- Text Input
- Cards
- Progress bar

### Libro en biblioteca
#### Funcionalidades a implementar:
- [X] Visualizar los datos del libro: 
    - Portada del libro
    - Título
    - Autor
    - Dropdown con los estatus (leyendo, por leer, leído)
    - Progreso (por páginas)
    - Sinópsis
    - Número de páginas
    - ISBN
    - Año de la edición
- [X] Si se el estatus del libro es «Leyendo» 
    - «Reanudar lectura» para que comience el timer
        - Al presionarlo el timer comienza a correr y se activan dos botones (pausar y detener lectura)
- [X] Botón para eliminar de la biblioteca
#### Elementos a utilizar:
- Image 
- Text
- Button
- Cards
- Progress bar
- Dropdown

### Libro buscado
#### Funcionalidades a implementar:
- [X] Visualizar los datos del libro: 
    - Portada del libro
    - Título
    - Autor
    - Dropdown con los estatus (leyendo, por leer, leído)
    - Progreso (por páginas)
    - Sinópsis
    - Número de páginas
    - ISBN
    - Año de la edición
- [X] Botón para añadir a la biblioteca
#### Elementos a utilizar:
- View 
- Image 
- Text
- Button

### Actualizar progreso
#### Funcionalidades a implementar:
- [X] Ingresar la página en la que el usuario se quedó
    - On page _ of 478
- [X] Mostrar el tiempo leído
#### Elementos a utilizar:
- Image
- Text
- Text input 

### Perfil/Settings
#### Funcionalidades a implementar:
- [X] Crear/actualizar meta diaria (por páginas)
#### Elementos a utilizar:
- Text
- Text Input 
- Button(Create/Update)

### Biblioteca
#### Funcionalidades a implementar:
- [X] Se pueden encontrar todos los libros que se han leído organizados en un estante de libros
- [X] Para poder visualizar los libros de una manera más específica, se podrán filtrar por estados
- [X] Al darle click a un libro, se podrá hacer lo siguiente:
    - Si se está leyendo: Go to > Página del libro leyendo
    - Si se quiere leer: + botón para eliminar de la biblioteca
    - Si ya se leyó: + botón para eliminar de la biblioteca y fechas leídas
#### Elementos a utilizar:
- Barra de búsqueda
- Drop down menu con filtros de búsqueda
- 3 botones (Go to, eliminar de la biblioteca, eliminar de la biblioteca y fechas leídas)
- Dependiendo del estado del libro, se va a mostrar solo un botón

### Estadísticas
#### Funcionalidades a implementar:
- [X] Generar un filtro que discrimine la información por los siguientes atributos:
    - Día: Minutos y páginas leídas en el día de la consulta
    - Últimos 7 días: Minutos, páginas y libros leídos (si es aplicable) en los pasados 7 días de la consulta
    - Mes: Minutos, páginas y libros leídos (si es aplicable) en el mes de la consulta
    - Año: Minutos, páginas y libros leídos (si es aplicable) en el año de la consulta
- [X] Mostrar un mapa de calor que represente el hábito lector mensual
    - Al darle click a un día te muestra lo que se leyó en ese día
- [X] Generar un log del libro que muestre los libros con mayor y menor número de páginas
- [X] Generar un log muestre el dia o mes con el mayor y menor número de páginas o tiempo de lectura.
#### Elementos a utilizar:
- Dropdown
- Statistic graphs

## Roadmap

A continuación se encuentra la división del trabajo por etapas y la leyenda para ver de manera sencilla la asignación de las tareas.

⚫ Carlos García | 🟠  Daniela Vignau | 🟣 Héctor Reyes | 🟡 Jesus González | 🟤 Sergio Hernández

- Layout general de las pantallas
    - [X] Sidebar del menú. 🟣
    - [X] Barra de navegación inferior. 🟠
- Desarrollo del contenido principal de las pantallas
  - [X] Log-in / Registro
    - [X] Desarrollo de la distribución de elementos en pantalla. 🟠
    - [X] Creación de formularios y botones para el ingreso de la información. 🟣
  - [X] Configuraciones
    - [X] Desarrollo de la distribución de elementos en pantalla. 🟣
    - [X] Creación de formularios y botones de funcionalidad. 🟠
  - [X] Biblioteca
    - [X] Desarrollo del componente unitario del libro. 🟣
    - [X] Inclusión de filtro para diferenciar libros por el criterio definido por el  usuario. 🟠
    - [X] Implementar barra de búsqueda. 🟠
    - [X] Crear el layout del menú para mostrar todos los libros del usuario. 🟣
  - [X] Home
    - [X] Desarrollo del layout general incorporando los componentes desarrollados anteriormente (la barra de búsqueda y componente unitario de libro). 🟠
    - [X] Creación de barra de progreso para identificar avance en los libros que el usuario esta leyendo.  🟣
  - [X] Vista del libro
    - [X] Desarrollo de la distribución de elementos en pantalla. 🟣
    - [X] Creación de menú dropdown para modificar el estatus del libro (leyendo, por leer, terminado). 🟠
    - [X] Desarrollo de la lógica en frontend del cronometro de lectura. 🟣
    - [X] Desarrollo de la lógica en frontend de los botones y paginas leídas . 🟠
  - [X]  Estadísticas
    - [X] Desarrollo de la distribución de elementos en pantalla. 🟠
    - [X] Creación del filtro basado en unidades temporales. 🟣
- Funcionalidades lógicas
    - [X] Base de datos
        - [X] Desarrollo de arquitectura de las bases de datos
            - [X] Base de datos para los usuarios. 🟡 🟤 ⚫
        - [X] APIs
            - [X] Operaciones CRUD para la base de datos de Google Books
                - [X] GET 🟡
            - [X] Operaciones CRUD para la base de datos de usuarios
                - [X] POST 🟤
                - [X] DELETE ⚫
                - [X] GET 🟤
                - [X] UPDATE ⚫
                - [X] PUT 🟡
    - [X] Desarrollo de funcionalidades lógicas de la aplicación
        - [X] Lógica para la obtención de datos desde los botones y barras de progreso. 🟤
        - [X] Transmisión de datos a los componentes que requieran información de las APIs. 🟡 ⚫



## Referencias
---------------------------------------
Gruvbox - [https://github.com/morhetz/gruvbox/](https://github.com/morhetz/gruvbox/)
<br/>
React Docs - [https://reactjs.org/docs/](https://reactjs.org/docs/)
