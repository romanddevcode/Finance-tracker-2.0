import { useQuery } from "@tanstack/react-query";
import currencyAPI from "../services/api/currenctApi";

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: async () => {
      const res = await currencyAPI.get("/latest.json?", {
        params: {
          base: "USD",
        },
      });
      console.log("Full response from server:", res.data);
      return res.data.rates as Record<string, number>;
    },
    staleTime: 1000 * 60 * 60,
  });
};
