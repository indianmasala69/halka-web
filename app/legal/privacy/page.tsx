'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

const heading = (level: 1 | 2 | 3) => {
  const sizes = { 1: 32, 2: 20, 3: 16 } as const;
  return {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: level === 1 ? 700 : 600,
    fontSize: sizes[level],
    color: C.navy,
    lineHeight: 1.3,
    margin: 0,
  } as React.CSSProperties;
};

const paragraph: React.CSSProperties = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 15,
  lineHeight: 1.75,
  color: C.textSecondary,
  margin: '12px 0 0',
};

const sectionStyle: React.CSSProperties = {
  marginTop: 36,
  paddingTop: 36,
  borderTop: `1px solid ${C.borderLight}`,
};

const listStyle: React.CSSProperties = {
  ...paragraph,
  paddingLeft: 20,
  margin: '12px 0 0',
};

export default function PrivacyPolicy() {
  return (
    <article>
      <header>
        <h1 style={heading(1)}>Privacy Policy</h1>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            color: C.textMuted,
            marginTop: 8,
          }}
        >
          Last updated: April 12, 2026
        </p>
      </header>

      <p style={{ ...paragraph, marginTop: 24 }}>
        Halka Health (&quot;Halka,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting
        your privacy and ensuring the security of your personal and health information. This Privacy Policy explains how
        we collect, use, share, and protect your data when you use our telehealth platform and related services
        (collectively, the &quot;Services&quot;).
      </p>
      <p style={paragraph}>
        This policy is published in compliance with the Information Technology Act, 2000, the Information Technology
        (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the
        Digital Personal Data Protection Act, 2023.
      </p>

      {/* 1. Information We Collect */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>1. Information We Collect</h2>

        <h3 style={{ ...heading(3), marginTop: 20 }}>1.1 Personal Information</h3>
        <p style={paragraph}>When you register and use our Services, we collect:</p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>Full name, date of birth, and gender</li>
          <li style={{ marginBottom: 8 }}>Email address and mobile phone number</li>
          <li style={{ marginBottom: 8 }}>Residential address (for medication delivery)</li>
          <li style={{ marginBottom: 8 }}>Government-issued identification (where required for regulatory compliance)</li>
          <li style={{ marginBottom: 8 }}>Payment and billing information</li>
        </ul>

        <h3 style={{ ...heading(3), marginTop: 20 }}>1.2 Health Data</h3>
        <p style={paragraph}>To provide our medical services, we collect sensitive health information including:</p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>Medical history, current conditions, and allergies</li>
          <li style={{ marginBottom: 8 }}>Current medications and supplements</li>
          <li style={{ marginBottom: 8 }}>Height, weight, BMI, and body measurements</li>
          <li style={{ marginBottom: 8 }}>Lab results and diagnostic reports you share with us</li>
          <li style={{ marginBottom: 8 }}>Consultation notes, treatment plans, and prescriptions</li>
          <li style={{ marginBottom: 8 }}>Progress photos (if voluntarily submitted)</li>
        </ul>

        <h3 style={{ ...heading(3), marginTop: 20 }}>1.3 Usage Data</h3>
        <p style={paragraph}>We automatically collect information about how you interact with our platform:</p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>Pages visited, features used, and time spent on the platform</li>
          <li style={{ marginBottom: 8 }}>Interaction with notifications and communications</li>
          <li style={{ marginBottom: 8 }}>Search queries and content preferences</li>
        </ul>

        <h3 style={{ ...heading(3), marginTop: 20 }}>1.4 Device Information</h3>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>Device type, operating system, and browser type</li>
          <li style={{ marginBottom: 8 }}>IP address and approximate location</li>
          <li style={{ marginBottom: 8 }}>Unique device identifiers</li>
        </ul>
      </section>

      {/* 2. How We Use Your Information */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>2. How We Use Your Information</h2>
        <p style={paragraph}>We use the information we collect for the following purposes:</p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Providing Services:</strong> To facilitate telehealth
            consultations, process prescriptions, and deliver medications
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Personalising treatment:</strong> To tailor treatment plans, dosage
            adjustments, and health recommendations to your specific needs
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Communication:</strong> To send appointment reminders, treatment
            updates, health tips, and service announcements
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Improving our platform:</strong> To analyse usage patterns, improve
            features, and enhance user experience
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Safety and compliance:</strong> To detect fraud, ensure platform
            security, and meet regulatory obligations
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Research:</strong> To conduct anonymised and aggregated health
            research to improve weight management outcomes (with your consent where required)
          </li>
        </ul>
      </section>

      {/* 3. Health Data */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>3. Health Data</h2>
        <p
          style={{
            ...paragraph,
            background: C.greenLight,
            border: `1px solid ${C.green}33`,
            borderRadius: 8,
            padding: '16px 20px',
            marginTop: 16,
          }}
        >
          <strong style={{ color: C.green }}>Your health data is treated as a special category of sensitive personal
          information</strong> and is handled with the highest level of care and security.
        </p>
        <p style={paragraph}>
          Your health data is shared only with your assigned Halka physician and the care team directly involved in your
          treatment. It is never used for advertising, marketing profiling, or sold to any third party.
        </p>
        <p style={paragraph}>
          All health data is encrypted both at rest and in transit. Access to health records is restricted to authorised
          medical personnel on a need-to-know basis, with all access logged and auditable.
        </p>
      </section>

      {/* 4. Data Sharing */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>4. Data Sharing</h2>
        <p style={paragraph}>
          We do not sell your personal or health data to third parties. We share your information only in the following
          limited circumstances:
        </p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Doctors on the platform:</strong> Your assigned physician and care
            team access your health data to provide medical services
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Payment processors:</strong> Secure payment partners process your
            transactions; they do not have access to your health data
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Delivery partners:</strong> Logistics partners receive only your
            name and delivery address to fulfil medication shipments; they do not receive health information
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Legal requirements:</strong> We may disclose information if
            required by law, court order, or regulatory authority
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>With your consent:</strong> We may share data with third parties
            when you have given explicit consent
          </li>
        </ul>
      </section>

      {/* 5. Data Security */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>5. Data Security</h2>
        <p style={paragraph}>
          We implement robust technical and organisational measures to protect your data:
        </p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Encryption:</strong> All data is encrypted at rest (AES-256) and
            in transit (TLS 1.3)
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Access controls:</strong> Role-based access ensures only authorised
            personnel can access sensitive data
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Regular audits:</strong> We conduct periodic security audits and
            vulnerability assessments
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Infrastructure:</strong> Our servers are hosted in India with
            SOC 2-compliant cloud providers
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Incident response:</strong> We maintain a documented incident
            response plan and will notify affected users within 72 hours of any data breach
          </li>
        </ul>
      </section>

      {/* 6. Data Retention */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>6. Data Retention</h2>
        <p style={paragraph}>
          We retain your personal and health data for the duration of your active account and for a period of{' '}
          <strong style={{ color: C.textPrimary }}>seven (7) years</strong> after account closure, in compliance with
          Indian medical records retention requirements and regulatory obligations.
        </p>
        <p style={paragraph}>
          Non-essential usage data and analytics are retained for up to 24 months and then anonymised or deleted. You
          may request earlier deletion of non-medical data, subject to legal and regulatory requirements.
        </p>
      </section>

      {/* 7. Your Rights */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>7. Your Rights</h2>
        <p style={paragraph}>
          Under the Digital Personal Data Protection Act, 2023, and applicable Indian law, you have the following
          rights:
        </p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Right to access:</strong> Request a copy of the personal data we
            hold about you
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Right to correction:</strong> Request correction of inaccurate or
            incomplete personal data
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Right to deletion:</strong> Request erasure of your personal data,
            subject to legal retention requirements
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Right to data portability:</strong> Receive your data in a
            structured, commonly used, and machine-readable format
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Right to withdraw consent:</strong> Withdraw consent for data
            processing at any time, subject to contractual and legal obligations
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Right to grievance redressal:</strong> Lodge a complaint with our
            Grievance Officer or the Data Protection Board of India
          </li>
        </ul>
        <p style={paragraph}>
          To exercise any of these rights, please contact us at{' '}
          <a href="mailto:privacy@halka.health" style={{ color: C.saffron, textDecoration: 'none' }}>
            privacy@halka.health
          </a>
          . We will respond to your request within 30 days.
        </p>
      </section>

      {/* 8. Cookies and Analytics */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>8. Cookies and Analytics</h2>
        <p style={paragraph}>
          We use cookies and similar technologies to enhance your experience, analyse usage, and improve our Services.
          These include:
        </p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Essential cookies:</strong> Required for platform functionality
            (authentication, security, preferences)
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Analytics cookies:</strong> Help us understand how users interact
            with our platform to improve the experience
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Performance cookies:</strong> Monitor platform performance and
            detect errors
          </li>
        </ul>
        <p style={paragraph}>
          You can manage cookie preferences through your browser settings. Disabling essential cookies may affect
          platform functionality.
        </p>
      </section>

      {/* 9. Children's Privacy */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>9. Children&apos;s Privacy</h2>
        <p style={paragraph}>
          Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal
          information from children. If we become aware that we have collected data from a person under 18, we will take
          steps to delete such information promptly.
        </p>
        <p style={paragraph}>
          If you are a parent or guardian and believe your child has provided us with personal information, please
          contact us at{' '}
          <a href="mailto:privacy@halka.health" style={{ color: C.saffron, textDecoration: 'none' }}>
            privacy@halka.health
          </a>
          .
        </p>
      </section>

      {/* 10. Changes to This Policy */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>10. Changes to This Policy</h2>
        <p style={paragraph}>
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal
          requirements, or other factors. We will notify you of material changes by email and by posting the updated
          policy on our platform with a revised &quot;Last updated&quot; date.
        </p>
        <p style={paragraph}>
          We encourage you to review this policy periodically. Your continued use of our Services after any changes
          constitutes acceptance of the updated policy.
        </p>
      </section>

      {/* 11. Contact */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>11. Contact Us</h2>
        <p style={paragraph}>
          If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please
          contact us:
        </p>
        <div
          style={{
            marginTop: 16,
            padding: '20px 24px',
            background: C.bgPrimary,
            borderRadius: 8,
            border: `1px solid ${C.border}`,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 15,
            lineHeight: 1.75,
            color: C.textSecondary,
          }}
        >
          <strong style={{ color: C.textPrimary }}>Halka Health — Privacy Team</strong>
          <br />
          Email:{' '}
          <a href="mailto:privacy@halka.health" style={{ color: C.saffron, textDecoration: 'none' }}>
            privacy@halka.health
          </a>
          <br />
          <br />
          <strong style={{ color: C.textPrimary }}>Grievance Officer</strong>
          <br />
          For grievances under the Information Technology Act, 2000, you may contact our designated Grievance Officer at{' '}
          <a href="mailto:grievance@halka.health" style={{ color: C.saffron, textDecoration: 'none' }}>
            grievance@halka.health
          </a>
          . We will acknowledge your complaint within 24 hours and resolve it within 30 days.
        </div>
      </section>
    </article>
  );
}
