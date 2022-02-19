import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "./transactionsAPI";

const name = "transactions";

const initialState = {
  transactions: undefined,
};

export const fetchTransactions = createAsyncThunk(
  `${name}/fetchTransactions`,
  () => {
    return getTransactions();
  }
);

const transactionsSlice = createSlice({
  name,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state, action) => {});
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {});
    builder.addCase(fetchTransactions.rejected, (state, action) => {});
  },
});

export default transactionsSlice.reducer;
