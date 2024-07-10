import ReactApexChart from "react-apexcharts";

const Bar = ({ seriesData, categories }) => {
  const data = {
    series: [{ data: seriesData }],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
      },
    },
  };
  return (
    <div>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        height={210}
      />
    </div>
  );
};

Bar.defaultProps = {
  seriesData: [],
  categories: [],
};

export default Bar;
