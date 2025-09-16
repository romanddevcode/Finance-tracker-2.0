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
import type { GoalGraphProps } from "../../types/goalsGraphsInterface";

export const GoalGraph = ({ data }: GoalGraphProps) => {
  const { t } = useTranslation("goals");

  return (
    <ResponsiveContainer width="100%" height={500}>
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
          name={`${t("current_progress")} (${data[0].currency})`}
          dataKey="currentAmount"
          fill="var(--color-income)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          name={t("current_goal")}
          dataKey="targetAmount"
          fill="var(--color-goalBar)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GoalGraph;
