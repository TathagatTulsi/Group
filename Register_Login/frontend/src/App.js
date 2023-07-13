import { BrowserRouter, Routes, Route } from "react-router-dom";
// import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Login from "./components/Login";
// import Navbar from "./components/Navbar";
import Register from "./components/Register";
// import Fun from "./components/Function"

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<Login />}> </Route>
        
        <Route path="/register" element={<Register />}> </Route>

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* <Route index element={<Fun />} /> */}
          {/* <Route path="about" element={<About />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;