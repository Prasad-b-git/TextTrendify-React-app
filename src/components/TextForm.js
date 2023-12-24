import React,{useState} from 'react';
import { franc } from 'franc';
//import axios from 'axios';
//import { SpellChecker } from 'spellchecker';
import texttospeak from './images/speak.png';
import upper from './images/upper.png';
import lower from './images/lower.png';
import clear from './images/clear.png';
import copy from './images/copy.png';
import extraspace from './images/extraspace.png';
import lang from './images/lang.png';
import read from './images/read.png';
import sum from './images/summary.png';
//import exp from './images/export.png';
import pdf from './images/pdf.png';
import tex from './images/text.png';
import html from './images/html.png';
import jsPDF from 'jspdf';
import { Dropdown, DropdownButton , OverlayTrigger , Tooltip} from 'react-bootstrap';
//import translate from 'google-translate-api';

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
        resetValues();
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
    
  const [detectedLanguage, setDetectedLanguage] = useState('');

    const detectLanguage = () => {
    const languageCode = franc(text, { minLength: 3 });
    // You can use additional libraries to map the language code to the language name if needed.

    setDetectedLanguage(languageCode);
    }
    const [text, setText] = useState('');
    const [syllableCount, setSyllableCount] = useState(0);
    const [characterCount, setCharacterCount] = useState(0);
    const [sentenceCount, setSentenceCount] = useState(0);
    const [readabilityScore, setReadabilityScore] = useState(0);
    const [gradeLevel, setGradeLevel] = useState(null);
    const [summary, setSummary] = useState('');
   
  const calculateReadability = () => {
    // Calculate syllable count and sentence count here, you can use libraries like "syllable" for syllable counting
    // and "sentence-tokenizer" for sentence counting.

    // Replace these placeholders with actual calculations.
    const syllables = text.split(' ').length; // Placeholder for syllable count
    const sentences = text.split('  .').length; // Placeholder for sentence count
    const characters = text.length;

    const fleschKincaid = 0.39 * (syllables / sentences) + 11.8 * (text.split(' ').length / sentences) - 15.59;
    

    
    
    const readabilityPercentage = Math.min(100, (fleschKincaid / 12) * 100);
    

    setGradeLevel(fleschKincaid.toFixed(2));
    setSyllableCount(syllables);
    setCharacterCount(characters);
    setSentenceCount(sentences);
    setReadabilityScore(readabilityPercentage);
    props.showAlert("Readibility score calculated! Check summary for details","success");
  };

  const generateSummary = () => {
    // Split the text into sentences and extract a summary of the first few sentences.
    const sentences = text.split('.');
    const summarySentences = sentences.slice(0, 2); // Change the number to extract more or fewer sentences.
    const summaryText = summarySentences.join('.') + '.';
    setSummary(summaryText);
    props.showAlert("Summary generated","success");
  };
  

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(text, 10, 10); // Insert the text into the PDF
    doc.save('exported-text.pdf');
  };
  
  const exportToTextFile = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'exported-text.txt';
    link.click();
  };
  const exportToHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>Exported HTML Document</title>
