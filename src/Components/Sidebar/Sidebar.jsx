import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
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
import HomeIcon from "@mui/icons-material/Home";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import TaskIcon from "@mui/icons-material/Task";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import styles from "./styles/Sidebar.module.css";

import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
function Sidebar() {
  const navigate = useNavigate();

  const [projectIsOpen, setProjectIsOpen] = useState(true);
  const [tasksIsOpen, setTasksIsOpen] = useState(true);
  const [reportsIsOpen, setReportsIsOpen] = useState(true);

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
            <ListItemIcon>
              <HomeIcon style={{color: "white"}} />
            </ListItemIcon>

            <ListItemText primary="Inicio"/> 
          </ListItem>
        </ListItemButton>
        <Divider />
        {/* Proyectos */}

        <ListItemButton onClick={() => setProjectIsOpen(!projectIsOpen)}>
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>

          <ListItemText primary="Proyectos" />
          {projectIsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={projectIsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/proyectos/nuevo");
                }}
                sx={{ pl: 4 }}
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
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  {" "}
                  <FormatListBulletedIcon />{" "}
                </ListItemIcon>

                <ListItemText primary="Ver Proyectos" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <Divider />
        {/* Tareas */}

        <ListItemButton onClick={() => setTasksIsOpen(!tasksIsOpen)}>
          <ListItemIcon>
            <TaskIcon />
          </ListItemIcon>

          <ListItemText primary="Tareas" />
          {tasksIsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={tasksIsOpen} timeout="auto" unmountOnExit>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/tareas/nuevo");
              }}
              sx={{ pl: 4 }}
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
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                {" "}
                <FormatListBulletedIcon />{" "}
              </ListItemIcon>

              <ListItemText primary="Ver Tareas" />
            </ListItemButton>
          </ListItem>
        </Collapse>

        <Divider />
        {/* Reportes */}

        <ListItemButton onClick={() => setReportsIsOpen(!reportsIsOpen)}>
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>

          <ListItemText primary="Reportes" />
          {reportsIsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={reportsIsOpen} timeout="auto" unmountOnExit>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/planificacion");
              }}
              sx={{ pl: 4 }}
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
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                {" "}
                <QueryStatsIcon />{" "}
              </ListItemIcon>

              <ListItemText primary="Estadisticas" />
            </ListItemButton>
          </ListItem>
        </Collapse>
      </List>
    </Box>
  );
}

export default Sidebar;
