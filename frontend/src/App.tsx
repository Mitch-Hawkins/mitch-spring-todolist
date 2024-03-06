import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import TasksPage from "./pages/TasksPage/TasksPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;