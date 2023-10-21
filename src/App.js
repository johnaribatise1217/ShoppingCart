import Header from "./Components/Header";
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Cart from "./Components/Cart"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div>
        <Routes>
          <Route path="/" Component={Home} exact/>
          <Route path="/cart" Component={Cart} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
