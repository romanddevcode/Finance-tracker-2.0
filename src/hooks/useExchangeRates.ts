import { useQuery } from "@tanstack/react-query";
import currencyAPI from "../services/api/currencyApi";

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: async () => {
      const res = await currencyAPI.get("/latest.json?", {
        params: {
          base: "USD",
        },
      });

      return res.data.rates as Record<string, number>;
    },

    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
