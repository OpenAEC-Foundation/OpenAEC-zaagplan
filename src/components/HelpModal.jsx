/**
 * HelpModal Component
 * Documentatie en help voor Zaagplan Optimizer
 * OpenAEC Dark Theme met amber accent
 */
import { useState } from 'react'

export default function HelpModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('gebruik')

  if (!isOpen) return null

  const tabs = [
    { id: 'gebruik', label: 'Gebruik' },
    { id: 'algoritmes', label: 'Algoritmes' },
    { id: 'libraries', label: 'Libraries' },
    { id: 'tips', label: 'Tips' },
    { id: 'credits', label: 'Credits' },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-oaec-bg-lighter rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden" style={{ border: '1px solid rgba(217, 119, 6, 0.2)' }}>
        {/* Header */}
        <div className="bg-oaec-bg px-6 py-4 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(217, 119, 6, 0.15)' }}>
          <div>
            <h2 className="text-xl font-bold text-oaec-text">Zaagplan Optimizer</h2>
            <p className="text-oaec-accent text-sm font-medium">Versie 2.0 - OpenAEC</p>
          </div>
          <button
            onClick={onClose}
            className="text-oaec-text-muted hover:text-oaec-accent text-2xl transition-colors"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-oaec-bg" style={{ borderBottom: '1px solid rgba(217, 119, 6, 0.15)' }}>
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-3 px-6 text-sm font-medium border-b-2 transition-colors
                  ${activeTab === tab.id
                    ? 'border-oaec-accent text-oaec-accent'
                    : 'border-transparent text-oaec-text-muted hover:text-oaec-text hover:border-oaec-accent/50'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'gebruik' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-oaec-text">Basisgebruik</h3>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.05)', borderLeft: '4px solid #D97706' }}>
                <h4 className="font-medium text-oaec-text mb-2">1. Modus kiezen</h4>
                <p className="text-oaec-text-secondary">
                  <strong>1D (Latten/Balken):</strong> Voor lineaire materialen zoals KVH balken, stalen profielen, buizen.
                  <br />
                  <strong>2D (Platen):</strong> Voor plaatmateriaal zoals multiplex, MDF, staalplaat.
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.05)', borderLeft: '4px solid #D97706' }}>
                <h4 className="font-medium text-oaec-text mb-2">2. Voorraad invoeren</h4>
                <p className="text-oaec-text-secondary">
                  Voer de beschikbare voorraadmaten in met aantallen. Je kunt meerdere maten opgeven
                  (bijv. 4000mm en 3000mm latten). Gebruik -1 voor onbeperkte voorraad.
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.05)', borderLeft: '4px solid #D97706' }}>
                <h4 className="font-medium text-oaec-text mb-2">3. Onderdelen invoeren</h4>
                <p className="text-oaec-text-secondary">
                  Voer de te zagen onderdelen in met lengte (en breedte voor 2D) en aantal.
                  Je kunt ook CSV importeren vanuit Excel of Revit.
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.05)', borderLeft: '4px solid #D97706' }}>
                <h4 className="font-medium text-oaec-text mb-2">4. Optimaliseren</h4>
                <p className="text-oaec-text-secondary">
                  Klik op <strong>Optimaliseren</strong>. Het gekozen algoritme berekent het optimale zaagplan
                  met minimaal materiaalverlies.
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.05)', borderLeft: '4px solid #D97706' }}>
                <h4 className="font-medium text-oaec-text mb-2">5. Bewerken (optioneel)</h4>
                <p className="text-oaec-text-secondary">
                  In <strong>Edit Mode</strong> kun je onderdelen handmatig verslepen tussen platen/latten.
                  Gebruik de parkeerplaats voor tijdelijke opslag. Wijzigingen kun je opslaan.
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.05)', borderLeft: '4px solid #D97706' }}>
                <h4 className="font-medium text-oaec-text mb-2">6. Exporteren</h4>
                <p className="text-oaec-text-secondary">
                  Exporteer het zaagplan naar PDF voor in de werkplaats, of naar CSV voor verdere verwerking.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'algoritmes' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-oaec-text">Beschikbare Algoritmes</h3>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.05)', borderLeft: '4px solid #D97706' }}>
                <h4 className="font-medium text-oaec-accent">1D Algoritmes</h4>
                <div className="mt-2 space-y-3">
                  <div>
                    <strong className="text-oaec-text">Hybrid (Aanbevolen)</strong>
                    <p className="text-oaec-text-secondary text-sm">
                      Onze eigen aanpak: grote stukken eerst op langste voorraad,
                      kleine stukken optimaal in reststukken. Goede balans tussen snelheid en resultaat.
                    </p>
                  </div>
                  <div>
                    <strong className="text-oaec-text">Smart Split</strong>
                    <p className="text-oaec-text-secondary text-sm">
                      Voor onderdelen langer dan voorraad. Splitst automatisch in delen met
                      configureerbare overlap (joint allowance) voor verbindingen.
                    </p>
                  </div>
                  <div>
                    <strong className="text-oaec-text">OR-Tools Optimaal</strong>
                    <p className="text-oaec-text-secondary text-sm">
                      Exacte oplossing via Google's OR-Tools Column Generation algoritme.
                      Beste resultaat, maar kan langzamer zijn bij veel onderdelen.
                      <span className="text-oaec-danger font-medium"> Vereist backend server.</span>
                    </p>
                  </div>
                  <div>
                    <strong className="text-oaec-text">First Fit Decreasing (FFD)</strong>
                    <p className="text-oaec-text-secondary text-sm">
                      Klassieke greedy heuristiek. Plaatst grootste stukken eerst.
                      Zeer snel, maar ~15-20% minder optimaal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(96, 165, 250, 0.05)', borderLeft: '4px solid #60A5FA' }}>
                <h4 className="font-medium text-oaec-info">2D Algoritmes</h4>
                <div className="mt-2 space-y-3">
                  <div>
                    <strong className="text-oaec-text">MaxRects Packer</strong>
                    <p className="text-oaec-text-secondary text-sm">
                      Rechthoek bin-packing algoritme. Snel en geschikt voor standaard rechthoekige onderdelen.
                    </p>
                  </div>
                  <div>
                    <strong className="text-oaec-text">MaxRects Multi-Start</strong>
                    <p className="text-oaec-text-secondary text-sm">
                      Voert meerdere optimalisaties uit met verschillende volgorde van onderdelen.
                      Bewaart beste resultaat. Langzamer maar beter resultaat.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '4px solid #F59E0B' }}>
                <h4 className="font-medium text-oaec-warning">Voorraad Constraints</h4>
                <p className="text-oaec-text-secondary text-sm mt-1">
                  Alle algoritmes respecteren de opgegeven voorraad aantallen. Als een stock type
                  op is, wordt automatisch naar de volgende geschikte maat gezocht.
                  Gebruik -1 voor onbeperkte voorraad.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'libraries' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-oaec-text">Gebruikte Libraries</h3>

              <p className="text-oaec-text-secondary">
                De Zaagplan Optimizer maakt gebruik van de volgende open-source libraries:
              </p>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.05)', border: '1px solid rgba(217, 119, 6, 0.15)' }}>
                <h4 className="font-medium text-oaec-accent mb-3">Frontend</h4>
                <table className="w-full text-sm">
                  <tbody className="divide-y" style={{ borderColor: 'rgba(217, 119, 6, 0.1)' }}>
                    <tr>
                      <td className="py-2 font-medium text-oaec-text">React 18</td>
                      <td className="py-2 text-oaec-text-secondary">UI framework</td>
                      <td className="py-2 text-oaec-accent font-medium">MIT</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-oaec-text">Vite</td>
                      <td className="py-2 text-oaec-text-secondary">Build tool & dev server</td>
                      <td className="py-2 text-oaec-accent font-medium">MIT</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-oaec-text">Tailwind CSS</td>
                      <td className="py-2 text-oaec-text-secondary">Styling framework</td>
                      <td className="py-2 text-oaec-accent font-medium">MIT</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-oaec-text">maxrects-packer</td>
                      <td className="py-2 text-oaec-text-secondary">2D bin packing (rechthoeken)</td>
                      <td className="py-2 text-oaec-accent font-medium">MIT</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-oaec-text">jsPDF</td>
                      <td className="py-2 text-oaec-text-secondary">PDF generatie</td>
                      <td className="py-2 text-oaec-accent font-medium">MIT</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(96, 165, 250, 0.05)', border: '1px solid rgba(96, 165, 250, 0.15)' }}>
                <h4 className="font-medium text-oaec-info mb-3">Backend (Python)</h4>
                <table className="w-full text-sm">
                  <tbody className="divide-y" style={{ borderColor: 'rgba(96, 165, 250, 0.1)' }}>
                    <tr>
                      <td className="py-2 font-medium text-oaec-text">FastAPI</td>
                      <td className="py-2 text-oaec-text-secondary">REST API framework</td>
                      <td className="py-2 text-oaec-accent font-medium">MIT</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-oaec-text">Google OR-Tools</td>
                      <td className="py-2 text-oaec-text-secondary">Optimalisatie solver (Column Generation)</td>
                      <td className="py-2 text-oaec-accent font-medium">Apache 2.0</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-oaec-text">Uvicorn</td>
                      <td className="py-2 text-oaec-text-secondary">ASGI server</td>
                      <td className="py-2 text-oaec-accent font-medium">BSD</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-oaec-text">Pydantic</td>
                      <td className="py-2 text-oaec-text-secondary">Data validatie</td>
                      <td className="py-2 text-oaec-accent font-medium">MIT</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-oaec-bg rounded text-sm text-oaec-text-secondary" style={{ border: '1px solid rgba(217, 119, 6, 0.1)' }}>
                De optimalisatie-algoritmes zijn gebaseerd op wetenschappelijk onderzoek
                naar het "Cutting Stock Problem" (Gilmore & Gomory, 1961).
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-oaec-text">Tips voor Optimaal Resultaat</h3>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '4px solid #F59E0B' }}>
                <h4 className="font-medium text-oaec-warning">Meerdere voorraadmaten</h4>
                <p className="text-oaec-text-secondary text-sm mt-1">
                  Voeg verschillende voorraadmaten toe (bijv. 4000mm, 3000mm, 2400mm).
                  Het algoritme kiest automatisch de meest efficiente combinatie.
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '4px solid #F59E0B' }}>
                <h4 className="font-medium text-oaec-warning">Kerf instelling</h4>
                <p className="text-oaec-text-secondary text-sm mt-1">
                  Stel de juiste zaagsnede breedte in (meestal 3-4mm voor cirkelzaag).
                  Dit voorkomt dat stukken niet passen in de praktijk.
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '4px solid #F59E0B' }}>
                <h4 className="font-medium text-oaec-warning">Probeer meerdere algoritmes</h4>
                <p className="text-oaec-text-secondary text-sm mt-1">
                  Verschillende algoritmes kunnen verschillende resultaten geven.
                  Probeer er meerdere en vergelijk het afvalpercentage.
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '4px solid #F59E0B' }}>
                <h4 className="font-medium text-oaec-warning">Edit mode voor finetuning</h4>
                <p className="text-oaec-text-secondary text-sm mt-1">
                  Na optimalisatie kun je handmatig stukken verslepen.
                  Soms zie je als mens optimalisaties die het algoritme mist.
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '4px solid #F59E0B' }}>
                <h4 className="font-medium text-oaec-warning">CSV import voor grote projecten</h4>
                <p className="text-oaec-text-secondary text-sm mt-1">
                  Exporteer je onderdelenlijst vanuit Excel/Revit naar CSV.
                  Kolommen: id/name, length, width (2D), quantity.
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '4px solid #F59E0B' }}>
                <h4 className="font-medium text-oaec-warning">Kleuren per onderdeelgroep</h4>
                <p className="text-oaec-text-secondary text-sm mt-1">
                  Gesplitste onderdelen krijgen automatisch dezelfde kleur.
                  Dit maakt het makkelijk om gerelateerde stukken te herkennen.
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(248, 113, 113, 0.08)', borderLeft: '4px solid #f87171' }}>
                <h4 className="font-medium text-oaec-danger">Te lange onderdelen</h4>
                <p className="text-oaec-text-secondary text-sm mt-1">
                  Onderdelen die langer zijn dan de langste voorraad worden
                  automatisch gemarkeerd. Gebruik "Smart Split" om deze automatisch te splitsen.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'credits' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-oaec-text">Credits & Licentie</h3>

              <div className="bg-oaec-bg p-6 rounded-lg" style={{ border: '1px solid rgba(217, 119, 6, 0.2)' }}>
                <h4 className="font-bold text-lg mb-3 text-oaec-accent">Zaagplan Optimizer</h4>
                <p className="text-oaec-text-secondary mb-4">
                  Een open-source tool voor het optimaliseren van zaagplannen,
                  ontwikkeld voor de bouw- en maakindustrie.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.05)', border: '1px solid rgba(217, 119, 6, 0.15)' }}>
                    <span className="text-2xl">&#x1F468;&#x200D;&#x1F4BB;</span>
                    <div>
                      <strong className="text-oaec-accent">Jochem Bosman</strong>
                      <p className="text-oaec-text-secondary text-sm">Concept, Architectuur & Product Owner</p>
                      <p className="text-oaec-accent text-xs font-medium">OpenAEC</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.05)', border: '1px solid rgba(217, 119, 6, 0.15)' }}>
                    <span className="text-2xl">&#x1F916;</span>
                    <div>
                      <strong className="text-oaec-accent">Claude (Anthropic)</strong>
                      <p className="text-oaec-text-secondary text-sm">AI Development Partner</p>
                      <p className="text-oaec-accent text-xs font-medium">Code, Algoritmes & Documentatie</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.05)', borderLeft: '4px solid #D97706' }}>
                <h4 className="font-medium text-oaec-text mb-2">Open Source</h4>
                <p className="text-oaec-text-secondary text-sm">
                  Deze tool is open-source en vrij te gebruiken.
                  De broncode is beschikbaar voor educatieve en commerciele doeleinden.
                </p>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.05)', borderLeft: '4px solid #D97706' }}>
                <h4 className="font-medium text-oaec-text mb-2">Technologie Stack</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-oaec-accent text-oaec-bg rounded text-xs font-medium">React</span>
                  <span className="px-2 py-1 bg-oaec-info text-oaec-bg rounded text-xs font-medium">Tailwind CSS</span>
                  <span className="px-2 py-1 bg-oaec-accent text-oaec-bg rounded text-xs font-medium">Vite</span>
                  <span className="px-2 py-1 bg-oaec-info text-oaec-bg rounded text-xs font-medium">FastAPI</span>
                  <span className="px-2 py-1 bg-oaec-warning text-oaec-bg rounded text-xs font-medium">OR-Tools</span>
                  <span className="px-2 py-1 bg-oaec-danger text-oaec-bg rounded text-xs font-medium">Docker</span>
                </div>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'rgba(217, 119, 6, 0.08)', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
                <h4 className="font-medium text-oaec-accent mb-2">OpenAEC</h4>
                <p className="text-oaec-text-secondary text-sm">
                  OpenAEC ontwikkelt open-source tools voor de AEC-industrie
                  (Architecture, Engineering & Construction).
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-oaec-bg px-6 py-3 flex justify-between items-center" style={{ borderTop: '1px solid rgba(217, 119, 6, 0.15)' }}>
          <span className="text-sm text-oaec-text-muted">
            &copy; 2025 <span className="text-oaec-accent font-medium">OpenAEC</span> - Open Source Tools voor AEC
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-oaec-accent text-oaec-bg rounded hover:bg-oaec-accent-hover transition-colors font-medium"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  )
}
