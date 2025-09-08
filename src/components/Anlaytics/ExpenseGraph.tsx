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
import { useCurrencyStore } from "../../store/currencyStore";
import type { ExpenseGraphProps } from "../../types/analyticsDataInterface";

export const ExpenseGraph = ({ data, name, categories }: ExpenseGraphProps) => {
  const { t } = useTranslation("analytics");

  const expenseByDate_StackedData_CONVERTED = Object.entries(data)
    .map(([date, expense]) => ({
      name: date,
      ...expense,
    }))
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()); //Convert raw data into proper Recharts format (Need to change names of variables)

  const { selectedCurrency } = useCurrencyStore();

  return (
    <div className="bg-secondary text-textBase p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">{name}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={expenseByDate_StackedData_CONVERTED}>
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
              name={`${t(`categories.${category}`)} (${selectedCurrency})`}
              dataKey={category}
              fill={`hsl(${(i * 50) % 360}, 70%, 60%)`}
              stackId="category"
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseGraph;
