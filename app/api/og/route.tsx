import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
export const runtime = 'edge'
export function GET(req: NextRequest) {
  const title = new URL(req.url).searchParams.get('title') || 'Solution Hub'
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%', height: '100%', padding: 60, background: 'linear-gradient(135deg,#080f1e,#0f1e3a)' }}>
      <div style={{ fontSize: title.length > 60 ? 38 : 52, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.2, marginBottom: 24 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#3b82f6' }}>Solution Hub</div>
    </div>,
    { width: 1200, height: 630 }
  )
}
