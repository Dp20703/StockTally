import api from "./apiClient";

// GET watchlist/get
// - fetch all watchlists for the current user
export const getWatchlists = async () => {
  const res = await api.get("/watchlist/get");
  return res.data;
};

// POST watchlist/create
// - create a new watchlist with provided payload
export const createWatchlist = async (payload) => {
  const res = await api.post("/watchlist/create", payload);

  return res.data;
};

// PUT watchlist/update/:id
// - update an existing watchlist by id
export const updateWatchlist = async (id, payload) => {
  const res = await api.put(`/watchlist/update/${id}`, payload);

  return res.data;
};

// DELETE watchlist/delete/:id
// - remove a watchlist by id
export const deleteWatchlist = async (id) => {
  const res = await api.delete(`/watchlist/delete/${id}`);

  return res.data;
};

// POST watchlist/add
// - add stocks to a watchlist using payload
export const addStocks = async (payload) => {
  const res = await api.post("/watchlist/add", payload);

  return res.data;
};

// DELETE watchlist/:watchlistId/delete/stock/:stockId
// - remove a stock from watchlist
export const deleteStock = async (watchlistId, stockId) => {
  const res = await api.delete(
    `/watchlist/${watchlistId}/delete/stock/${stockId}`,
  );

  return res.data;
};
