import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomeComponent from "./components/HomeComponent/HomeComponent.js"
import AddMapComponent from './components/AddMapComponent/AddMapComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/add" element={<AddMapComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
