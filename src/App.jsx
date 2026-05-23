import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TaskPage from "./pages/TaskPage";
import About from "./pages/About";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;