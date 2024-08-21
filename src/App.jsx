import * as React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

let todoApi = fetch("https://dummyjson.com/todos").then((res) => res.json());

function App() {
  const [todos, setTodos] = useState([]);
  const [test, setTest] = useState([]);
  let exists;

  useEffect(() => {
    todoApi.then((data) => setTodos(data.todos));
  }, []);

  return (
    <Card
      sx={{
        width: 600,
        border: "0.5px solid #80cbc4",
        borderRadius: "13px",
      }}
    >
      <CardContent>
        <TextField
          label="Search for Tasks...."
          variant="standard"
          sx={{
            width: "100%",
          }}
        />

        {todos.map((value) => {
          return (
            <List>
              <ListItem
                key={value.id}
                disablePadding
                onClick={() => {
                  exists = test.findIndex((data) => {
                    return data.id === value.id;
                  });

                  if (exists === -1) {
                    setTest([
                      ...test,
                      {
                        id: value.id,
                        todo: value.todo,
                        done: true,
                      },
                    ]);
                  } else {
                    alert("already addded");
                  }
                }}
              >
                <ListItemButton dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.completed === true ? "checked" : false}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={value.id}
                    primary={
                      <span
                        style={{
                          textDecoration: value.completed ? "line-through" : "",
                        }}
                      >
                        {value.todo}
                      </span>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default App;
