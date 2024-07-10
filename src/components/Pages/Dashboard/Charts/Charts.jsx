//import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useSelector } from "react-redux";
import Bar from "./Bar/Bar";
import Pie from "./Pie/Pie";
import { useEffect, useState } from "react";

const Charts = () => {
  const alimentosUsuario = useSelector((store) => store.todosSlice.toDos);
  const alimentos = useSelector((store) => store.todosSlice.alimentos);

  const [data, setData] = useState([]);

  useEffect(() => {
    const caloriasPorDia = {
      domingo: 0,
      lunes: 0,
      martes: 0,
      miercoles: 0,
      jueves: 0,
      viernes: 0,
      sabado: 0,
    };
    const fechaActual = new Date();

    const primerDiaSemana = new Date(fechaActual);
    primerDiaSemana.setDate(primerDiaSemana.getDate() - fechaActual.getDay());

    alimentosUsuario.forEach((alimento) => {
      const fechaAlimento = new Date(alimento.fecha);
      if (fechaAlimento >= primerDiaSemana && fechaAlimento <= fechaActual) {
        const nombreDia = obtenerNombreDia(fechaAlimento.getDay());
        caloriasPorDia[nombreDia] +=
          alimento.cantidad * obtenerCaloriasAlimento(alimento.idAlimento);
      }
    });
    setData(Object.values(caloriasPorDia));
  }, [alimentos, alimentosUsuario]);

  const obtenerNombreDia = (numeroDia) => {
    switch (numeroDia) {
      case 0:
        return "domingo";
      case 1:
        return "lunes";
      case 2:
        return "martes";
      case 3:
        return "miercoles";
      case 4:
        return "jueves";
      case 5:
        return "viernes";
      case 6:
        return "sabado";
      default:
        return "";
    }
  };

  const obtenerCaloriasAlimento = (idAlimento) => {
    const alimento = alimentos.find((item) => item.id === idAlimento);
    if (alimento?.porcion.includes("g") || alimento?.porcion.includes("m")) {
      return alimento ? alimento.calorias / 100 : 0;
    }
    return alimento ? alimento.calorias : 0;
  };

  // Preparación de los datos
  const alimentosConsumidos = {};
  alimentosUsuario.forEach((registro) => {
    const { idAlimento } = registro;
    if (alimentosConsumidos[idAlimento]) {
      alimentosConsumidos[idAlimento] += 1;
    } else {
      alimentosConsumidos[idAlimento] = 1;
    }
  });

  const data2 = {
    labels: Object.keys(alimentosConsumidos), // IDs de los alimentos
    datasets: [
      {
        label: "Cantidad de Consumo",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: Object.values(alimentosConsumidos), // Cantidad de veces consumido
      },
    ],
  };

  return (
    <div className="container metrics">
      <h5>Graficas</h5>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <Bar
                seriesData={data}
                categories={[
                  "Lunes",
                  "Martes",
                  "Miercoles",
                  "Jueves",
                  "Viernes",
                  "Sabado",
                  "Domingo",
                ]}
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <Pie series={[data2]} labels={[data2]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
