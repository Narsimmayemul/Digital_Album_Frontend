import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import UserPage from "./UserPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path="/admin" />
        <Route path="/:id" element={<UserPage />} />
        {/* Add other routes here, like your album page */}
        <Route path="/" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
