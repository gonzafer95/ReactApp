import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./Metrics.css";
//import { onLoadToDos } from "../../../../app/slices/todosSlice";


const Metrics = () => {
  const userLogged = useSelector((store) => store.userSlice.userLogged);
  const caloriasDiarias = userLogged.caloriasDiarias;

  const alimentosUsuario = useSelector((store) => store.todosSlice.toDos);
  const alimentos = useSelector((store) => store.todosSlice.alimentos);

  const [sumaTotal, setSumaTotal] = useState(0);

  const [diasRestantes, setDiasRestantes] = useState(0);


  const arrayConCalorias = alimentosUsuario.map((a) => ({
    ...a,
    porcion: "",
    caloriasPorcion: 0,
    caloriasEfectivas: 0,
  }));

  const caloriasEf = (porcion, caloriasPorcion, cantidad) => {
    if(porcion.includes("u")){
      porcion = "1";
    }else{
      porcion = "100";
    }
  
    const caloriasEfec= (cantidad*caloriasPorcion/parseInt(porcion));

    return caloriasEfec;
  };

  arrayConCalorias.forEach(a => {
    alimentos.forEach(b => {
    if(a.idAlimento === b.id){
      a.porcion = b.porcion;
      a.caloriasPorcion = b.calorias;
      a.caloriasEfectivas = caloriasEf(b.porcion, b.calorias, a.cantidad);
    }
  });
  });

  //dispatcher(onLoadAlimentosCalorias(arrayConCalorias));

  
  // const sumaTotal = arrayConCalorias.reduce((acumulado, object) => {
  //   return acumulado + object.caloriasEfectivas;
  // }, 0);

  useEffect(() => {
    const suma = arrayConCalorias.reduce((acumulado, object) => {
      return acumulado + object.caloriasEfectivas;
    }, 0);

    setSumaTotal(suma);

  }, [alimentosUsuario, arrayConCalorias]); 


  let sumaDiaria= 0;

  const hoy = new Date().getDate();

  const arr = arrayConCalorias.filter((arr) => new Date(arr.fecha).getDate()+1 === hoy);

  arr.forEach((e) => sumaDiaria += e.caloriasEfectivas);
  
  let color = "";
  if(sumaDiaria>caloriasDiarias){
    color= "danger";
  } else if(sumaDiaria>=caloriasDiarias*0.9){
    color = "warning";
  } else{
    color = "success";
  }

  const calcularDiasRestantes = () => {
    const fechaObjetivo = new Date('2024-03-31T00:00:00');
    const fechaActual = new Date();

    const diferencia = fechaObjetivo.getTime() - fechaActual.getTime();

    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

    setDiasRestantes(dias);
  };

  useEffect(() => {
    calcularDiasRestantes();
  }, []);


  return (
    <div className="container metrics">
      <h5>Métricas</h5>

      <div className="row">
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Calorías totales</h5>
              <p className="card-text">
                <span className="badge bg-secondary">{sumaTotal}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Calorías diarias</h5>
              <p className="card-text">
                <span className={`badge bg-${color}`}>{sumaDiaria}</span> 
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tiempo restante</h5>
              <p className="card-text">
                <span className={"badge bg-info"}>{diasRestantes} días</span> 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
