import React, { useState } from 'react';

export default function LetterEnvelope({ message, recipientName }) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const handleEnvelopeClick = () => {
    if (!envelopeOpen) {
      setEnvelopeOpen(true);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <h5 className="fw-bold mb-5 text-warning text-center">A Letter to me lalabs</h5>

      {/* Interactive Envelope */}
      <div onClick={handleEnvelopeClick} className="envelope-container shadow-lg">
        <div className={`envelope-flap ${envelopeOpen ? 'open' : ''}`}></div>
        <div className="envelope-pocket"></div>
        
        {/* Letter Inside Envelope */}
        <div 
          className={`envelope-letter ${envelopeOpen ? 'open' : ''}`}
          data-bs-toggle={envelopeOpen ? "modal" : ""}
          data-bs-target={envelopeOpen ? "#letterModal" : ""}
        >
          <p className="small mb-1 text-truncate fw-bold text-rose-900">Yo {recipientName}!,</p>
          <p className="small text-muted mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.2' }}>
            Tap here to open and read your letter...
          </p>
        </div>

        {!envelopeOpen && (
          <div className="position-absolute w-100 text-center text-white small fw-bold mb-2 z-3" style={{ bottom: '0' }}>
            Tap to Open
          </div>
        )}
      </div>

      {/* Soft Warm Parchment Modal */}
      <div className="modal fade" id="letterModal" tabIndex="-1" aria-labelledby="letterModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered px-3">
          <div className="modal-content custom-modal-content rounded-4 shadow-2xl">
            <div className="modal-header border-bottom border-amber-900 border-opacity-10">
              <h5 className="modal-title font-serif text-rose-900 fw-bold" id="letterModalLabel">
                💌 Happy Birthday, My Biboy
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4">
              <p className="font-serif leading-relaxed mb-0" style={{ whiteSpace: 'pre-line', fontSize: '0.95rem', color: '#292524' }}>
                {message}
              </p>
            </div>
            <div className="modal-footer border-0 justify-content-center pt-0">
              <button type="button" className="btn btn-outline-dark btn-sm rounded-pill px-4" data-bs-dismiss="modal">
                Close Letter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}