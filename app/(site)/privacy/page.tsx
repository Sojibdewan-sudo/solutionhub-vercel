import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Solution Hub',
  description: 'Read the Solution Hub privacy policy to understand how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div style={{ background: '#080f1e', minHeight: '100vh' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '4rem 1.5rem' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ color: '#3b82f6', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>Legal</p>
          <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 800, marginBottom: 12 }}>Privacy Policy</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Last updated: June 2025</p>
        </div>

        <p style={{ color: '#94a3b8', lineHeight: 1.9, marginBottom: '3rem' }}>
          At Solution Hub, we are committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have regarding your data. By using Solution Hub, you agree to the practices described in this policy.
        </p>

        {[
          {
            title: '1. Information We Collect',
            content: [
              'Solution Hub does not require you to create an account or provide any personal information to use the website. You can browse all guides and software listings freely without registering.',
              'We may collect the following types of non-personal data automatically when you visit our website:',
              '— Pages visited and time spent on each page\n— Browser type and version\n— Device type (desktop, mobile, tablet)\n— Country or region (general location, not precise)\n— Referring website (how you found us)',
              'This data is collected in aggregate form and cannot be used to identify you personally.',
            ],
          },
          {
            title: '2. How We Use Your Information',
            content: [
              'The anonymous usage data we collect is used solely to improve Solution Hub. Specifically, we use it to:',
              '— Understand which guides and pages are most helpful to our users\n— Identify technical issues with the website\n— Improve site navigation and content structure\n— Prioritize new content based on what users are searching for',
              'We do not use your data for advertising, profiling, or any commercial purpose.',
            ],
          },
          {
            title: '3. Cookies',
            content: [
              'Solution Hub uses a minimal number of cookies. Specifically:',
              '— Theme preference cookie: We store your chosen theme (dark or light mode) in a cookie so your preference is remembered on your next visit. This cookie contains no personal information.',
              '— Analytics cookies: If analytics are enabled, we may use cookies to track anonymous usage statistics. These cookies do not store any personally identifiable information.',
              'You can disable cookies at any time through your browser settings. Disabling cookies will not affect your ability to read guides or use any features of Solution Hub.',
            ],
          },
          {
            title: '4. Third-Party Services',
            content: [
              'Solution Hub may use the following third-party services:',
              '— Google Analytics or similar: To collect anonymous usage statistics.\n— Google Translate: To provide language translation functionality. This service is provided by Google and subject to Google\'s Privacy Policy.\n— Vercel: Our hosting provider. Vercel may collect server logs and performance data as part of its infrastructure services.',
              'We do not sell or share your data with any third-party advertisers.',
            ],
          },
          {
            title: '5. External Links and Software Downloads',
            content: [
              'Solution Hub contains links to third-party websites, particularly for software downloads. All software download links point to the official website of the software developer.',
              'We are not responsible for the privacy practices, content, or security of any third-party websites. We strongly recommend reviewing the privacy policy of any external website you visit.',
              'Always verify that you are downloading software from the official developer website before proceeding with any installation.',
            ],
          },
          {
            title: '6. Contact Forms and Email',
            content: [
              'If you contact us via email or through our contact page, we will use the information you provide (such as your email address and message) solely to respond to your inquiry.',
              'We do not add you to any mailing lists, share your contact information with third parties, or use it for any purpose other than responding to your message.',
            ],
          },
          {
            title: '7. Children\'s Privacy',
            content: [
              'Solution Hub does not knowingly collect any information from children under the age of 13. Our content is general IT support information intended for all users. If you believe a child has provided us with personal information, please contact us and we will take immediate steps to remove it.',
            ],
          },
          {
            title: '8. Data Security',
            content: [
              'We take reasonable technical measures to protect the security of our website and any information transmitted through it. However, no method of transmission over the internet or electronic storage is 100% secure.',
              'We do not store sensitive personal information such as passwords, payment details, or government identification numbers.',
            ],
          },
          {
            title: '9. Changes to This Policy',
            content: [
              'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. When we make changes, we will update the "Last updated" date at the top of this page.',
              'We encourage you to review this page periodically. Your continued use of Solution Hub after any changes constitutes your acceptance of the updated policy.',
            ],
          },
          {
            title: '10. Contact Us',
            content: [
              'If you have any questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please contact us at:',
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