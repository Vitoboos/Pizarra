import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import styles from "./styles/Sidebar.module.css";

import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
function Sidebar() {
  const navigate = useNavigate();

  return (
    <Box className={styles.background}>
      <List className={styles.section}>
        {/* Inicio */}
        <ListItemButton
          className={styles.title}
          onClick={() => {
            navigate("/");
          }}
        >
          <ListItem disablePadding>
            <Typography variant="h5" className={styles.label}>
              {" "}
              Inicio{" "}
            </Typography>
          </ListItem>
        </ListItemButton>
        <Divider />
        {/* Proyectos */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/proyectos/nuevo");
            }}
          >
            <ListItemIcon>
              {" "}
              <AddIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Nuevo Proyecto" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/proyectos");
            }}
          >
            <ListItemIcon>
              {" "}
              <FormatListBulletedIcon />{" "}
            </ListItemIcon>

            <ListItemText primary="Ver Proyectos" />
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* Tareas */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/tareas/nuevo");
            }}
          >
            <ListItemIcon>
              {" "}
              <AddIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Nueva Tarea" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/tareas");
            }}
          >
            <ListItemIcon>
              {" "}
              <FormatListBulletedIcon />{" "}
            </ListItemIcon>

            <ListItemText primary="Ver Tareas" />
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* Acciones */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/planificacion");
            }}
          >
            <ListItemIcon>
              {" "}
              <EventIcon />{" "}
            </ListItemIcon>

            <ListItemText primary="Planificación" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/estadisticas");
            }}
          >
            <ListItemIcon>
              {" "}
              <QueryStatsIcon />{" "}
            </ListItemIcon>

            <ListItemText primary="Estadisticas" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;
