import { useMemo, useState } from "react";
import { initialItems, ReviewItem } from "./data";

type Filter = "All" | "Needs review" | "Ready to approve" | "Manual review";

const confidenceLabel = (confidence: number) => {
  if (confidence >= 95) return "High confidence";
  if (confidence >= 75) return "Review recommended";
  return "Manual review required";
};

function App() {
  const [items, setItems] = useState<ReviewItem[]>(initialItems);
  const [selectedId, setSelectedId] = useState(1);
  const [filter, setFilter] = useState<Filter>("All");
  const [showSource, setShowSource] = useState(true);
  const [showCorrection, setShowCorrection] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [reason, setReason] = useState("Incorrect extraction");

  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  const filteredItems = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((item) => item.status === filter);
  }, [filter, items]);

  const updateDecision = (decision: ReviewItem["decision"]) => {
    setItems((current) =>
      current.map((item) =>
        item.id === selected.id ? { ...item, decision } : item
      )
    );
  };

  const saveCorrection = () => {
    if (!newValue.trim()) return;
    setItems((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              decision: "corrected",
              correctedValue: newValue,
              correctionReason: reason
            }
          : item
      )
    );
    setShowCorrection(false);
    setNewValue("");
  };

  const pendingCount = items.filter((item) => item.decision === "pending").length;
  const reviewedCount = items.length - pendingCount;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">G</div>
          <div>
            <strong>GreenLedger</strong>
            <span>AI Tax Platform</span>
          </div>
        </div>

        <nav>
          <button className="nav-item active">Review queue</button>
          <button className="nav-item">Returns</button>
          <button className="nav-item">Documents</button>
          <button className="nav-item">Clients</button>
          <button className="nav-item">Audit history</button>
        </nav>

        <div className="sidebar-footer">
          <div className="avatar">MK</div>
          <div>
            <strong>Manjusha K.</strong>
            <span>Tax preparer</span>
          </div>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div>
            <p className="eyebrow">2025 Individual Return</p>
            <h1>AI Review Queue</h1>
            <p className="subtitle">Review AI-extracted values before finalizing the return.</p>
          </div>
          <div className="progress-card">
            <span>{reviewedCount} of {items.length} reviewed</span>
            <div className="progress-track">
              <div style={{ width: `${(reviewedCount / items.length) * 100}%` }} />
            </div>
          </div>
        </header>

        <section className="summary-grid">
          <div className="summary-card">
            <span>Needs attention</span>
            <strong>{pendingCount}</strong>
          </div>
          <div className="summary-card">
            <span>High confidence</span>
            <strong>{items.filter((i) => i.confidence >= 95).length}</strong>
          </div>
          <div className="summary-card">
            <span>Manual review</span>
            <strong>{items.filter((i) => i.confidence < 75).length}</strong>
          </div>
        </section>

        <section className="workspace">
          <div className="queue-panel">
            <div className="panel-heading">
              <div>
                <h2>Items to review</h2>
                <p>Sorted by risk and confidence</p>
              </div>
            </div>

            <div className="filters">
              {(["All", "Needs review", "Ready to approve", "Manual review"] as Filter[]).map((value) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={filter === value ? "filter active" : "filter"}
                >
                  {value}
                </button>
              ))}
            </div>

            <div className="queue-list">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  className={selected.id === item.id ? "queue-item selected" : "queue-item"}
                  onClick={() => {
                    setSelectedId(item.id);
                    setShowSource(true);
                    setShowCorrection(false);
                  }}
                >
                  <div className="queue-top">
                    <span className={`status-dot confidence-${item.confidence >= 95 ? "high" : item.confidence >= 75 ? "medium" : "low"}`} />
                    <strong>{item.field}</strong>
                    <span className="value">{item.correctedValue ?? item.value}</span>
                  </div>
                  <span>{item.form}</span>
                  <div className="queue-meta">
                    <span>{item.confidence}% confidence</span>
                    <span className={`decision ${item.decision}`}>{item.decision}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="review-panel">
            <div className="review-header">
              <div>
                <p className="eyebrow">{selected.form}</p>
                <h2>{selected.field}</h2>
              </div>
              <span className={`status-badge status-${selected.status.replaceAll(" ", "-").toLowerCase()}`}>
                {selected.status}
              </span>
            </div>

            <div className="value-card">
              <div>
                <span>AI-extracted value</span>
                <strong>{selected.correctedValue ?? selected.value}</strong>
                {selected.correctedValue && (
                  <small>Original AI value: {selected.value}</small>
                )}
              </div>
              <div className="confidence-block">
                <strong>{selected.confidence}%</strong>
                <span>{confidenceLabel(selected.confidence)}</span>
              </div>
            </div>

            <div className="alert-box">
              <strong>Why this needs attention</strong>
              <p>{selected.warning}</p>
            </div>

            <div className="explanation-card">
              <div className="section-title">
                <h3>What the AI did</h3>
                <span>AI-generated</span>
              </div>
              <p>{selected.explanation}</p>

              <h3>Evidence</h3>
              <ul>
                {selected.evidence.map((evidence) => (
                  <li key={evidence}>{evidence}</li>
                ))}
              </ul>

              <h3>Recommended next action</h3>
              <p>{selected.recommendation}</p>
            </div>

            {selected.decision !== "pending" && (
              <div className="audit-card">
                <strong>Decision recorded</strong>
                <p>
                  {selected.decision === "corrected"
                    ? `Corrected to ${selected.correctedValue}. Reason: ${selected.correctionReason}.`
                    : `Marked as ${selected.decision}.`}
                </p>
                <span>Recorded by Manjusha K. · Today</span>
              </div>
            )}

            <div className="actions">
              <button className="secondary" onClick={() => setShowSource(!showSource)}>
                {showSource ? "Hide source" : "View source"}
              </button>
              <button className="secondary" onClick={() => setShowCorrection(true)}>
                Edit value
              </button>
              <button className="danger" onClick={() => updateDecision("rejected")}>
                Reject
              </button>
              <button className="primary" onClick={() => updateDecision("approved")}>
                Approve
              </button>
            </div>
          </div>

          {showSource && (
            <div className="source-panel">
              <div className="source-heading">
                <div>
                  <p className="eyebrow">Source document</p>
                  <h2>{selected.source}</h2>
                </div>
                <button onClick={() => setShowSource(false)}>×</button>
              </div>

              <div className="document-toolbar">
                <span>Page {selected.page}</span>
                <span>{selected.section}</span>
              </div>

              <div className="document-page">
                <div className="doc-title">WAGE AND TAX STATEMENT</div>
                <div className="doc-grid">
                  <div>
                    <span>Employee name</span>
                    <strong>Manjusha D. Kancharla</strong>
                  </div>
                  <div>
                    <span>Employer</span>
                    <strong>Acme Technology Inc.</strong>
                  </div>
                  <div className="highlighted-field">
                    <span>{selected.section}</span>
                    <strong>{selected.value}</strong>
                    <small>AI source highlight</small>
                  </div>
                  <div>
                    <span>Employer EIN</span>
                    <strong>12-3456789</strong>
                  </div>
                </div>
                <div className="document-note">
                  This is a simulated source document for the prototype.
                </div>
              </div>

              <div className="source-trace">
                <h3>Traceability</h3>
                <p>
                  {selected.source} → Page {selected.page} → {selected.section} → {selected.form}
                </p>
                <span>No transformation applied</span>
              </div>
            </div>
          )}
        </section>
      </main>

      {showCorrection && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <div>
                <p className="eyebrow">Human correction</p>
                <h2>Edit {selected.field}</h2>
              </div>
              <button onClick={() => setShowCorrection(false)}>×</button>
            </div>

            <label>
              Current AI value
              <input value={selected.value} disabled />
            </label>

            <label>
              Corrected value
              <input
                autoFocus
                value={newValue}
                onChange={(event) => setNewValue(event.target.value)}
                placeholder="Enter corrected value"
              />
            </label>

            <label>
              Reason for correction
              <select value={reason} onChange={(event) => setReason(event.target.value)}>
                <option>Incorrect extraction</option>
                <option>Wrong source document</option>
                <option>Calculation error</option>
                <option>Missing context</option>
                <option>Other</option>
              </select>
            </label>

            <div className="modal-note">
              The original AI value will remain in the audit history.
            </div>

            <div className="modal-actions">
              <button className="secondary" onClick={() => setShowCorrection(false)}>Cancel</button>
              <button className="primary" onClick={saveCorrection}>Save correction</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
