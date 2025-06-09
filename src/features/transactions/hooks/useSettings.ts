import { useEffect, useState } from "react";
import { db } from "../../../db/db";

export const useSettings = () => {
  const [limit, setLimit] = useState<number | null>(null);
  const [limitActive, setLimitActive] = useState<boolean>(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const limitValue = await db.settings.get("budgetLimit");
      const stateValue = await db.settings.get("limitState");
      setLimit(limitValue?.limit ?? null);
      setLimitActive(stateValue?.isLimitActive ?? false);
    };
    fetchSettings();
  }, []);

  return {
    limit,
    limitActive,
  };
};
