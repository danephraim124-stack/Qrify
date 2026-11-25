
import { useState } from "react";
import QRCode from "qrcode";
import {
  Link,
  Type,
  Wifi,
  Contact,
  Download,
  Copy,
  RefreshCw,
  QrCode
} from "lucide-react";

export default function Generator({ onGenerated }) {
  const [type, setType] = useState("url");
  const [value, setValue] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const types = [
    { id: "url", label: "URL", icon: Link },
    { id: "text", label: "Text", icon: Type },
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "contact", label: "Contact", icon: Contact }
  ];

  async function generateQR() {
    if (!value.trim()) {
      setError("Please enter something first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const image = await QRCode.toDataURL(value.trim(), {
        width: 320,
        margin: 2,
        color: {
          dark: "#102a43",
          light: "#ffffff"
        },
        errorCorrectionLevel: "H"
      });

      setQrImage(image);
onGenerated?.({
  id: Date.now(),
  type,
  value: value.trim(),
  image,
  createdAt: new Date().toISOString()
});
    } catch {
      setError("Unable to generate QR code. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    if (!qrImage) return;

    const link = document.createElement("a");
    link.href = qrImage;
    link.download = "qrify-code.png";
    link.click();
  }

  async function copyValue() {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      setError("Copy failed. Please try again.");
    }
  }

  return (
    <section className="generator">
      <div className="generator-heading">
        <span className="eyebrow">QR CODE GENERATOR</span>
        <h1>Create your QR code</h1>
        <p>Turn links, text and information into scannable QR codes.</p>
      </div>

      <div className="generator-layout">
        <div className="generator-form">
          <h2>Content type</h2>

          <div className="type-options">
            {types.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`type-button ${type === id ? "selected" : ""}`}
                onClick={() => {
                  setType(id);
                  setValue("");
                  setError("");
                  setQrImage("");
                }}
              >
                <Icon size={19} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <label htmlFor="qr-input">Your content</label>

          <textarea
            id="qr-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              type === "url"
                ? "https://example.com"
                : type === "text"
                ? "Enter your text here..."
                : type === "wifi"
                ? "WIFI:T:WPA;S:NetworkName;P:Password;;"
                : "MECARD:N:John Doe;TEL:1234567890;;"
            }
            rows={5}
          />

          <p className="input-hint">
            {type === "wifi"
              ? "Format: WIFI:T:WPA;S:NetworkName;P:Password;;"
              : type === "contact"
              ? "Format: MECARD:N:Name;TEL:Number;;"
              : "Your information stays in your browser."}
          </p>

          {error && <p className="error-message">{error}</p>}

          <button
            className="generate-button"
            onClick={generateQR}
            disabled={loading}
          >
            <QrCode size={19} />
            {loading ? "Generating..." : "Generate QR Code"}
          </button>

          <button
            className="reset-button"
            onClick={() => {
              setValue("");
              setQrImage("");
              setError("");
            }}
          >
            <RefreshCw size={16} />
            Reset
          </button>
        </div>

        <div className="qr-preview">
          <div className="preview-header">
            <h2>Preview</h2>
            <span>LIVE RESULT</span>
          </div>

          <div className="qr-display">
            {qrImage ? (
              <img src={qrImage} alt="Generated QR code" />
            ) : (
              <div className="empty-preview">
                <QrCode size={65} strokeWidth={1.2} />
                <p>Your QR code will appear here</p>
                <span>Enter content and generate your code</span>
              </div>
            )}
          </div>

          {qrImage && (
            <div className="qr-actions">
              <button onClick={downloadQR}>
                <Download size={17} />
                Download PNG
              </button>

              <button onClick={copyValue}>
                <Copy size={17} />
                Copy content
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

