<div align="center">
    <h1>Bookworm</h1>
    <h4>Welcome to your organized reading life</h4>
    <img width = 500px, src=Bookworm.jpg/>
</div>

## Descripcion
---------------------------------------
Bookworm será una aplicación móvil que funcionará para establecer y darle seguimiento a una meta de lectura anual establecida por el usuario; contará con un dashboard fácil de interpretar que permitirá el análisis del hábito lector. En esta, los usuarios podrán almacenar una biblioteca que se pueda dividir en géneros literarios y tres clases: por leer, leyendo y leído. Además de esto, la aplicación le recordará a los usuarios leer frecuentemente para que la meta establecida sea cumplida.

## Objetivo
---------------------------------------
Crear una herramienta tecnológica que permita a un usuario establecer una meta de lectura anual y, que con esta, pueda hacer un seguimiento de su cumplimiento.


## Gama de Colores 
---------------------------------------
Se tomará como base la gama de colores llamada "gruvbox" ya que fue desarrollada con el fin de evitar la fatiga visual y creemos que esto beneficiará al usuario final. El proyecto se encuentra en el GitHub del autor[^1], la paleta que utilizaremos es la siguiente:
![Palette Dark](http://i.imgur.com/wa666xg.png)

## Funcionalidades y elementos a utilizar
---------------------------------------
### Página principal
#### Funcionalidades a implementar:
- [ ] Barra de búsqueda
- [ ] Mostrar las páginas restantes para completar la meta diaria del usuario
- [ ] Despliegue de todos los libros que se están leyendo actualmente
    - Portada del libro
    - Título
    - Autor
    - Progreso (por páginas)
    - Botón para actualizar progreso
- [ ] Al presionar un libro Go to > «Libro leyendo» 
#### Elementos a utilizar:
- Image 
- Text
- Button
- Text Input
- Cards
- Progress bar

### Libro en biblioteca
#### Funcionalidades a implementar:
- [ ] Visualizar los datos del libro: 
    - Portada del libro
    - Título
    - Autor
    - Dropdown con los estatus (leyendo, por leer, leído)
    - Progreso (por páginas)
    - Sinópsis
    - Número de páginas
    - ISBN
    - Año de la edición
- [ ] Si se el estatus del libro es «Leyendo» 
    - «Reanudar lectura» para que comience el timer
        - Al presionarlo el timer comienza a correr y se activan dos botones (pausar y detener lectura)
- [ ] Botón para eliminar de la biblioteca
#### Elementos a utilizar:
- Image 
- Text
- Button
- Cards
- Progress bar
- Dropdown

### Libro buscado
#### Funcionalidades a implementar:
- [ ] Visualizar los datos del libro: 
    - Portada del libro
    - Título
    - Autor
    - Dropdown con los estatus (leyendo, por leer, leído)
    - Progreso (por páginas)
    - Sinópsis
    - Número de páginas
    - ISBN
    - Año de la edición
- [ ] Botón para añadir a la biblioteca
#### Elementos a utilizar:
- View 
- Image 
- Text
- Button

### Actualizar progreso
#### Funcionalidades a implementar:
- [ ] Ingresar la página en la que el usuario se quedó
    - On page _ of 478
- [ ] Mostrar el tiempo leído
#### Elementos a utilizar:
- Image
- Text
- Text input 

### Perfil/Settings
#### Funcionalidades a implementar:
- [ ] Crear/actualizar meta diaria (por páginas)
#### Elementos a utilizar:
- Text
- Text Input 
- Button(Create/Update)

### Biblioteca
#### Funcionalidades a implementar:
- [ ] Se pueden encontrar todos los libros que se han leído organizados en un estante de libros
- [ ] Para poder visualizar los libros de una manera más específica, se podrán filtrar por estados
- [ ] Al darle click a un libro, se podrá hacer lo siguiente:
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
- [ ] Generar un filtro que discrimine la información por los siguientes atributos:
    - Día: Minutos y páginas leídas en el día de la consulta
    - Últimos 7 días: Minutos, páginas y libros leídos (si es aplicable) en los pasados 7 días de la consulta
    - Mes: Minutos, páginas y libros leídos (si es aplicable) en el mes de la consulta
    - Año: Minutos, páginas y libros leídos (si es aplicable) en el año de la consulta
- [ ] Mostrar un mapa de calor que represente el hábito lector mensual
    - Al darle click a un día te muestra lo que se leyó en ese día
- [ ] Generar un log del libro que muestre los libros con mayor y menor número de páginas
- [ ] Generar un log muestre el dia o mes con el mayor y menor número de páginas o tiempo de lectura.
#### Elementos a utilizar:
- Dropdown
- Statistic graphs


## Referencias
---------------------------------------
[^1]:Gruvbox - [https://github.com/morhetz/gruvbox/](https://github.com/morhetz/gruvbox/)
[^2]: React Docs - [https://reactjs.org/docs/](https://reactjs.org/docs/)
