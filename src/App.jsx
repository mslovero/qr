
import './App.css';
import { useState } from 'react';
import { generateQRCode } from './api'
import { saveAs } from 'file-saver';
import Button from 'react-bootstrap/Button';


function App() {

  const [qrData, setQrData] = useState('ejemplo.com')
  const [qrSize, setQrSize] = useState('200x200')

  const handleDownload = () => {
    const qrImageUrl = generateQRCode(qrData, qrSize);
    fetch(qrImageUrl)
      .then(response => response.blob())
      .then(blob => {
        saveAs(blob, 'qr_code.jpg');
      })
      .catch(error => {
        console.error('Error downloading QR code:', error);
      });
  };


  return (
    <div className="app-container">
      <h1 className='app-title'>QR gratis</h1>
      <div className='input-container'>
        <label className='input-label'>QR URL:</label>
        <input className='input-field'
          type="text"
          value={qrData}
          onChange={(e) => setQrData(e.target.value)} />
      </div>
      <div className='input-container'>
        <label className='input-label'>Medida</label>
        <input className='input-field' type="text" value={qrSize}
          onChange={(e) => setQrSize(e.target.value)} />
      </div>
      <div className='qr-code'>
        <img className='qr-image' src={generateQRCode(qrData, qrSize)} alt='QR Code' />
      </div>
      <div className='download-button' style={{marginTop:'20px'}}> 
        <Button variant="primary" className='download-button' onClick={handleDownload}>Descargá tu QR</Button>
      </div>
    </div>
  );
}

export default App;
