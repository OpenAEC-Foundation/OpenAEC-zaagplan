import { useState, useEffect, useCallback, useRef } from "react";

import "./Backstage.css";

const ICONS = {
  new: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6m-3 3h6"/></svg>',
  open: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>',
  save: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V7l-4-4z"/><path d="M17 3v4a1 1 0 01-1 1H8"/><path d="M7 14h10v7H7z"/></svg>',
  saveAs: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V7l-4-4z"/><path d="M17 3v4a1 1 0 01-1 1H8"/><path d="M12 12v6m-3-3h6"/></svg>',
  close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9l6 6m0-6l-6 6"/></svg>',
  preferences: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  about: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  exit: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  server: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
  file: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>',
};

// Hardcoded Nederlandse strings (geen i18n systeem in cutlist)
const STRINGS = {
  file: "Bestand",
  new: "Nieuw",
  open: "Openen",
  save: "Opslaan",
  saveAs: "Opslaan als...",
  close: "Sluiten",
  preferences: "Voorkeuren",
  about: "Over",
  exit: "Afsluiten",
  fromServer: "Van server",
  localFile: "Lokaal bestand (.json)",
  toServer: "Naar server",
  localExport: "Lokaal export",
  projectNamePrompt: "Voer een projectnaam in:",
  savedToServer: "Project opgeslagen op server",
  savedLocally: "Project lokaal opgeslagen",
  opened: "Project geopend",
  newProject: "Nieuw project aangemaakt",
  closed: "Project gesloten",
  importError: "Fout bij importeren",
  saveError: "Fout bij opslaan",
  aboutPanel: {
    title: "Over",
    version: "Versie",
    website: "Website",
    github: "GitHub"
  }
};

function MenuItem({
  icon,
  label,
  shortcut,
  active,
  onClick,
}) {
  return (
    <button
      className={`backstage-item${active ? " active" : ""}`}
      onClick={onClick}
    >
      <span
        className="backstage-item-icon"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <span className="backstage-item-label">{label}</span>
      {shortcut && (
        <span className="backstage-item-shortcut">{shortcut}</span>
      )}
    </button>
  );
}

function SubMenuItem({
  icon,
  label,
  onClick,
  disabled,
}) {
  return (
    <button
      className="backstage-item backstage-sub-item"
      onClick={onClick}
      disabled={disabled}
      style={{ opacity: disabled ? 0.4 : 1 }}
    >
      <span
        className="backstage-item-icon"
        style={{ width: 18, height: 18 }}
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <span className="backstage-item-label" style={{ fontSize: 12 }}>
        {label}
      </span>
    </button>
  );
}

function Divider() {
  return <div className="backstage-divider" />;
}

