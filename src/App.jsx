
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Generator from "./components/Generator";
import History from "./components/History";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("qrify-history")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("qrify-history", JSON.stringify(history));
  }, [history]);

  function deleteHistory(id) {
    setHistory((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  function clearHistory() {
    if (window.confirm("Delete all QR history?")) {
      setHistory([]);
    }
  }

  return (
    <div className="app">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="main-content">
          <Generator
  onGenerated={(item) =>
    setHistory((previous) => [
      item,
      ...previous.filter((entry) => entry.value !== item.value)
    ])
  }
/>
) : ({activeTab === "home" ? (
          <Generator />
        ) : (
          <History
            history={history}
            onDelete={deleteHistory}
            onClear={clearHistory}
          />
        )}
      </main>

      <footer className="footer">
        <p>© 2026 QRify. Create it. Scan it. Share it.</p>
        <span>Made for everyone.</span>
      </footer>
    </div>
  );
}

export default App;

