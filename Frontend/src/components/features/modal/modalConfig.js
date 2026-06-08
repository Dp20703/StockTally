import CreateTrade from "../trade/CreateTrade";
import UpdateTrade from "../trade/UpdateTrade";
import CloseTrade from "../trade/CloseTrade";
import AddPosition from "../trade/AddPosition";
import UpdateProfileForm from "../profile/UpdateProfileForm";
import CreateWatchlistForm from "../watchlist/CreateWatchlistForm";
import AddStockForm from "../stock/AddStockForm";
import UpdateWatchlist from "../watchlist/UpdateWatchlist";

export const modalConfig = {
  // Trades
  createTrade: {
    title: "Create Trade",
    component: CreateTrade,
    size: "lg",
  },

  updateTrade: {
    title: "Update Trade",
    component: UpdateTrade,
    size: "lg",
  },

  closeTrade: {
    title: "Close Trade",
    component: CloseTrade,
    size: "lg",
  },

  addPosition: {
    title: "Add Position",
    component: AddPosition,
    size: "lg",
  },

  // watchlist

  createWatchlist: {
    title: "Create Watchlist",
    component: CreateWatchlistForm,
    size: "lg",
  },

  updateWatchlist: {
    title: "Update Watchlist",
    component: UpdateWatchlist,
    size: "lg",
  },

  addStocks: {
    title: "Add Stocks",
    component: AddStockForm,
    size: "lg",
  },

  // profile
  updateProfile: {
    title: "Update Profile",
    component: UpdateProfileForm,
    size: "lg",
  },
};
