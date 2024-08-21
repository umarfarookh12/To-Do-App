import { useEffect, useState } from "react";
import "./App.css";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {
  Box,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

let todoApi = fetch("https://dummyjson.com/todos").then((res) => res.json());

function App() {
  const [todos, setTodos] = useState([]);
  const [test, setTest] = useState([]);
  const [checked, setChecked] = React.useState([0]);
  console.log(test);

  useEffect(() => {
    todoApi.then((data) => setTodos(data.todos));
  }, []);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setChecked(newChecked);
  // };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      spacing={1}
    >
      <Card
        sx={{
          width: 600,
          height: "auto",
          border: "1px solid #80cbc4",
          borderRadius: "13px",
        }}
      >
        <CardContent>
          <div sx={{ padding: "2px" }}>
            <Box sx={{ flexGrow: 1, padding: "2px" }}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <TextField
                    id="outlined-basic"
                    label="Tasks to be done.."
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    sx={{ marginTop: "3px" }}
                    size="large"
                    color="warning"
                    variant="contained"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ margin: "10px" }} />
          </div>
          <div>
            <List
              sx={{
                width: "100%",
              }}
            >
              {todos.map((value) => {
                // const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments">
                        <CommentIcon />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      // role={undefined}
                      // onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          // checked={checked.indexOf(value) !== -1}
                          // tabIndex={-1}
                          // disableRipple
                          // inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        // id={labelId}
                        primary={`${value.todo}`}
                        onClick={() => {
                          const exists = test.findIndex((data) => {
                            return data.id === value.id;
                          });
                          console.log(exists);
                          if (exists === -1) {
                            setTest([
                              ...test,
                              { id: value.id, todo: value.todo },
                            ]);
                          }
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </CardContent>
      </Card>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        {test.map((clicked) => (
          <Box
            key={clicked.userId}
            component="section"
            sx={{
              p: 2,
              width: 600,
              height: "auto",
              borderRadius: "13px",
              margin: "1px",
              border: "0.5px dashed grey",
            }}
          >
            {clicked.todo}
          </Box>
        ))}
      </Stack>
      {/* <List
        sx={{
          width: "100%",
        }}
      >
        {todos.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value.id}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${value.todo}`}
                  onClick={() => setTest([...test, value.todo])}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List> */}
    </Stack>
  );
}

export default App;
