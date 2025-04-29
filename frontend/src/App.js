import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import AddStudent from './components/AddStudent';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard/>}/>
        {/* <Route path="addstudent" element={<AddStudent/>}/> */}
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}