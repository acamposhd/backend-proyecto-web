//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); 
//Listeners
cargarEventListeners();

function cargarEventListeners(){
     //Distapara cuando se presiona "Agregar al carrito"
     cursos.addEventListener('click', comprarCurso);

     //Cuando se elimina un curso del carrito 
     carrito.addEventListener('click', eliminarCurso);

     //Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

     //Al cargar el documento, mostrar LS
     document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//Functions

//agregar al carrito
function comprarCurso(e){
e.preventDefault();
//console.log(e.target.classList);
     //Delegacion para agregar al carrito
     if(e.target.classList.contains('agregar-carrito')){
          const curso = e.target.parentElement.parentElement;
          //Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
          
     }

}

//lee los datos del curso 
function leerDatosCurso(curso){
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span ').textContent,
          id: curso.querySelector('a').getAttribute('data-id')
     }
     insertarCarrito(infoCurso);

}
//Muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
     const row = document.createElement('tr');
     row.innerHTML = `
          <td> 
               <img src="${curso.imagen}" width=100>
          </td>
          <td>${curso.titulo}</td>
          <td>${curso.precio}</td>
          <td>
               <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
          </td>
     `;
     listaCursos.appendChild(row);
     guardarCursoLocalStorage(curso);
}

//Elimina el curso del carrito
function eliminarCurso(e){
     e.preventDefault();
     let curso,
          cursoId;
     if(e.target.classList.contains('borrar-curso')){
          e.target.parentElement.parentElement.remove();
          curso = e.target.parentElement.parentElement;
          cursoId = curso.querySelector('a').getAttribute('data-id');  
     }
     eliminarCursoLocalStorage(cursoId);
}

//Elima los cursos del carrito en el DOM
function vaciarCarrito(){

     //forma lenta
     //listaCursos.innerHTML = '';

     //forma rapida recomendada
     while(listaCursos.firstChild){
          listaCursos.removeChild(listaCursos.firstChild);
     }

     //Vaciar LS
     vaciarLocalStorage();

     return false;
}

//Almacenar cursos en local Storage
function guardarCursoLocalStorage(curso){

     let cursos;
          //Toma el valor de un arreglo con datos del LS o vacio
          cursos = obtenerCursosLocalStorage();

          //El curso seleccionado se agrega al arreglo
          cursos.push(curso);

          localStorage.setItem('cursos', JSON.stringify(cursos));

}

//Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage(){
     let cursosLS;

     //Comprobamos si hay algo en Local Storage 
     if(localStorage.getItem('cursos') === null){
          cursosLS = [];
     }else{
          cursosLS = JSON.parse(localStorage.getItem('cursos'));
     }
     return cursosLS;
}

//Imprime los cursos de LS en el carrito
function leerLocalStorage(){
     let cursosLS;

     //Toma el valor de un arreglo con datos del LS o vacio
     cursosLS = obtenerCursosLocalStorage();

          cursosLS.forEach(function(curso){
               //Construir template
               const row = document.createElement('tr');
               row.innerHTML = `
               <td> 
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          listaCursos.appendChild(row);
          });
}

//Eliminar el curso por id id en el LS
function eliminarCursoLocalStorage(curso) {
     let cursosLS;
     // Obtenemos el arreglo de cursos
     cursosLS = obtenerCursosLocalStorage();
     // Iteramos comparando el ID del curso borrado con los del LS
     cursosLS.forEach(function(cursoLS, index) {
         if(cursoLS.id === curso) {
             cursosLS.splice(index, 1);
         }
     });
     // Añadimos el arreglo actual a storage
     localStorage.setItem('cursos', JSON.stringify(cursosLS) );
 }

//Elimina Todos los cursos de LS
function vaciarLocalStorage(){
     localStorage.clear();
}

//Fernanda 