import React from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
const Home = () => <h1>Home Page </h1>
const About = () => <h1>About</h1>
const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;