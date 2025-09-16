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
import { useCurrencyStore } from "../../../services/store/currencyStore";
import type { IncomeGraphProps } from "./types/analyticsDataInterface";

export const IncomeGraph = ({ data, name }: IncomeGraphProps) => {
  const incomeByDate_StackedData_CONVERTED = Object.entries(data)
    .map(([date, income]) => ({
      name: date,
      income,
    }))
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()); //Convert raw data into proper Recharts format (Need to change names of variables)

  const { selectedCurrency } = useCurrencyStore();

  const { t } = useTranslation("analytics");

  const properIncomeName = `${t("income")} (${selectedCurrency})`;

  return (
    <div className="bg-secondary text-center md:text-left text-textBase pr-8 pl-4 py-4 rounded-lg shadow">
      <h2 className="font-bold mb-4  lg:text-2xl text-xl">{name}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={incomeByDate_StackedData_CONVERTED}>
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
            className="text-base"
            name={properIncomeName}
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
