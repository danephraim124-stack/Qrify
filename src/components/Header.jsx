
import { QrCode, Home, History, Info } from "lucide-react";

export default function Header({ activeTab, setActiveTab }) {
  const links = [
    { id: "home", label: "Generator", icon: Home },
    { id: "history", label: "History", icon: History },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-icon">
            <QrCode size={25} />
          </div>
          <span>QR<span className="brand-highlight">ify</span></span>
        </div>

        <nav className="nav-links">
          {links.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-link ${activeTab === id ? "active" : ""}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        <div className="header-tag">
          <Info size={15} />
          <span>Free QR Generator</span>
        </div>
      </div>
    </header>
  );
}

