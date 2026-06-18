import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions — Solution Hub',
  description: 'Read the Solution Hub terms and conditions of use.',
}

export default function TermsPage() {
  return (
    <div style={{ background: '#080f1e', minHeight: '100vh' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '4rem 1.5rem' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ color: '#3b82f6', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>Legal</p>
          <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 800, marginBottom: 12 }}>Terms &amp; Conditions</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Last updated: June 2025</p>
        </div>

        <p style={{ color: '#94a3b8', lineHeight: 1.9, marginBottom: '3rem' }}>
          Please read these Terms and Conditions carefully before using Solution Hub. By accessing or using our website, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our website.
        </p>

        {[
          {
            title: '1. Acceptance of Terms',
            content: [
              'By accessing Solution Hub at solutionhub.aivoro.site, you confirm that you are at least 13 years of age and that you agree to comply with and be bound by these Terms and Conditions.',
              'We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the revised terms.',
            ],
          },
          {
            title: '2. Nature of Content',
            content: [
              'Solution Hub provides IT support guides, tutorials, and software recommendations for informational purposes only. All content published on this website is created with the intent to be accurate and helpful.',
              'However, technology changes rapidly, and software behavior may vary depending on your specific system configuration, operating system version, installed programs, and other factors. As a result, we cannot guarantee that every guide will work perfectly in every situation.',
            ],
          },
          {
            title: '3. No Warranty',
            content: [
              'Solution Hub is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied.',
              'We do not warrant that:',
              '— The information on this website is always accurate, complete, or up to date\n— The website will be available at all times without interruption\n— The guides will produce the same results on every system\n— Following our guides will resolve your specific issue',
              'You use all guides, commands, and software recommendations at your own risk.',
            ],
          },
          {
            title: '4. Limitation of Liability',
            content: [
              'To the fullest extent permitted by applicable law, Solution Hub and its authors, contributors, and operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:',
              '— Your use of or inability to use this website\n— Any errors or omissions in the content\n— Data loss resulting from following a guide\n— System damage caused by software downloaded based on our recommendations\n— Any action taken or not taken based on information found on this website',
              'This limitation of liability applies regardless of whether the damages were foreseeable or whether we were advised of the possibility of such damages.',
            ],
          },
          {
            title: '5. User Responsibilities',
            content: [
              'By using Solution Hub, you agree to:',
              '— Always create a backup of important data before following any system-level guide\n— Verify that any commands or steps are appropriate for your specific operating system version\n— Use your own judgment when following technical guides\n— Not use any information from this website for illegal or harmful purposes',
              'We strongly recommend creating a system restore point or full backup before making significant changes to your operating system.',
            ],
          },
          {
            title: '6. Software Downloads',
            content: [
              'Solution Hub does not host, distribute, or provide any software files for download. All software links on this website point directly to the official website of the software developer or publisher.',
              'We are not responsible for:',
              '— The content, safety, or functionality of any software you download\n— Changes made by software developers to their products after our guide was written\n— Any damages caused by software downloaded through links on our website',
              'Always verify the authenticity of any download by checking that you are on the official developer website before downloading.',
            ],
          },
          {
            title: '7. Intellectual Property',
            content: [
              'All original content on Solution Hub — including written guides, page design, and structure — is the intellectual property of Solution Hub.',
              'You may:',
              '— Read and follow our guides for personal use\n— Share links to our guides on social media or other platforms\n— Quote short sections of our content with proper attribution and a link back to the original page',
              'You may not:',
              '— Copy and republish our guides or significant portions of our content on another website\n— Scrape our content for commercial purposes\n— Present our content as your own work',
            ],
          },
          {
            title: '8. Third-Party Links',
            content: [
              'Solution Hub contains links to external websites, including software download pages and reference materials. These links are provided for your convenience.',
              'We have no control over the content, availability, or privacy practices of third-party websites. A link to an external website does not constitute an endorsement of that website or its content.',
              'We are not responsible for any damages or losses resulting from your interaction with third-party websites.',
            ],
          },
          {
            title: '9. Governing Law',
            content: [
              'These Terms and Conditions shall be governed by and construed in accordance with applicable laws. Any disputes arising from your use of Solution Hub shall be subject to the exclusive jurisdiction of the relevant courts.',
            ],
          },
          {
            title: '10. Contact Us',
            content: [
              'If you have any questions about these Terms and Conditions, please contact us at:',
              'Email: contact@solutionhub.com',
            ],
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
            <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.15rem', marginBottom: 16 }}>{section.title}</h2>
            {section.content.map((para, j) => (
              <p key={j} style={{ color: '#94a3b8', lineHeight: 1.9, marginBottom: 12, whiteSpace: 'pre-line' }}>{para}</p>
            ))}
          </div>
        ))}

      </div>
    </div>
  )
}