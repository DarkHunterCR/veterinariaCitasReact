import React, { useState } from 'react';
import { v4 as uuid} from 'uuid';

export const Form = ({ crearCita }) => {

    //Crear State de citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    // Actualizar citas de los input´s
    const actualizarCitas = (e) => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    }


    // Manejo de espacios vacios en el form
    const [error, setError] = useState(false);

    const { mascota, propietario, fecha, hora, sintomas } = cita

    const submitCita = e => {
        e.preventDefault();

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === ''  || sintomas.trim() === ''){
            setError(true);
            return; 
        }

        setError( false );

        // Crear un id
        cita.uid = uuid();


        // Crear cita
        crearCita( cita );

        // Reiniciar Form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <>
           <h2>Crear Cita</h2> 

           { error? <p className="alerta-error">Todos los espacios son obligatorios</p> : null}

           <form
            onSubmit={submitCita}
           >
               <label>Nombre Mascota</label>
               <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder= "Nombre Mascota"
                    onChange={actualizarCitas}
                    value={mascota}
               />

               <label>Propietario</label>
               <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder= "Nombre del Propietario"
                    onChange={actualizarCitas}
                    value={propietario}
               />

               <label>Fecha</label>
               <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarCitas}
                    value={fecha}
               />

               <label>Hora</label>
               <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarCitas}
                    value={hora}
               />

               <label>Sintomas</label>
               <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarCitas}
                    value={sintomas}
               />

               <button 
                type="submit"
                className="u-full-width button-primary"
               >
                   Agregar Cita
                </button>
           </form>
        </>
    )
}
