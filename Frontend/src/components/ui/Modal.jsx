/* ── Modal ──────────────────────────────────────────────── */
export const Modal = ({ title, onClose, size = "md", children, footer }) => (
  <div className="st-overlay">
    <div className={`st-modal-${size} border  border-gray-700  rounded-2xl`}>
      <div className="st-modal-header">
        <h2 className="st-modal-title">{title}</h2>
        <button className="st-btn-icon" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div className="st-modal-body">{children}</div>
      {footer && <div className="st-modal-footer">{footer}</div>}
    </div>
  </div>
);
