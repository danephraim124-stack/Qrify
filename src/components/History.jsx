
import { Trash2, Download, QrCode } from "lucide-react";

export default function History({ history, onDelete, onClear }) {
  function downloadItem(item) {
    const link = document.createElement("a");
    link.href = item.image;
    link.download = "qrify-history.png";
    link.click();
  }

  return (
    <section className="history-section">
      <div className="history-heading">
        <div>
          <span className="eyebrow">YOUR COLLECTION</span>
          <h1>QR History</h1>
          <p>Access your previously generated QR codes.</p>
        </div>

        {history.length > 0 && (
          <button className="clear-history" onClick={onClear}>
            <Trash2 size={17} />
            Clear history
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="history-empty">
          <QrCode size={55} />
          <h2>No QR codes yet</h2>
          <p>Your generated QR codes will appear here.</p>
        </div>
      ) : (
        <div className="history-grid">
          {history.map((item) => (
            <article className="history-card" key={item.id}>
              <img src={item.image} alt="Saved QR code" />

              <div className="history-info">
                <span>{item.type.toUpperCase()}</span>
                <p>{item.value}</p>
              </div>

              <div className="history-actions">
                <button onClick={() => downloadItem(item)}>
                  <Download size={16} />
                  Download
                </button>

                <button onClick={() => onDelete(item.id)}>
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

