import { useContext } from "react";
import { TradeContext } from "../context/TradeContext";

export default function useTrades() {
  const context = useContext(TradeContext);

  if (!context) {
    throw new Error("useTrades must be used within TradeProvider");
  }

  return context;
}
