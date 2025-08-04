const API_URL = "https://localhost:3000/api/equipos";

//Metodos CRUD
async function obtenerEquipo() {
  const res = await fetch(API_URL);
  const equipos = await res.json();
  return equipos;
}

async function crearEquipo(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}

async function actualizarEquipo(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}

async function eliminarEquipo(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

//Referencias a los elementos del DOM

const contenedorCards = document.getElementById("contenedorCards");
const templateCard = document.getElementById("templateCard");
const datoForm = document.getElementById("datoform");
const nombre = document.getElementById("nombre");
const btnCancelar = document.getElementById("btnCancelar");

//Mosrar equipos al cargar la pagina en el template

async function mostrarEquipo() {
  contenedorCards.innerHTML = "";
  const equipos = await obtenerEquipo();
  equipos.forEach((equipo) => {
    const clone = templateCard.contentEditable.cloneNode(true);
    clone.querySelector(".nombreEquipos").textContent = equipo.nombre_equipo;
    clone.querySelector(".btn-editar").onclick = () =>
      cargarEquipoParaEditar(equipo);
    clone.querySelector(".btn-eliminar").onclick = () =>
      eliminarEquipoHandler(equipo.id_equipo);
  });
}

//Guardar o Actualizar Equipos
datoForm.onsubmit = async (e) => {
  e.preventDefault();
  const data = { nombre_equipo: nombre.value };
  if (id_equipo.value) {
    await actualizarEquipo(id_equipo.value, data);
  } else {
    await mostrarEquipo(data);
  }
  datoForm.reset();
  id_equipo.value = "";
  await mostrarEquipo();
};

//Cancelar edición

btnCancelar.onclick = () => {
  datoForm.reset();
  id_equipo.value = "";
};

//Cargar equipo para editar
function cargarEquipoParaEditar(equipo) {
  id_equipo.value = equipo.id_equipo;
  nombre.value = equipo.nombre_equipo;
}

//Eliminar equipo
async function eliminarEquipoHandler(id) {
  if (confirm("¿Estas seguro de eliminar este equipo?")) {
    await eliminarEquipo(id);
  }
}
mostrarEquipo();
