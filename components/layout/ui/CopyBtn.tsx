'use client'

export function CopyBtn({ text }: { text: string }) {
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text)
      }}
      style={{
        background: 'rgba(255,255,255,.08)',
        border: 'none',
        borderRadius: 6,
        padding: '4px 10px',
        color: '#94a3b8',
        fontSize: 12,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      Copy
    </button>
  )
}