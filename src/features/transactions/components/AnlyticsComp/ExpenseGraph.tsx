import { useTranslation } from "react-i18next";
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

interface ExpenseGraphProps {
  data: any[];
  name: string;
  categories: string[];
}

export const ExpenseGraph = ({ data, name, categories }: ExpenseGraphProps) => {
  console.log("ExpenseGraph data : ", data);
  console.log("ExpenseGraph categories: ", categories);

  const { t } = useTranslation("analytics");

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
          {categories.map((category, i) => (
            <Bar
              key={category}
              name={t(`categories.${category}`)}
              dataKey={category}
              fill={`hsl(${(i * 50) % 360}, 70%, 60%)`}
              stackId="category"
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseGraph;
