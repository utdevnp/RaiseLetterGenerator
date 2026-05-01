'use client';

export default function DisclaimerPage() {
  return (
    <div className="container py-4">
      <nav className="mb-2 py-2 border-bottom">
        <div className="d-flex justify-content-center gap-3">
          <a href="/" className="text-decoration-none small text-muted">Home</a>
          <span className="text-muted small">|</span>
          <a href="/disclaimer" className="text-decoration-none small fw-bold">Disclaimer</a>
          <span className="text-muted small">|</span>
          <a href="/how-to-use" className="text-decoration-none small text-muted">How to Use</a>
        </div>
      </nav>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h3 className="mb-4">Disclaimer</h3>
              
              <h5 className="mt-4">Data Privacy</h5>
              <p className="text-muted">
                Your employee data and Excel files are processed entirely within your browser and are never uploaded to any server. 
                We do not store, copy, or retain any of your personal information. All data processing happens locally on your device.
              </p>

              <h5 className="mt-4">Local Storage</h5>
              <p className="text-muted">
                Only your template and settings are saved locally on your device for convenience. 
                This data is encrypted for security purposes. You can clear this data at any time by clearing your browser's local storage.
              </p>

              <h5 className="mt-4">No Warranty</h5>
              <p className="text-muted">
                This application is provided as-is without any warranties. Users are responsible for verifying the accuracy 
                and completeness of generated letters. We recommend reviewing all generated documents before distribution.
              </p>

              <h5 className="mt-4">Limitation of Liability</h5>
              <p className="text-muted">
                We shall not be liable for any damages arising from the use of this application. 
                Users assume full responsibility for the generated documents and their distribution.
              </p>

              <h5 className="mt-4">Developer</h5>
              <p className="text-muted">
                This application is developed and maintained by <a href="https://github.com/utdevnp" target="_blank" rel="noopener noreferrer" className="text-decoration-none">@utdevnp</a>
              </p>

              <div className="mt-4">
                <a href="/" className="btn btn-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Generator
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3 py-3 border-top mt-4">
        <a href="/" className="text-decoration-none small">Home</a>
        <span className="text-muted small">|</span>
        <a href="/disclaimer" className="text-decoration-none small">Disclaimer</a>
        <span className="text-muted small">|</span>
        <a href="/how-to-use" className="text-decoration-none small text-muted">How to Use</a>
      </div>
    </div>
  );
}