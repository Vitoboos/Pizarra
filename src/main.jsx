import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Projects from "./Components/Projects/NewProject/Projects.jsx";
import ViewProjects from "./Components/Projects/ViewProjects/ViewProjects.jsx";
import NewTask from "./Components/Tasks/NewTask/NewTask.jsx";
import ViewTasks from "./Components/Tasks/ViewTasks/ViewTasks.jsx";
import Calendar from "./Components/Calendar/Calendar.jsx";
import Stats from "./Components/Stats/Stats.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* Proyectos */}
        <Route path="/proyectos/nuevo" element={<Projects />} />
        <Route path="/proyectos" element={<ViewProjects />} />
        {/* Tareas */}
        <Route path="/tareas/nuevo" element={<NewTask />} />
        <Route path="/tareas" element={<ViewTasks />} />
        {/* Herramientas */}
        <Route path="/planificacion" element={<Calendar />} />
        <Route path="/estadisticas" element={<Stats />} />
      </Routes>
    </Router>
  </StrictMode>
);
