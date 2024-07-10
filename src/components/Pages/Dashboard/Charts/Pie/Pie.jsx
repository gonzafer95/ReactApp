import ReactApexChart from "react-apexcharts";
const Pie = ({ series, labels }) => {
    const dataProcesada = series[0].datasets[0].data;
    const labelProcesado = labels[0].labels;

  const data = {
    series: dataProcesada,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: labelProcesado,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="pie"
        height={210}
      />
    </div>
  );
};

export default Pie;
