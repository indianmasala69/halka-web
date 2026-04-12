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

export default function TermsOfService() {
  return (
    <article>
      <header>
        <h1 style={heading(1)}>Terms of Service</h1>
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
        Welcome to Halka Health (&quot;Halka,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms of
        Service (&quot;Terms&quot;) govern your access to and use of the Halka platform, including our website, mobile
        application, telehealth consultations, and related services (collectively, the &quot;Services&quot;). By
        accessing or using our Services, you agree to be bound by these Terms.
      </p>

      {/* 1. Acceptance of Terms */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>1. Acceptance of Terms</h2>
        <p style={paragraph}>
          By creating an account, accessing, or using any part of our Services, you acknowledge that you have read,
          understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms,
          you must not use our Services.
        </p>
        <p style={paragraph}>
          We reserve the right to modify these Terms at any time. We will notify you of material changes via email or
          through the platform. Your continued use of the Services after such notification constitutes acceptance of the
          updated Terms.
        </p>
      </section>

      {/* 2. Description of Services */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>2. Description of Services</h2>
        <p style={paragraph}>
          Halka is a doctor-led weight loss telehealth platform operating in India. Our Services include:
        </p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Telehealth consultations</strong> with licensed physicians
            specialising in weight management
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Personalised treatment plans</strong> including prescription
            medications where clinically appropriate
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Medication delivery</strong> of prescribed medications to your
            registered address across India
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Health coaching</strong> and ongoing support from qualified
            professionals
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Progress tracking</strong> tools and personalised health insights
          </li>
        </ul>
      </section>

      {/* 3. Eligibility */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>3. Eligibility</h2>
        <p style={paragraph}>To use our Services, you must:</p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>Be at least 18 years of age</li>
          <li style={{ marginBottom: 8 }}>Be a resident of India with a valid Indian address for medication delivery</li>
          <li style={{ marginBottom: 8 }}>Not be currently pregnant or nursing</li>
          <li style={{ marginBottom: 8 }}>
            Provide accurate and complete information during the health assessment and registration process
          </li>
          <li style={{ marginBottom: 8 }}>
            Have the legal capacity to enter into a binding agreement under Indian law
          </li>
        </ul>
        <p style={paragraph}>
          Our physicians will conduct a medical evaluation during your initial consultation. If it is determined that our
          Services are not appropriate for your medical condition, we reserve the right to decline or discontinue
          treatment.
        </p>
      </section>

      {/* 4. Account Registration */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>4. Account Registration</h2>
        <p style={paragraph}>
          You must create an account to access our Services. You agree to provide accurate, current, and complete
          information during registration and to keep your account information updated.
        </p>
        <p style={paragraph}>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities that
          occur under your account. You must notify us immediately at{' '}
          <a href="mailto:legal@halka.health" style={{ color: C.saffron, textDecoration: 'none' }}>
            legal@halka.health
          </a>{' '}
          if you become aware of any unauthorised use of your account.
        </p>
        <p style={paragraph}>
          Your account is personal and non-transferable. You may not share your account credentials with any third party
          or allow another person to use your account to access medical services.
        </p>
      </section>

      {/* 5. Medical Services Disclaimer */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>5. Medical Services Disclaimer</h2>
        <p style={paragraph}>
          Halka provides telehealth services for weight management and is <strong style={{ color: C.textPrimary }}>not
          an emergency medical service</strong>. Our Services are not intended for the diagnosis or treatment of
          emergency medical conditions.
        </p>
        <p
          style={{
            ...paragraph,
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 8,
            padding: '16px 20px',
            marginTop: 16,
          }}
        >
          <strong style={{ color: '#DC2626' }}>In case of a medical emergency, call 112 immediately or visit your
          nearest hospital emergency department.</strong> Do not rely on the Halka platform for emergency medical care.
        </p>
        <p style={paragraph}>
          The medical advice and treatment provided through our platform is based on information you provide during your
          consultations. It is your responsibility to provide complete and accurate health information. Failure to
          disclose relevant medical history may compromise the safety and effectiveness of your treatment.
        </p>
      </section>

      {/* 6. Prescription Medications */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>6. Prescription Medications</h2>
        <p style={paragraph}>
          All medications prescribed through Halka are prescribed by licensed physicians registered with the Medical
          Council of India, based on a clinical evaluation of your health profile. Prescriptions are issued at the sole
          discretion of the treating physician.
        </p>
        <p style={paragraph}>As a patient, you are responsible for:</p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>Following the prescribed dosage and administration instructions</li>
          <li style={{ marginBottom: 8 }}>Reporting any side effects or adverse reactions promptly to your Halka physician</li>
          <li style={{ marginBottom: 8 }}>Attending scheduled follow-up consultations</li>
          <li style={{ marginBottom: 8 }}>Not sharing or distributing your prescribed medication to any other person</li>
          <li style={{ marginBottom: 8 }}>Storing medications as directed on the packaging</li>
        </ul>
      </section>

      {/* 7. Payment Terms */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>7. Payment Terms</h2>
        <p style={paragraph}>
          Halka operates on a subscription-based billing model. By subscribing to our Services, you agree to the
          following:
        </p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Subscription billing:</strong> You will be charged the applicable
            subscription fee at the beginning of each billing cycle
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Auto-renewal:</strong> Your subscription will automatically renew
            at the end of each billing period unless you cancel prior to the renewal date
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Cancellation:</strong> You may cancel your subscription at any time
            through your account settings. Cancellation will take effect at the end of the current billing period
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Price changes:</strong> We may adjust pricing with 30 days&apos;
            advance notice. Continued use after a price change constitutes acceptance
          </li>
        </ul>
        <p style={paragraph}>
          All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.
        </p>
      </section>

      {/* 8. Refund Policy */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>8. Refund Policy</h2>
        <p style={paragraph}>
          We offer a <strong style={{ color: C.textPrimary }}>7-day money-back guarantee</strong> from the date of your
          initial subscription purchase. If you are not satisfied with our Services within the first 7 days, you may
          request a full refund by contacting{' '}
          <a href="mailto:legal@halka.health" style={{ color: C.saffron, textDecoration: 'none' }}>
            legal@halka.health
          </a>
          .
        </p>
        <p style={paragraph}>Please note the following exceptions:</p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>
            Medications that have been opened, used, or where the seal has been broken are not eligible for refunds
          </li>
          <li style={{ marginBottom: 8 }}>
            Refund requests made after the 7-day period will be evaluated on a case-by-case basis
          </li>
          <li style={{ marginBottom: 8 }}>
            Consultation fees for completed appointments are non-refundable
          </li>
        </ul>
      </section>

      {/* 9. Privacy */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>9. Privacy</h2>
        <p style={paragraph}>
          Your privacy is important to us. Our collection, use, and protection of your personal and health data is
          governed by our{' '}
          <a href="/legal/privacy" style={{ color: C.saffron, textDecoration: 'none' }}>
            Privacy Policy
          </a>
          , which forms an integral part of these Terms. By using our Services, you consent to the data practices
          described in our Privacy Policy.
        </p>
      </section>

      {/* 10. Intellectual Property */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>10. Intellectual Property</h2>
        <p style={paragraph}>
          All content, features, and functionality of the Halka platform — including but not limited to text, graphics,
          logos, icons, images, software, and the overall design — are the exclusive property of Halka Health and are
          protected by Indian and international intellectual property laws.
        </p>
        <p style={paragraph}>
          You may not reproduce, distribute, modify, create derivative works from, publicly display, or otherwise
          exploit any content from our platform without our prior written consent.
        </p>
      </section>

      {/* 11. Limitation of Liability */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>11. Limitation of Liability</h2>
        <p style={paragraph}>
          To the maximum extent permitted by applicable Indian law, Halka Health, its directors, employees, and
          affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages
          arising from or related to your use of our Services.
        </p>
        <p style={paragraph}>
          Our total aggregate liability for any claims arising from these Terms or your use of the Services shall not
          exceed the amount you have paid to Halka in the twelve (12) months preceding the claim.
        </p>
        <p style={paragraph}>
          Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud,
          or any liability that cannot be excluded under applicable Indian law.
        </p>
      </section>

      {/* 12. Governing Law */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>12. Governing Law and Dispute Resolution</h2>
        <p style={paragraph}>
          These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out
          of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of New
          Delhi, India.
        </p>
        <p style={paragraph}>
          Before initiating any legal proceedings, the parties agree to attempt to resolve disputes through good-faith
          negotiation for a period of 30 days. If the dispute is not resolved through negotiation, either party may
          pursue mediation or arbitration in accordance with the Arbitration and Conciliation Act, 1996.
        </p>
      </section>

      {/* 13. Contact Information */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>13. Contact Information</h2>
        <p style={paragraph}>
          If you have any questions about these Terms, please contact us:
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
          <strong style={{ color: C.textPrimary }}>Halka Health</strong>
          <br />
          Email:{' '}
          <a href="mailto:legal@halka.health" style={{ color: C.saffron, textDecoration: 'none' }}>
            legal@halka.health
          </a>
        </div>
      </section>
    </article>
  );
}
