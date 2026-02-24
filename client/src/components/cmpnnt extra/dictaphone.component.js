import React, { useState, useRef } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import "./Custom.css"
import NewWindow from 'react-new-window';
import Export2Word from './export-to-word'
import UnlockAccess from './roles/UnlockAccess';

const Dictaphone = () => {

  const [image, setImage] = useState("");
  const inputFile = useRef(null);

  const handleFileUpload = e => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

      setImage(files[0]);
    }
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  function copyToClipboard(text) {
    var input = document.body.appendChild(document.createElement("input"));
    input.value = text;
    input.focus();
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
  }
  
  const [message, setMessage] = useState('')
  const commands = [
    {
      command: 'Open a new document',
      callback: () => onButtonClick()
    },
    {
      command: 'Copy *',
      callback: (text) => copyToClipboard(`${text}`)
    },
    {
      command: 'Export to Word',
      callback: () => Export2Word('docdata','Process Documentation')
    },
    {
      command: ['clear', 'Reset'],
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]

  const { transcript } = useSpeechRecognition({ commands })

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div>
    <UnlockAccess request={'Admin'}>
    <input
      style={{ display: "none" }}
      // accept=".zip,.rar"
      ref={inputFile}
      onChange={handleFileUpload}
      type="file"
    />
    <button style={{margin: "10px"}} className="btn navbar-gradient navlink-custom" onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
    <button style={{margin: "10px"}} className="btn navbar-gradient navlink-custom" onClick={SpeechRecognition.stopListening}>Stop</button>
    <button style={{margin: "10px"}} className="btn navbar-gradient navlink-custom" onClick={() => Export2Word('docdata','Process Documentation')}>Export to Word</button>
    <div id="docdata">{transcript}</div>
    </UnlockAccess>

    <UnlockAccess request={'User'}>
      Page Not Available...
    </UnlockAccess>
  </div>
  )
}
export default Dictaphone