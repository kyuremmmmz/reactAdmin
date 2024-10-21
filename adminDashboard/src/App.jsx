import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { NavigationProvider } from "./components/panels/NavigationContext";
import "./App.css";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <NavigationProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home/*"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </NavigationProvider>
  );
}

export default App;
