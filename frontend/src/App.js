import './App.css';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Formpage from './components/Formpage/Formpage';
import Homepage from './components/Homepage/Homepage';
import Excelpage from './components/Excelpage/Excelpage';
import ExcelColumnsPage from './components/Excelanalytics/ExcelColumnspage';
import FormColumnspage from './components/Formanalytics/FromColumnspage';
import ExcelViewer from './components/Exceldisplay/excelview';
import AllExcels from './components/Allexcels/Allexcels';

function App() {
  return (
    <>
    <Router>
    <Routes>
    <Route exact path="/" element={<Homepage/>}></Route>
    <Route exact path="/form" element={<Formpage/>}></Route>
    <Route exact path="/excel" element={<Excelpage/>}></Route>
    <Route exact path="/expand" element={<ExcelColumnsPage/>}></Route>
    <Route exact path="/expandform" element={<FormColumnspage/>}></Route>
    <Route exact path="/e" element={<ExcelViewer/>}></Route>
    <Route exact path="/all" element={<AllExcels/>}></Route>
    </Routes>
    </Router>
    </>
  );
}

export default App;
