import './App.css';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
//import About from './components/About';
import TextForm from './components/TextForm';
import React, { useState } from 'react';
//import {
  //BrowserRouter as Router,
  //Route,
  //Routes
//} from "react-router-dom";


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
      document.body.style.backgroundColor = '#042743';
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
    {/*<Router>*/}
    <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
    <Alert alert={alert}/>
    <div className="container my-3">
    {/*<Routes>
          <Route exact path="/about" element={<About />}>
          </Route>
  <Route exact path="/"*/}
          {<TextForm showAlert={showAlert} heading="Enter the text to analyze" mode={mode}/>}
          {/*</Route>
    </Routes>*/}
    </div>
    {/*</Router>    */}
    </>
  );   
}

export default App;
