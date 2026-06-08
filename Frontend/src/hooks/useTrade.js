import { useContext } from "react";
import { TradeContext } from "../context/TradeContext";

export default function useTrade() {
  const context = useContext(TradeContext);

  if (!context) {
    throw new Error("useTrade must be used within TradeProvider");
  }

  return context;
}