export default function Backstage({
  open,
  onClose,
  onOpenSettings,
  onNavigate,
  // Props specifiek voor cutlist state management
  project,
  setProject,
  isLoggedIn,
  addToast,
  onNewProject,
}) {
  const [activePanel, setActivePanel] = useState("none");
  const [openExpanded, setOpenExpanded] = useState(false);
  const [saveAsExpanded, setSaveAsExpanded] = useState(false);
  const fileInputRef = useRef(null);

  const actionAndClose = useCallback(
    (fn) => {
      onClose();
      fn?.();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) {
      setActivePanel("none");
      setOpenExpanded(false);
      setSaveAsExpanded(false);
      return;
    }
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // --- File actions ---

  const handleNew = useCallback(() => {
    onNewProject(); // App.jsx functie om default data te herstellen
    onClose();
    addToast(STRINGS.newProject, "info");
  }, [onNewProject, onClose, addToast]);

  const handleOpenServer = useCallback(() => {
    onClose();
    onNavigate?.("/projects");
  }, [onClose, onNavigate]);

  const handleOpenLocal = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelected = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const projectData = JSON.parse(text);

        // Direct import naar cutlist state (geen thermal wizard zoals warmteverlies)
        setProject(projectData);
        onClose();
        addToast(STRINGS.opened, "success");
      } catch (err) {
        addToast(
          `${STRINGS.importError}: ${err instanceof Error ? err.message : String(err)}`,
          "error",
        );
      }

      // Reset file input so the same file can be selected again
      e.target.value = "";
    },
    [setProject, onClose, addToast],
  );

  const handleSave = useCallback(async () => {
    if (isLoggedIn) {
      // Server save — for now we don't have backend save endpoint,
      // so fall back to local until backend is implemented
      handleSaveAsLocal();
    } else {
      // Not logged in — export locally
      handleSaveAsLocal();
    }
  }, [isLoggedIn]);

  const handleSaveAsServer = useCallback(async () => {
    // Cloud save not implemented yet in cutlist backend
    // Fall back to local for now
    addToast("Cloud opslag nog niet beschikbaar voor Cutlist — lokaal export", "info");
    handleSaveAsLocal();
  }, []);

  const handleSaveAsLocal = useCallback(() => {
    try {
      // Export current project state as JSON
      const blob = new Blob([JSON.stringify(project, null, 2)], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const timestamp = new Date().toISOString().slice(0, 10);
      a.download = `cutlist_project_${timestamp}.json`;
      a.click();
      URL.revokeObjectURL(url);

      onClose();
      addToast(STRINGS.savedLocally, "success");
    } catch (err) {
      addToast(
        `${STRINGS.saveError}: ${err instanceof Error ? err.message : String(err)}`,
        "error",
      );
    }
  }, [project, onClose, addToast]);

  const handleClose = useCallback(() => {
    onNewProject(); // Reset to default project
    onClose();
    addToast(STRINGS.closed, "info");
  }, [onNewProject, onClose, addToast]);

  if (!open) return null;

  const handleContentClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="backstage-overlay">
      <div className="backstage-sidebar">
        <button className="backstage-back" onClick={onClose}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>{STRINGS.file}</span>
        </button>
        <div className="backstage-items">
          {/* Nieuw */}
          <MenuItem
            icon={ICONS.new}
            label={STRINGS.new}
            shortcut="Ctrl+N"
            onClick={handleNew}
          />

          {/* Openen */}
          <MenuItem
            icon={ICONS.open}
            label={STRINGS.open}
            shortcut="Ctrl+O"
            onClick={() => setOpenExpanded((v) => !v)}
          />
          {openExpanded && (
            <>
              {isLoggedIn && (
                <SubMenuItem
                  icon={ICONS.server}
                  label={STRINGS.fromServer}
                  onClick={handleOpenServer}
                  disabled={true} // Cloud niet geïmplementeerd
                />
              )}
              <SubMenuItem
                icon={ICONS.file}
                label={STRINGS.localFile}
                onClick={handleOpenLocal}
              />
            </>
          )}

          {/* Opslaan */}
          <MenuItem
            icon={ICONS.save}
            label={STRINGS.save}
            shortcut="Ctrl+S"
            onClick={handleSave}
          />

          {/* Opslaan als */}
          <MenuItem
            icon={ICONS.saveAs}
            label={STRINGS.saveAs}
            shortcut="Ctrl+Shift+S"
            onClick={() => setSaveAsExpanded((v) => !v)}
          />
          {saveAsExpanded && (
            <>
              {isLoggedIn && (
                <SubMenuItem
                  icon={ICONS.server}
                  label={STRINGS.toServer}
                  onClick={handleSaveAsServer}
                  disabled={true} // Cloud niet geïmplementeerd
                />
              )}
              <SubMenuItem
                icon={ICONS.file}
                label={STRINGS.localExport}
                onClick={handleSaveAsLocal}
              />
            </>
          )}

          <Divider />

          {/* Sluiten */}
          <MenuItem
            icon={ICONS.close}
            label={STRINGS.close}
            onClick={handleClose}
          />

          <Divider />

          {/* Voorkeuren */}
          <MenuItem
            icon={ICONS.preferences}
            label={STRINGS.preferences}
            shortcut="Ctrl+,"
            onClick={() => actionAndClose(onOpenSettings)}
          />

          <Divider />

          {/* Over */}
          <MenuItem
            icon={ICONS.about}
            label={STRINGS.about}
            active={activePanel === "about"}
            onClick={() => setActivePanel("about")}
          />

          <Divider />

          {/* Afsluiten */}
          <MenuItem
            icon={ICONS.exit}
            label={STRINGS.exit}
            shortcut="Alt+F4"
            onClick={() => {
              onClose();
              // Web mode — no-op for exit
            }}
          />
        </div>
      </div>
      <div className="backstage-content" onClick={handleContentClick}>
        {activePanel === "about" && <AboutPanel />}
      </div>

      {/* Hidden file input for local open */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelected}
        style={{ display: "none" }}
      />
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="bs-about-panel">
      <h2 className="bs-about-title">{STRINGS.aboutPanel.title}</h2>
      <div className="bs-about-app">
        <div className="bs-about-logo">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--theme-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18M9 21V9"/>
          </svg>
        </div>
        <div className="bs-about-app-info">
          <h1 className="bs-about-app-name">CutList Optimizer</h1>
          <p className="bs-about-version">{STRINGS.aboutPanel.version} 0.1.0</p>
        </div>
      </div>
      <p className="bs-about-tagline">Zaagplan optimizer voor 1D en 2D materiaal</p>
      <p className="bs-about-description">
        Web-based tool voor het optimaliseren van zaagplannen. Ondersteunt 1D (balken, latten)
        en 2D (plaatmateriaal) optimalisatie met verschillende algoritmes.
      </p>
      <div className="bs-about-company">
        <h3 className="bs-about-company-name">OpenAEC</h3>
        <p className="bs-about-company-desc">
          Open source engineering tools voor de gebouwde omgeving.
        </p>
      </div>
      <div className="bs-about-links">
        <a href="https://open-aec.com" className="bs-about-link" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
          </svg>
          {STRINGS.aboutPanel.website}
        </a>
        <a href="https://github.com/OpenAEC-Foundation" className="bs-about-link" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
          </svg>
          {STRINGS.aboutPanel.github}
        </a>
      </div>
      <div className="bs-about-footer">
        <p className="bs-about-copyright">
          &copy; 2025 3BM Bouwkunde Cooperatie. Licensed under MIT.
        </p>
      </div>
    </div>
  );
}