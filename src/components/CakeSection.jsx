import React, { useState, useRef } from 'react';

export default function CakeSection({ recipientName, imageUrl, candlesBlown, onBlow }) {
  const [micActive, setMicActive] = useState(false);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animFrameRef = useRef(null);

  const startMicDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      analyserRef.current.fftSize = 256;
      microphoneRef.current.connect(analyserRef.current);
      setMicActive(true);
      setMicPermissionDenied(false);

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

      const checkVolume = () => {
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;

        if (average > 45) { 
          handleBlow();
        } else {
          animFrameRef.current = requestAnimationFrame(checkVolume);
        }
      };

      checkVolume();
    } catch (err) {
      setMicPermissionDenied(true);
    }
  };

  const handleBlow = () => {
    onBlow();
    if (audioContextRef.current) audioContextRef.current.close();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  };

  return (
    <div className="my-auto d-flex flex-column align-items-center w-100 position-relative">
      
      {/* Sliding Local Photo */}
      <div className={`position-absolute photo-slide ${candlesBlown ? 'revealed' : ''}`} style={{ zIndex: 2 }}>
        <div className="bg-white p-2 pb-3 rounded shadow-lg text-center" style={{ width: '190px' }}>
          <img src={imageUrl} alt="Birthday Surprise" className="w-100 rounded" style={{ height: '150px', objectFit: 'cover' }} />
          <h6 className="text-danger fw-bold mt-2 mb-0">Happy Birthday, {recipientName}! ❤️</h6>
        </div>
      </div>

      {/* Cake Graphic */}
      <div className="position-relative mt-5 z-1">
        <div className="d-flex flex-column align-items-center">
          <div className={`flame ${candlesBlown ? 'opacity-0 scale-0' : 'opacity-100'}`}></div>
          <div className="bg-info rounded-top" style={{ width: '8px', height: '28px' }}></div>
        </div>

        <div className="bg-danger-subtle rounded-top border-bottom border-danger-subtle mx-auto shadow-sm" style={{ width: '140px', height: '45px' }}></div>
        <div className="bg-danger rounded-bottom border-top border-danger-subtle mx-auto shadow" style={{ width: '180px', height: '60px' }}></div>
        <div className="bg-light rounded-pill mx-auto shadow" style={{ width: '210px', height: '12px', marginTop: '-4px' }}></div>
      </div>

      {/* Mic Blow Buttons */}
      {!candlesBlown && (
        <div className="mt-4 z-2 text-center">
          {!micActive ? (
            <button onClick={startMicDetection} className="btn btn-danger btn-sm rounded-pill shadow px-4">
              🎤 Enable Mic to Blow Candle
            </button>
          ) : (
            <p className="small text-warning mb-0">💨 Blow into your microphone!</p>
          )}

          {micPermissionDenied && (
            <button onClick={handleBlow} className="btn btn-link text-warning small d-block mx-auto mt-2 text-decoration-none">
              Mic blocked? Tap here to blow manually
            </button>
          )}
        </div>
      )}
    </div>
  );
}