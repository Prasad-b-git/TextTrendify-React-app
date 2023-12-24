import './App.css';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import About from './components/About';
import TextForm from './components/TextForm';
import Footer from './components/Footer';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


function App() {
  const [mode, setmode] = useState('light');
  const [alert,setAlert] = useState(null);

  const showAlert =(message, type)=>{
        setAlert({
          msg: message,
          type: type
        })
        setTimeout(()=>{
          setAlert(null)
        }, 1500);
  }
  const toggleMode =()=>{
    if(mode === 'light'){
      setmode('dark')
      document.body.style.backgroundColor = 'rgb(36, 70, 92)';
      showAlert("Dark mode has been enabled","success");
    }
    else{
        setmode('light')
        document.body.style.backgroundColor = 'white';
        showAlert("Light mode has been enabled","success");
      }
    }
  
  return (
    <> 
    <Router>
    <Navbar title="TextTrendify" mode={mode} toggleMode={toggleMode} />
    <Alert alert={alert}/>
    <div className="container my-3">
    <Routes>
          <Route exact path="/about" element={<About mode={mode}/>} />
          <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Try TextTrendify - Word counter, Character counter, Remove extra spaces" mode={mode} />} />
    </Routes>
    </div>
    <div>
    <Footer />
    </div>
    
   </Router>    
    </>
  );   
}

export default App;
