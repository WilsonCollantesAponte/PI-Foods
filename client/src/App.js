import "./App.css";

import { Routes, Route } from "react-router-dom";
// import Home from "./components/Home/Home";
import Cards from "./components/Cards/Cards";
import Form from "./components/Form/Form";
import FormCompleted from "./components/FormCompleted/FormCompleted.jsx";
import Detail from "./components/Detail/Detail";
import Landing from "./components/Landing/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Home" element={<Cards />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/FormCompleted" element={<FormCompleted />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
