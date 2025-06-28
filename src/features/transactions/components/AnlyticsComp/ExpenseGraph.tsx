import type { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";

type ExpenseGraphProps = {
  data: ChartData<"bar", number[], string>;
};

export const ExpenseGraph = ({ data }: ExpenseGraphProps) => {
  return (
    <div className="bg-secondary text-textBase p-4 rounded-lg shadow w-full max-w-full">
      <h2 className="text-lg font-semibold mb-4">
        Витрати по датам та категоріям
      </h2>
      <div className="w-full sm:min-w-0">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  font: {
                    size: 12,
                  },
                },
              },
            },
            scales: {
              x: {
                stacked: true,
                ticks: {
                  font: {
                    size: 11,
                  },
                },
              },
              y: {
                stacked: true,
                ticks: {
                  font: {
                    size: 11,
                  },
                },
              },
            },
          }}
          height={300}
        />
      </div>
    </div>
  );
};

export default ExpenseGraph;
