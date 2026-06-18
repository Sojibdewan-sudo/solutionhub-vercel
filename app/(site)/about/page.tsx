import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us — Solution Hub',
  description: 'Solution Hub is a free IT support knowledge base helping users fix Windows, Linux, and Mac problems with step-by-step guides.',
}

export default function AboutPage() {
  return (
    <div style={{ background: '#080f1e', minHeight: '100vh' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* Hero */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ color: '#3b82f6', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>About Solution Hub</p>
          <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 20 }}>
            Your Free IT Support Knowledge Base
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.9 }}>
            Solution Hub is a free, community-focused IT support platform built to help everyday computer users solve technical problems on their own — without needing to call a technician or pay for expensive support services.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,.07)', marginBottom: '3rem' }} />

        {/* What we do */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#f1f5f9', fontSize: '1.4rem', fontWeight: 700, marginBottom: 16 }}>What We Do</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.9, marginBottom: 16 }}>
            We publish detailed, step-by-step technical guides for Windows, Linux, and macOS users. Every guide is written in plain, simple language that anyone can understand — from complete beginners to advanced users.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.9, marginBottom: 16 }}>
            Our guides cover a wide range of topics including network troubleshooting, driver issues, data recovery, system optimization, security fixes, CMD and terminal commands, software installation errors, and much more.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.9 }}>
            In addition to our guides, we maintain a curated Software Hub — a directory of the best free and open-source tools available for each operating system, with official download links, feature overviews, and installation instructions.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,.07)', marginBottom: '3rem' }} />

        {/* Our Mission */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#f1f5f9', fontSize: '1.4rem', fontWeight: 700, marginBottom: 16 }}>Our Mission</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.9, marginBottom: 16 }}>
            Our mission is simple: make IT support accessible to everyone, for free.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.9, marginBottom: 16 }}>
            Too many people struggle with computer problems every day and cannot afford professional help. Others spend hours searching through forums, watching videos, and reading incomplete answers — only to end up more confused than when they started.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.9 }}>
            Solution Hub exists to change that. We believe that clear, well-organized, and accurate technical information should be free and available to everyone — regardless of their technical background or location.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,.07)', marginBottom: '3rem' }} />

        {/* What makes us different */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#f1f5f9', fontSize: '1.4rem', fontWeight: 700, marginBottom: 16 }}>What Makes Us Different</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { title: 'Beginner-Friendly Language', desc: 'We avoid unnecessary jargon. Every guide is written so that someone with no technical background can follow along and successfully fix their problem.' },
              { title: 'Step-by-Step Structure', desc: 'Every solution is broken down into clear, numbered steps. We include screenshots, command examples, and expected results so you always know what to do next.' },
              { title: 'Multi-Platform Coverage', desc: 'We cover all three major operating systems — Windows, Linux, and macOS — so no matter what computer you use, you will find help here.' },
              { title: 'Safe Software Recommendations', desc: 'Every software we recommend links directly to the official developer website. We never host third-party downloads or link to suspicious sources.' },
              { title: 'Always Free', desc: 'Solution Hub is completely free to use. No accounts, no paywalls, no subscriptions. Just open the guide and follow the steps.' },
            ].map(item => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 10, padding: '1.25rem 1.5rem' }}>
                <h3 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,.07)', marginBottom: '3rem' }} />

        {/* Who is this for */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#f1f5f9', fontSize: '1.4rem', fontWeight: 700, marginBottom: 16 }}>Who Is Solution Hub For?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.9, marginBottom: 16 }}>
            Solution Hub is designed for anyone who uses a computer and occasionally runs into problems. You do not need to be a developer or IT professional to use our guides.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.9 }}>
            Whether you are a student, a freelancer, a small business owner, or someone who just wants to fix their own computer without paying for help — Solution Hub is built for you.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,.07)', marginBottom: '3rem' }} />

        {/* Contact CTA */}
        <div style={{ background: 'rgba(59,130,246,.07)', border: '1px solid rgba(59,130,246,.2)', borderRadius: 12, padding: '2rem' }}>
          <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.2rem', marginBottom: 12 }}>Get In Touch</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}>
            Found an error in one of our guides? Have a suggestion for a new topic? Want to collaborate or partner with us? We would love to hear from you.
          </p>
          <Link href="/contact" style={{ display: 'inline-block', background: '#3b82f6', color: '#fff', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 14 }}>
            Contact Us
          </Link>
        </div>

      </div>
    </div>
  )
}