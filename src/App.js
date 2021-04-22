import React, { useState, useEffect } from 'react';
import { Cita } from './componets/Cita';
import { Form } from "./componets/Form";

function App() {

  //Citas en localStorage
  let citasInciales = JSON.parse(localStorage.getItem('citas'));
  if( !citasInciales ) {
    citasInciales = []
  }

  const [citas, setCitas] = useState(citasInciales);


  const crearCita = cita => {
      setCitas([
        ...citas,
        cita
      ])
  }

  useEffect ( () => {
    if(citasInciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas]);

  const eliminarCita = uid => {
    const nuevaCitas = citas.filter( cita => cita.uid !== uid);
    setCitas(nuevaCitas)
  }

  const titulo = citas.length === 0 ? 'No hay citas' : 'Tus citas';

  return (
    <>
      <h1>Administrador de Citas</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map( cita => (
              <Cita 
                key={cita.uid}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
