import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import TasksPage from "./pages/TasksPage/TasksPage";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TasksPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
