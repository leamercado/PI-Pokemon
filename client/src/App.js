import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { LandingPage } from "./components/LandingPage";
import { Detail } from "./components/Detail";
import { CreateForm } from "./components/CreateForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/detail/:type"/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
