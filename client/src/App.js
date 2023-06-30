import "./App.css";

import { Routes, Route } from "react-router-dom";
// import Home from "./components/Home/Home";
import Cards from "./components/Cards/Cards";
import Form from "./components/Form/Form";
import FormCompleted from "./components/FormCompleted/FormCompleted.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Home" element={<Cards />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/FormCompleted" element={<FormCompleted />} />
      </Routes>
    </div>
  );
}

export default App;
