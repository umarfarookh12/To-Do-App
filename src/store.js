import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("https://dummyjson.com/todos");
  const todos = response.data;
  return todos;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (id) => {
  const response = await axios.post(`https://dummyjson.com/todos/${id}`);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await axios.get(`https://dummyjson.com/todos/${id}`);
  return response.data;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (id) => {
  const response = await axios.get(`https://dummyjson.com/todos/${id}`);
  return response.data;
});

export const slice = createSlice({
  name: "todos",
  initialState: { loading: false, todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload.todos;
      state.loading = false;
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      state.loading = false;
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const idx = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[idx].completed = !state.todos[idx].completed;
    });
  },
});

export const store = configureStore({
  reducer: slice.reducer,
});
