import type { Transaction } from "../types/transactionInterface";
import type { Period } from "../types/dateControl";

const filterByPeriod = (tx: Transaction, period: Period, now = new Date()) => {
  const txDate = new Date(tx.date);

  if (period === "week") {
    const startOfWeek = new Date(now);

    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return txDate >= startOfWeek && txDate < endOfWeek;
  } else if (period === "month") {
    return (
      txDate.getMonth() === now.getMonth() &&
      txDate.getFullYear() === now.getFullYear()
    );
  } else if (period === "year") {
    return txDate.getFullYear() === now.getFullYear();
  }
  return true;
};

export default filterByPeriod;
