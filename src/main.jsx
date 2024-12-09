import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import NewProject from "./Components/Projects/NewProject/NewProject.jsx";
import ViewProjects from "./Components/Projects/ViewProjects/ViewProjects.jsx";
import Project from "./Components/Projects/Project/Project.jsx";
import NewTask from "./Components/Tasks/NewTask/NewTask.jsx";
import ViewTasks from "./Components/Tasks/ViewTasks/ViewTasks.jsx";
import Task from "./Components/Tasks/Task/Task.jsx";
import Calendar from "./Components/Calendar/Calendar.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      {/* Proyectos */}
      <Route path="/proyectos/nuevo" element={<NewProject />} />
      <Route path="/proyectos" element={<ViewProjects />} />
      <Route path="/proyectos/:id" element={<Project />} />
      {/* Tareas */}
      <Route path="/tareas/nuevo" element={<NewTask />} />
      <Route path="/tareas" element={<ViewTasks />} />
      <Route path="/tareas/:id" element={<Task />} />
      {/* Herramientas */}
      <Route path="/planificacion" element={<Calendar />} />
    </Routes>
  </Router>
);
