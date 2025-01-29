
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from './components/analytics';
import Register from './components/register';
import Login from './components/login';
import Sidebar from './components/Sidebar';
import Transaction from './components/Transactions';
import Dashboard from "./components/dashboard";

function App() {
  return(
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="transaction" element={<Transaction />} />
    <Route path="/analytics" element={<Analytics />} />
    <Route path="/dashboard" element={<Dashboard/>}/>
  </Routes>
</BrowserRouter>
);
}

export default App;
