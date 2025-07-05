import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IncomeGraphProps {
  data: { name: string; income: number }[];
  name: string;
}

export const IncomeGraph = ({ data, name }: IncomeGraphProps) => {
  console.log("IncomeGraph data: ", data);
  return (
    <div className="bg-secondary text-textBase p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">{name}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="var(--color-textBase)" />
          <YAxis stroke="var(--color-textBase)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-bgBase)",
              border: "none",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "var(--color-textBase)" }}
          />
          <Legend />
          <Bar
            name="Дохід"
            dataKey="income"
            fill="var(--color-income)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeGraph;
