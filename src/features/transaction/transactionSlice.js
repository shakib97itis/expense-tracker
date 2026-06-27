import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  createTransaction,
  deleteTransaction,
  fetchTransactions,
  updateTransaction,
} from './transactionApi';

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: '',
  editing: {},
};

export const fetchTransactionsThunk = createAsyncThunk(
  'transaction/fetchTransactions',
  async () => {
    const transactions = await fetchTransactions();
    return transactions;
  },
);

export const createTransactionThunk = createAsyncThunk(
  'transaction/createTransaction',
  async (data) => {
    const transaction = await createTransaction(data);
    return transaction;
  },
);

export const updateTransactionThunk = createAsyncThunk(
  'transaction/updateTransaction',
  async ({id, data}) => {
    await updateTransaction(id, data);
    return id;
  },
);

export const deleteTransactionThunk = createAsyncThunk(
  'transaction/deleteTransaction',
  async (id, {rejectWithValue}) => {
    try {
      await deleteTransaction(id);
      return id;
    } catch (error) {
      const message = error.message || 'Something went wrong';
      return rejectWithValue(message);
    }
  },
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addEditing: (state, action) => {
      state.editing = action.payload;
    },
    removeEditing: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    // Fetch transactions
    builder
      .addCase(fetchTransactionsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.transactions = [];
        state.error = action.error?.message;
      });

    // create transaction
    builder
      .addCase(createTransactionThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTransactionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransactionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });

    // Update transaction
    builder
      .addCase(updateTransactionThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateTransactionThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id,
        );

        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(updateTransactionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });

    // Delete transaction
    builder
      .addCase(deleteTransactionThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteTransactionThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        const index = state.transactions.findIndex(
          (t) => t.id === action.payload,
        );

        if (index !== -1) {
          state.transactions.splice(index, 1);
        }
      })
      .addCase(deleteTransactionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default transactionSlice.reducer;
export const {addEditing, removeEditing} = transactionSlice.actions;
