
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from './components/analytics';
import Register from './components/register';
import Login from './components/login';
import Sidebar from './components/Sidebar';
import Transaction from './components/Transactions';
import Dashboard from "./components/dashboard";
import { TruecntextProvider } from "./components/context";
import LandingPage from "./components/landingpage";
import AddTransaction from "./components/addtransaction";
import Goals from "./components/gols";

function App() {
  return(
    <TruecntextProvider>
      <BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/transaction" element={<Transaction />} />
    <Route path="/transaction/addTransaction" element={<AddTransaction />} />
    <Route path="/analytics" element={<Analytics />} />
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/analytics/goals" element={<Goals/>}/>
  </Routes>
      </BrowserRouter>
    </TruecntextProvider>
);
}

export default App;
