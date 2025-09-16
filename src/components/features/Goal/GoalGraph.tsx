import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import type { GoalGraphProps } from "./types/goalsGraphsInterface";

export const GoalGraph = ({ data }: GoalGraphProps) => {
  const { t } = useTranslation("goals");

  return (
    <div className="w-full h-64 sm:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
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
          <Bar
            name={`${t("current_progress")} (${data[0].currency})`}
            dataKey="currentAmount"
            fill="var(--color-income)"
            radius={[4, 4, 0, 0]}
          >
            <LabelList dataKey="currentAmount" position="top" />
          </Bar>
          <Bar
            name={t("current_goal")}
            dataKey="targetAmount"
            fill="var(--color-goalBar)"
            radius={[4, 4, 0, 0]}
          >
            <LabelList dataKey="targetAmount" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoalGraph;
