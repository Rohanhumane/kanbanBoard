import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTasks: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;
