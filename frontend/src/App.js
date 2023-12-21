import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Allrecord from "./component/Allrecord";
import BarChart from "./component/BarChart";
import PieChart from "./component/PieChart";
import Nav from "./component/Nav";
import Statistics from "./component/Statistics";



function App() {
  return (
    <div>
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Allrecord/>}></Route>
        <Route path="/piechart" element={<PieChart/>}></Route>
        <Route path="/barchart" element={<BarChart/>}></Route>
        <Route path="/statistics" element={<Statistics/>}></Route>

      </Routes>
      </BrowserRouter>
    
 
    </div>
  );
}

export default App;
