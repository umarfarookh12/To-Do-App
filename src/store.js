import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("https://dummyjson.com/todos");
  const todos = response.data;
  console.log(todos);
  return todos;
});

export const slice = createSlice({
  name: "todos",
  initialState: { loading: false, todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const idx = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[idx].completed = !state.todos[idx].completed;
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
  },
});

export const store = configureStore({
  reducer: {
    todos: slice.reducer,
  },
});
