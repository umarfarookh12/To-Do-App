import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, slice } from "./store";

let todoApi = fetch("https://dummyjson.com/todos").then((res) => res.json());

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleToggle = (todo) => {
    dispatch(slice.actions.toggleTodo(todo));
  };

  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Card
      sx={{
        border: "0.5px solid #80cbc4",
        borderRadius: "13px",
      }}
    >
      <CardContent>
        {todos.map((todo) => {
          return (
            <List disablePadding key={todo.id}>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={1}
              >
                <ListItem
                  key={todo.id}
                  disablePadding
                  onClick={() => {
                    handleToggle(todo);
                  }}
                >
                  <ListItemButton dense>
                    <Checkbox edge="start" checked={todo.completed} />
                    <ListItemText
                      id={todo.id}
                      primary={<span>{todo.todo}</span>}
                      sx={{
                        textDecoration: todo.completed ? "line-through" : null,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <Button color="warning" onClick={() => {}}>
                  Delete
                </Button>
              </Stack>
            </List>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default App;
