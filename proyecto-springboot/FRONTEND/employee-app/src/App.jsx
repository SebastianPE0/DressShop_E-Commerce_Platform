import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/ListEmployee";
import EditEmployee from "./components/EditEmployee";  
import AddEmployee from "./components/AddEmployee";  

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EmployeeList />} />
                <Route path="/add" element={<AddEmployee />} />
                <Route path="/edit/:id" element={<EditEmployee />} />
            </Routes>
        </Router>
    );
}

export default App;