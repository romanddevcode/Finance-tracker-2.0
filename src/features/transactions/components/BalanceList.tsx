import BalancePanel from "./GeneralComponents/BalancePanel";
import ExpensePanel from "./GeneralComponents/ExpensePanel";
import IncomePanel from "./GeneralComponents/IncomePanel";

export const BalanceList: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <BalancePanel />
        <IncomePanel />
        <ExpensePanel />
      </div>
    </div>
  );
};

export default BalanceList;
