const API_URL ='http://localhost:3000/api/equipos'; //URL de la API

async function obtenertodos() {
    const res = await fetch(API_URL);  //Realiza la solicitud Get a la API, fetch es una funcion que permite hacer solicitude HTTP

    const equipos = await res.json();
    return equipos;
}

async function crearequipo(data) {
    const res = await fetch(API_URL,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json' //Especifica que el cuerpo de la solicitud es JSON
        },
        body: JSON.stringify(data) //Convierte el objeto data a una cadena JSON
    });
    return await res.json();
};

async function actualizarequipo(id,data){
    const res = await fetch(`${API_URL}/${id}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await res.json();
};

async function eliminarequipo(id) { //Funcion para eliminar equipo (DELETE)
    const res = await fetch(`${API_URL}/${id}`,{
        method: 'DELETE'
    });
    return await res.json();
}

//Referencias al DOM

const contenedorcards = document.getElementById('contendorcards'); // Obtiene el contenedor donde se mostrarán los cards de equipo

const templatecard = document.getElementById('templatecard');//Obtiene el template del card de equipo
const datoform = document.getElementById('datoform'); //Obtiene el formulario para crear/editar equipo
const nombre = document.getElementById('nombre'); // Obtiene el campo de entrada para el nombre del equipo
const id_equipo = document.getElementById('id_equipo'); // Obtiene el campo oculto para el ID del equipo
const btncancelar = document.getElementById('btn-cancelar') //Obtiene el botón de cancelar 


//Mostar equipos al cargar la pagina en el template
async function mostrarequipos(){
    contenedorcards.innerHTML = ''; //Limpia el contenedor antes de mostrar los equipos, el innerHTML es una propiedad que establece o devuelve el conteido HTML de un elemento.

    const equipos = await obtenertodos();
    equipos.forEach(equipo =>{
        const clone = templatecard.content.cloneNode(true);

        clone.querySelector('.nombreequipo').textContent = equipo.nombre_equipo;

        clone.querySelector('.btn-editar').onclick = () => cargarequipoparaeditar(equipo);

        clone.querySelector('.btn-eliminar').onclick = () => eliminarequipohandler(equipo.id_equipo);
        contenedorcards.appendChild(clone)
    })
}

//Guardar o actualizar equipos

datoform.onsubmit = async(e) =>{ //Este evento se ejecuta cuando se envia el formulario, ya sea para crear o actualizar un equipo
    e.preventDefault();//Proviene del comportamiento por defecto del formulario, que es recargar la página

    const data = {nombre_equipo: nombre.value}; //Se crea un objeto data con el nombre del equipo
    if(id_equipo.value){
        await actualizarequipo(id_equipo.value, data); //Se llama a la funcion actualizarequipo con el id del equipo y los datos del formulario
    }else{
        await crearequipo(data) //Si el campo id_equipo esta vacio, significa que se esta creando un nuevo equipo, se llama a la funcion crearequipo con los datos del formulario
    }
    datoform.reset(); //Se resetea el formulario para limpiar los campos
    id_equipo.value = '';
    await mostrarequipos(); //Se vuelve a mostrar la lista de equipos actualizada
    alert('Equipo guardado correctamente');
};

//Botón cancelar 
btncancelar.onclick = () => {
    datoform.reset();
    id_equipo.value = '';
};

//Cargar equipo para editar
function cargarequipoparaeditar(equipo){
    id_equipo.value = equipo.id_equipo; //Asigna el id del equipo al campo oculto id_equipo
    nombre.value = equipo.nombre_equipo; //Asigna el nombre del equipo al campo de entrada nombre
}

//Eliminar equipo
async function eliminarequipohandler(id){
    if(confirm('Estas seguro de eliminar ese equipo?')){
        await eliminarequipo(id); //Llama la funcion eliminarequipo con el id del equipo a eliminar.
        await mostrarequipos(); ///Vuelve a mostrar la lista de equipos actualizada despues de eliminar
    }
};

mostrarequipos(); // Llama la funcion mostrarequipos al cargar la página para mostrar los equipos existentes