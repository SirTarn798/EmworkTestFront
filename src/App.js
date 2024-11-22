import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/main";
import { AddParticipant } from "./pages/add-participant/add-participant";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/add-participant" element={<AddParticipant/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
