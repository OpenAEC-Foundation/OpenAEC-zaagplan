/**
 * PartsTable Component
 * Toont stuklijst tabel gegroepeerd per plaat/balk
 */
export default function PartsTable({ mode, results, selectedSheet }) {
  if (!results || results.sheets.length === 0) {
    return null
  }

  const sheet = results.sheets[selectedSheet] || results.sheets[0]

  return (
    <div className="bg-oaec-bg-lighter" style={{ borderTop: '1px solid rgba(217, 119, 6, 0.15)' }}>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-oaec-accent mb-3 flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6"/>
            <line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/>
            <line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          Stuklijst - {sheet.name}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-oaec-bg text-left">
                <th className="px-3 py-2 font-semibold text-oaec-text-muted w-12">Nr.</th>
                <th className="px-3 py-2 font-semibold text-oaec-text-muted">Onderdeel</th>
                <th className="px-3 py-2 font-semibold text-oaec-text-muted text-right">Lengte (mm)</th>
                {mode === '2d' && (
                  <th className="px-3 py-2 font-semibold text-oaec-text-muted text-right">Breedte (mm)</th>
                )}
                {mode === '2d' && (
                  <th className="px-3 py-2 font-semibold text-oaec-text-muted text-center">Nerf</th>
                )}
                <th className="px-3 py-2 font-semibold text-oaec-text-muted text-right">Positie</th>
              </tr>
            </thead>
            <tbody>
              {sheet.parts.map((part, index) => (
                <tr
                  key={index}
                  className={`hover:bg-oaec-accent/5 transition-colors ${
                    index % 2 === 0 ? 'bg-oaec-bg-lighter' : 'bg-oaec-bg'
                  }`}
                  style={{ borderBottom: '1px solid rgba(217, 119, 6, 0.1)' }}
                >
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-oaec-bg bg-oaec-accent rounded-full">
                      {part.number}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-medium text-oaec-text">
                    {part.name}
                  </td>
                  <td className="px-3 py-2 text-oaec-text-secondary text-right font-mono">
                    {part.length}
                  </td>
                  {mode === '2d' && (
                    <td className="px-3 py-2 text-oaec-text-secondary text-right font-mono">
                      {part.width}
                    </td>
                  )}
                  {mode === '2d' && (
                    <td className="px-3 py-2 text-center">
                      {part.grain ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded" style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#D97706' }}>
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  )}
                  <td className="px-3 py-2 text-oaec-text-muted text-right text-xs font-mono">
                    {mode === '2d'
                      ? `(${part.x}, ${part.y})`
                      : `${part.x} mm`
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totalen */}
        <div className="mt-4 pt-4 flex items-center justify-between text-sm" style={{ borderTop: '1px solid rgba(217, 119, 6, 0.15)' }}>
          <div className="flex items-center gap-6">
            <div>
              <span className="text-oaec-text-muted">Totaal stukken:</span>
              <span className="ml-2 font-semibold text-oaec-accent">{sheet.parts.length}</span>
            </div>
            <div>
              <span className="text-oaec-text-muted">Benutting:</span>
              <span className={`ml-2 font-semibold ${
                sheet.efficiency >= 80
                  ? 'text-oaec-success'
                  : sheet.efficiency >= 60
                    ? 'text-oaec-warning'
                    : 'text-oaec-danger'
              }`}>
                {sheet.efficiency.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="text-oaec-text-muted text-xs">
            Restmateriaal: {(100 - sheet.efficiency).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  )
}
