import React, { useState } from 'react';

export default function Countdown({ timeLeft, onUnlock }) {
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const formatNum = (num) => String(num).padStart(2, '0');

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === '0916') {
      setPinError(false);
      setPin('');
      
      const modalElement = document.getElementById('pinModal');
      const modalInstance = window.bootstrap?.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }

      onUnlock();
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="my-auto w-100 text-center pb-4">
      
      {/* Days Remaining Badge */}
      <div className="mb-4">
        <span className="badge bg-warning bg-opacity-20 text-warning px-3 py-2 rounded-pill fs-6 border border-warning border-opacity-25">
          {timeLeft.days} {timeLeft.days === 1 ? 'DAY' : 'DAYS'} REMAINING
        </span>
      </div>

      {/* Main 00:00:00 Countdown Display */}
      <div className="p-4 bg-white bg-opacity-10 rounded-4 border border-light border-opacity-25 shadow-lg mx-auto" style={{ maxWidth: '320px' }}>
        <div className="h1 fw-bold text-white mb-1 font-monospace tracking-widest">
          {formatNum(timeLeft.hours)} : {formatNum(timeLeft.minutes)} : {formatNum(timeLeft.seconds)}
        </div>
        <div className="d-flex justify-content-between text-uppercase small text-light opacity-75 px-3">
          <span>HRS</span>
          <span>MIN</span>
          <span>SEC</span>
        </div>
      </div>

      {/* Unlock Icon - Bottom Right */}
      <button 
        type="button"
        className="btn btn-link text-light text-opacity-50 p-3 position-absolute bottom-0 end-0 z-3 text-decoration-none"
        data-bs-toggle="modal"
        data-bs-target="#pinModal"
        title="Admin Unlock"
      >
        <i className="bi bi-lock-fill fs-5"></i>
      </button>

      {/* Modal */}
      <div className="modal fade" id="pinModal" tabIndex="-1" aria-labelledby="pinModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered px-3">
          <div className="modal-content text-white rounded-4 shadow-2xl border border-slate-700" style={{ backgroundColor: '#0f172a' }}>
            <div className="modal-header border-bottom border-slate-800">
              <h5 className="modal-title font-monospace text-warning fs-6" id="pinModalLabel">
                🔒 System Bypass
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <form onSubmit={handlePinSubmit}>
              <div className="modal-body p-4 text-center">
                <p className="small text-danger fw-bold mb-3 text-uppercase tracking-wider">
                  ⚠️ Authorized Personnel Only
                </p>
                <div className="mb-3">
                  <input
                    type="password"
                    maxLength={4}
                    className="form-control text-center font-monospace fs-4 bg-dark text-white border-secondary rounded-3"
                    placeholder="Enter PIN"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      setPinError(false);
                    }}
                    autoFocus
                  />
                  {pinError && (
                    <small className="text-danger d-block mt-2">
                      Incorrect PIN. Access Denied.
                    </small>
                  )}
                </div>
              </div>

              <div className="modal-footer border-top border-slate-800 justify-content-center">
                <button type="submit" className="btn btn-warning btn-sm rounded-pill px-4 fw-bold">
                  Bypass Timer
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  );
}