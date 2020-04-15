import { Component, OnInit } from "@angular/core";

const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.getElementById("lista-carrito");
console.log(listaCursos);
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  constructor() {

  }

  ngOnInit(): void {
    //this.cargarEventListeners();
  }

  //Listeners

  // cargarEventListeners(){
  //      //Distapara cuando se presiona "Agregar al carrito"
  //      cursos.addEventListener('click', this.comprarCurso);

  //      //Cuando se elimina un curso del carrito
  //      carrito.addEventListener('click', this.eliminarCurso);

  //      //Vaciar el carrito
  //      vaciarCarritoBtn.addEventListener('click', this.vaciarCarrito);

  //      //Al cargar el documento, mostrar LS
  //      document.addEventListener('DOMContentLoaded', this.leerLocalStorage);
  // }

  //s

  //agregar al carrito
  comprarCurso(e) {
    e.preventDefault();
    //console.log(e.target.classList);
    //Delegacion para agregar al carrito
    if (e.target.classList.contains("agregar-carrito")) {
      const curso = e.target.parentElement.parentElement;
      //Enviamos el curso seleccionado para tomar sus datos
      this.leerDatosCurso(curso);
    }
  }

  //lee los datos del curso
  leerDatosCurso(curso) {
    const infoCurso = {
      imagen: curso.querySelector("img").src,
      titulo: curso.querySelector("h4").textContent,
      precio: curso.querySelector(".precio span ").textContent,
      id: curso.querySelector("a").getAttribute("data-id")
    };

    this.insertarCarrito(infoCurso);
  }
  //Muestra el curso seleccionado en el carrito
  insertarCarrito(curso) {
    const row = document.createElement("tr");
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
    document.getElementById("lista-carrito").appendChild(row);
     //listaCursos.append(row);
    this.guardarCursoLocalStorage(curso);
  }

  //Elimina el curso del carrito
  eliminarCurso(e) {
    e.preventDefault();
    let curso, cursoId;
    if (e.target.classList.contains("borrar-curso")) {
      e.target.parentElement.parentElement.remove();
      curso = e.target.parentElement.parentElement;
      cursoId = curso.querySelector("a").getAttribute("data-id");
    }
    this.eliminarCursoLocalStorage(cursoId);
  }

  //Elima los cursos del carrito en el DOM
  vaciarCarrito() {
    //forma lenta
    //listaCursos.innerHTML = '';

    //forma rapida recomendada
    while (listaCursos.firstChild) {
      listaCursos.removeChild(listaCursos.firstChild);
    }

    //Vaciar LS
    this.vaciarLocalStorage();

    return false;
  }

  //Almacenar cursos en local Storage
  guardarCursoLocalStorage(curso) {
    let cursos;
    //Toma el valor de un arreglo con datos del LS o vacio
    cursos = this.obtenerCursosLocalStorage();

    //El curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem("cursos", JSON.stringify(cursos));
  }

  //Comprueba que haya elementos en Local Storage
  obtenerCursosLocalStorage() {
    let cursosLS;

    //Comprobamos si hay algo en Local Storage
    if (localStorage.getItem("cursos") === null) {
      cursosLS = [];
    } else {
      cursosLS = JSON.parse(localStorage.getItem("cursos"));
    }
    return cursosLS;
  }

  //Imprime los cursos de LS en el carrito
  leerLocalStorage() {
    let cursosLS;

    //Toma el valor de un arreglo con datos del LS o vacio
    cursosLS = this.obtenerCursosLocalStorage();

    cursosLS.forEach(curso => {
      //Construir template
      const row = document.createElement("tr");
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
  eliminarCursoLocalStorage(curso) {
    let cursosLS;
    // Obtenemos el arreglo de cursos
    cursosLS = this.obtenerCursosLocalStorage();
    // Iteramos comparando el ID del curso borrado con los del LS
    cursosLS.forEach((cursoLS, index) => {
      if (cursoLS.id === curso) {
        cursosLS.splice(index, 1);
      }
    });
    // Añadimos el arreglo actual a storage
    localStorage.setItem("cursos", JSON.stringify(cursosLS));
  }

  //Elimina Todos los cursos de LS
  vaciarLocalStorage() {
    localStorage.clear();
  }

  //Fernanda
}
