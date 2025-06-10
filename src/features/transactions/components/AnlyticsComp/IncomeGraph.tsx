import type { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";

type IncomeGraphProps = {
  data: ChartData<"bar", number[], string>;
  name: string;
};

export const IncomeGraph = ({ data, name }: IncomeGraphProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full max-w-full ">
      <h2 className="text-lg font-semibold mb-4">{name}</h2>
      <div className="w-full sm:min-w-0">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 12, // Меньше шрифт на мобилках
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 11,
                  },
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 11,
                  },
                },
              },
            },
          }}
          height={300} // Высота вручную — удобнее на мобилках
        />
      </div>
    </div>
  );
};

export default IncomeGraph;
