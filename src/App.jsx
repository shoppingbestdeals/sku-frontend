import { useState } from 'react'

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const search = async () => {
    if (!query) return
    setLoading(true)
    try {
      const res = await fetch(`https://YOUR-BACKEND.onrender.com/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data)
    } catch (err) {
      console.error('Search error:', err)
      alert('Failed to fetch search results.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🔍 SKU Search</h1>
      <input
        type="text"
        placeholder="Enter SKU or keyword"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '300px', marginRight: '0.5rem' }}
      />
      <button onClick={search} style={{ padding: '0.5rem 1rem' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {results.length > 0 && (
        <table style={{ marginTop: '1.5rem', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>SKU</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Reseller</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>{item.sku}</td>
                <td style={tdStyle}>{item.description}</td>
                <td style={tdStyle}>${Number(item.price).toFixed(2)}</td>
                <td style={tdStyle}>{item.reseller}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {results.length === 0 && !loading && query && <p>No results found.</p>}
    </div>
  )
}

const thStyle = { border: '1px solid #ccc', padding: '0.5rem', background: '#f9f9f9' }
const tdStyle = { border: '1px solid #ccc', padding: '0.5rem' }

export default App
