import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, slice } from "./store";
import { nanoid } from "@reduxjs/toolkit";

function App() {
  const [title, setTitle] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleToggle = (todo) => {
    dispatch(slice.actions.toggleTodo(todo));
  };

  const deleteTodo = (todo) => {
    dispatch(slice.actions.deleteTodo(todo));
  };

  const addTodo = (todo) => {
    dispatch(slice.actions.addNewTodo(todo));
  };

  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Card
      sx={{
        border: "0.5px solid #80cbc4",
        borderRadius: "13px",
        width: 600,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <TextField
            variant="standard"
            label="Add new Todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ width: "100%" }}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (title !== "") {
                addTodo({ id: nanoid(), todo: title, completed: false });
                setTitle("");
              }
            }}
            type="button"
            sx={{}}
          >
            Add
          </Button>
        </Stack>
        {todos.map((todo) => {
          return (
            <>
              <List disablePadding key={todo.id} sx={{ paddingY: 1.5 }}>
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
                          textDecoration: todo.completed
                            ? "line-through"
                            : null,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Button
                    color="error"
                    onClick={() => {
                      deleteTodo(todo);
                    }}
                  >
                    delete
                  </Button>
                </Stack>
              </List>
              <Divider />
            </>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default App;
