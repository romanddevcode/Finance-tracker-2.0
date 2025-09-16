import BalancePanel from "./BalancePanel";
import ExpensePanel from "./ExpensePanel";
import IncomePanel from "./IncomePanel";

export const BalanceList: React.FC = () => {
  return (
    <div>
      <div className="flex md:grid md:grid-cols-3 md:gap-4 gap-4 mb-3">
        <BalancePanel />
        <IncomePanel />
        <ExpensePanel />
      </div>
    </div>
  );
};

export default BalanceList;
