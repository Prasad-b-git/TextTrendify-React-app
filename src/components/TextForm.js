import React,{useState} from 'react';

export default function TextForm(props) {

    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Coverted to Uppercase!","success");
    }
    const handlelowClick =()=>{
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Coverted to Lowercase!","success");
    }
    const handleClearClick =()=>{
        let newText = ("");
        setText(newText);
        props.showAlert("Cleared text!","success");
    }
    const handleCopy =()=>{
        let text = document.getElementById("myBox");
        navigator.clipboard.writeText(text.value);
        props.showAlert("Copied to clipboard!","success");
    }

    const handleExtraSpaces =()=>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Removed the extra spaces!","success");
    }
    const handleOnchange = (event)=>{
        setText(event.target.value);
    }
    const [text, setText] = useState("");
  return (
    <>
    <div className="container" style={{color : props.mode==='dark'?'white':'#042743'}}>
        <h1 className="mb-2">{props.heading}</h1>
        <div className="mb-3">
        <textarea className="form-control" value={text} onChange={handleOnchange} style={{backgroundColor : props.mode==='dark'?'#13466e':'white', color: props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8"></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-dark mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
        <button disabled={text.length===0} className="btn btn-dark mx-1 my-1" onClick={handlelowClick}>Convert to Lowercase</button>
        <button disabled={text.length===0} className="btn btn-dark mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
        <button disabled={text.length===0} className="btn btn-dark mx-1 my-1" onClick={handleCopy}>Copy Text</button>
        <button disabled={text.length===0} className="btn btn-dark mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
        </div>
        <div className="container" style={{color : props.mode==='dark'?'white':'#042743'}}>
            <h2>Your text summary</h2>
            <p> {text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and 
                {text.length} characters
            </p>
            <p>
                {0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} Minutes read
            </p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Nothing to Preview!"}</p>
        </div>
    </>
  );
}