</head>
<body>
  <p>${text}</p>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'exported-text.html';
    link.click();
  };
  const tooltipText = {
    pdf: 'Export as PDF',
    text: 'Export as Text',
    html: 'Export as HTML',
    
  };

  const resetValues = () => {
    setText('');
    setSyllableCount(0);
    setSentenceCount(0);
    setCharacterCount(0);
    setReadabilityScore(0);
    setGradeLevel(null);
    setDetectedLanguage(null);
    setSummary('');
    };
  const speak = () => {
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      window.speechSynthesis.speak(msg);
  }

  return (
    <>
    <div className="container" style={{color : props.mode==='dark'?'white':'rgb(36, 70, 92)'}}>
        <h1 className="mb-2">{props.heading}</h1>
        <div className="mb-3">
        <textarea className="form-control" value={text} onChange={handleOnchange} style={{backgroundColor : props.mode==='dark'?'rgb(36, 70, 92)':'white', color: props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8"></textarea>
        </div>
        <center>
        <button disabled={text.length===0} className="btn icons mx-1 my-1" onClick={speak} ><OverlayTrigger
          placement="right"
          overlay={<Tooltip>Text to Speak</Tooltip>}><img src={texttospeak} alt='speak' /></OverlayTrigger> </button>
        <button disabled={text.length===0} className="btn icon" onClick={handleUpClick}><OverlayTrigger
          placement="right"
          overlay={<Tooltip>Convert to Uppercase</Tooltip>}><img src={upper} alt='up'/></OverlayTrigger> </button>
        <button disabled={text.length===0} className="btn icon mx-1 my-1" onClick={handlelowClick}><OverlayTrigger
          placement="right"
          overlay={<Tooltip>Convert to Lowercase</Tooltip>}><img src={lower} alt='lower' /></OverlayTrigger> </button>
        <button disabled={text.length===0} className="btn icon mx-1 my-1" onClick={handleClearClick}><OverlayTrigger
          placement="right"
          overlay={<Tooltip>Clear Text</Tooltip>}><img src={clear} alt='clear' /></OverlayTrigger> </button>
        <button disabled={text.length===0} className="btn icon mx-1 my-1" onClick={handleCopy}><OverlayTrigger
          placement="right"
          overlay={<Tooltip>Copy Text</Tooltip>}><img src={copy} alt='copy' /></OverlayTrigger> </button>
        <button disabled={text.length===0} className="btn icon mx-1 my-1" onClick={handleExtraSpaces}><OverlayTrigger
          placement="right"
          overlay={<Tooltip>Remove Extra spaces</Tooltip>}><img src={extraspace} alt='extraspace' /></OverlayTrigger> </button>
        <button disabled={text.length===0} className="btn icon mx-1 my-1" onClick={detectLanguage}><OverlayTrigger
          placement="right"
          overlay={<Tooltip>Detect Language</Tooltip>}><img src={lang} alt='lang' /></OverlayTrigger></button>
        <button disabled={text.length===0} className="btn icon mx-1 my-1" onClick={calculateReadability}><OverlayTrigger
          placement="right"
          overlay={<Tooltip>Calculate Readibility score</Tooltip>}><img src={read} alt='read' /></OverlayTrigger> </button>
        <button disabled={text.length===0} className="btn  mx-1 my-1" onClick={generateSummary}><OverlayTrigger
          placement="right"
          overlay={<Tooltip>Genrate summary</Tooltip>}
        ><img src={sum} alt="summary" />
        </OverlayTrigger> </button>
        <DropdownButton title="Export" disabled={text.length===0}>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="pdf-tooltip">{tooltipText.pdf}</Tooltip>}>
        <Dropdown.Item onClick={exportToPDF}><img src={pdf} alt='pdf' /></Dropdown.Item>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="text-tooltip">{tooltipText.text}</Tooltip>}>
        <Dropdown.Item onClick={exportToTextFile}><img src={tex} alt='tex' /></Dropdown.Item>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id="html-tooltip">{tooltipText.html}</Tooltip>}>
        <Dropdown.Item onClick={exportToHTML}><img src={html} alt='html' /></Dropdown.Item>
        </OverlayTrigger>
      </DropdownButton>
      
        </center>
        </div>
        
        
        
      
        <div className="container" style={{color : props.mode==='dark'?'white':'#042743'}}>
            <h2>Your text summary</h2>
            {detectedLanguage && (
        <p>Detected Language: {detectedLanguage}</p>
        )}
        <div>
        <p>Summary: {summary}</p>
        <p>Syllable Count: {syllableCount}</p>
        <p>Character Count: {characterCount}</p>
        <p>Sentence Count: {sentenceCount}</p>
        <p>Readability Score: {readabilityScore.toFixed(2)}%</p>
        <p>Flesch-Kincaid Grade Level: {gradeLevel}</p>
      </div>
            <p> Minutes read: {0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} </p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Nothing to Preview!"}</p>
        </div>
        
      
    </>
  );
}
