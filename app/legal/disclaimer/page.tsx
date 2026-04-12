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

export default function MedicalDisclaimer() {
  return (
    <article>
      <header>
        <h1 style={heading(1)}>Medical Disclaimer</h1>
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

      <p
        style={{
          ...paragraph,
          marginTop: 24,
          background: '#FEF2F2',
          border: '1px solid #FECACA',
          borderRadius: 8,
          padding: '16px 20px',
        }}
      >
        <strong style={{ color: '#DC2626' }}>
          Please read this Medical Disclaimer carefully before using the Halka Health platform. By using our Services,
          you acknowledge that you have read and understood this disclaimer.
        </strong>
      </p>

      {/* 1. Not Emergency Services */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>1. Not Emergency Services</h2>
        <p style={paragraph}>
          Halka Health is a telehealth platform for weight management and is{' '}
          <strong style={{ color: C.textPrimary }}>not an emergency medical service</strong>. Our platform is not
          designed to handle life-threatening conditions, acute medical emergencies, or situations requiring immediate
          in-person medical attention.
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
          <strong style={{ color: '#DC2626' }}>
            If you are experiencing a medical emergency, call 112 immediately or visit the nearest hospital emergency
            department. Do not use the Halka platform to seek emergency care.
          </strong>
        </p>
      </section>

      {/* 2. Telehealth Limitations */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>2. Telehealth Limitations</h2>
        <p style={paragraph}>
          While telehealth consultations offer significant convenience and accessibility, they have inherent limitations
          compared to in-person medical examinations. Telehealth consultations:
        </p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>
            Do not involve a physical examination, which may be necessary for certain diagnoses
          </li>
          <li style={{ marginBottom: 8 }}>
            Rely on the accuracy and completeness of information you provide
          </li>
          <li style={{ marginBottom: 8 }}>
            May not be suitable for all medical conditions or situations
          </li>
          <li style={{ marginBottom: 8 }}>
            Are dependent on stable internet connectivity and may be affected by technical issues
          </li>
        </ul>
        <p style={paragraph}>
          Your Halka physician may recommend that you seek an in-person examination with a local healthcare provider
          when clinically necessary. You should follow such recommendations promptly.
        </p>
      </section>

      {/* 3. Medication Risks */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>3. Medication Risks</h2>
        <p style={paragraph}>
          All medications prescribed through the Halka platform carry potential risks and side effects. Before
          prescribing any medication, your Halka physician will:
        </p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>Review your medical history and current health status</li>
          <li style={{ marginBottom: 8 }}>Explain the benefits, risks, and potential side effects of the medication</li>
          <li style={{ marginBottom: 8 }}>Discuss alternative treatment options where appropriate</li>
          <li style={{ marginBottom: 8 }}>Obtain your informed consent before issuing a prescription</li>
        </ul>
        <p style={paragraph}>
          Common side effects of weight loss medications may include nausea, gastrointestinal discomfort, headache, and
          changes in appetite. Serious side effects, though rare, may occur. You must report any adverse reactions to
          your Halka physician immediately.
        </p>
      </section>

      {/* 4. Individual Results */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>4. Individual Results</h2>
        <p style={paragraph}>
          Weight loss results vary significantly from person to person and depend on numerous factors including genetics,
          adherence to the treatment plan, diet, physical activity, metabolic rate, and overall health.
        </p>
        <p
          style={{
            ...paragraph,
            background: C.saffronLight,
            border: `1px solid ${C.saffron}33`,
            borderRadius: 8,
            padding: '16px 20px',
            marginTop: 16,
          }}
        >
          <strong style={{ color: C.saffronDark }}>
            Halka Health does not guarantee any specific weight loss results. Any testimonials, case studies, or success
            stories shared on our platform represent individual experiences and are not indicative of typical results.
          </strong>
        </p>
      </section>

      {/* 5. Professional Medical Advice */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>5. Professional Medical Advice</h2>
        <p style={paragraph}>
          Information provided on the Halka website, blog, social media channels, and marketing materials is intended
          for{' '}
          <strong style={{ color: C.textPrimary }}>educational and informational purposes only</strong>. This content
          does not constitute medical advice and should not be used as a substitute for professional medical consultation.
        </p>
        <p style={paragraph}>
          Always consult a qualified healthcare professional for personalised medical advice. Do not disregard or delay
          seeking medical advice based on information you have read on our platform.
        </p>
      </section>

      {/* 6. Doctor Qualifications */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>6. Doctor Qualifications</h2>
        <p style={paragraph}>
          All physicians practising on the Halka platform meet the following qualifications:
        </p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>
            Hold an <strong style={{ color: C.textPrimary }}>MBBS degree</strong> from a recognised Indian medical
            college, with many holding additional MD or specialisation degrees
          </li>
          <li style={{ marginBottom: 8 }}>
            Are <strong style={{ color: C.textPrimary }}>registered with the National Medical Commission</strong>{' '}
            (formerly Medical Council of India) and/or the relevant State Medical Council
          </li>
          <li style={{ marginBottom: 8 }}>
            Have received training in telehealth best practices and weight management
          </li>
          <li style={{ marginBottom: 8 }}>
            Maintain active medical licenses and participate in continuing medical education
          </li>
        </ul>
        <p style={paragraph}>
          You may request verification of your physician&apos;s credentials at any time by contacting us.
        </p>
      </section>

      {/* 7. Regulatory Compliance */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>7. Regulatory Compliance</h2>
        <p style={paragraph}>
          All medications prescribed and dispensed through the Halka platform are:
        </p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>
            Approved by the <strong style={{ color: C.textPrimary }}>Central Drugs Standard Control Organisation
            (CDSCO)</strong> and/or other relevant Indian regulatory bodies
          </li>
          <li style={{ marginBottom: 8 }}>
            Sourced from licensed and verified pharmacies operating in compliance with the Drugs and Cosmetics Act, 1940
          </li>
          <li style={{ marginBottom: 8 }}>
            Dispensed in accordance with the Pharmacy Practice Regulations and applicable state pharmacy laws
          </li>
          <li style={{ marginBottom: 8 }}>
            Stored and transported in compliance with Good Distribution Practices to ensure quality and efficacy
          </li>
        </ul>
      </section>

      {/* 8. Patient Responsibility */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>8. Patient Responsibility</h2>
        <p style={paragraph}>As a patient using Halka&apos;s Services, you are responsible for:</p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Accurate information:</strong> Providing complete and truthful
            information about your health history, current medications, and lifestyle
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Following prescriptions:</strong> Taking medications exactly as
            prescribed, including dosage, timing, and duration
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Reporting side effects:</strong> Notifying your Halka physician of
            any adverse reactions or unexpected symptoms without delay
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Attending follow-ups:</strong> Keeping scheduled follow-up
            appointments to monitor progress and adjust treatment as needed
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Informing other providers:</strong> Telling other healthcare
            providers about medications prescribed through Halka to avoid drug interactions
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong style={{ color: C.textPrimary }}>Medication storage:</strong> Storing medications as directed and
            keeping them out of reach of children
          </li>
        </ul>
      </section>

      {/* 9. Contraindications */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>9. Contraindications</h2>
        <p style={paragraph}>
          Halka&apos;s weight management services and medications may not be suitable for individuals with certain
          conditions, including but not limited to:
        </p>
        <ul style={listStyle}>
          <li style={{ marginBottom: 8 }}>Women who are pregnant, planning to become pregnant, or nursing</li>
          <li style={{ marginBottom: 8 }}>Individuals with a history of eating disorders (anorexia nervosa, bulimia)</li>
          <li style={{ marginBottom: 8 }}>Individuals with uncontrolled thyroid conditions</li>
          <li style={{ marginBottom: 8 }}>Individuals with severe liver or kidney disease</li>
          <li style={{ marginBottom: 8 }}>Individuals with a personal or family history of medullary thyroid carcinoma or Multiple Endocrine Neoplasia syndrome type 2</li>
          <li style={{ marginBottom: 8 }}>Individuals with a history of pancreatitis</li>
          <li style={{ marginBottom: 8 }}>Individuals under the age of 18</li>
        </ul>
        <p style={paragraph}>
          This list is not exhaustive. Your Halka physician will conduct a thorough assessment to determine whether our
          services are appropriate for your individual circumstances.
        </p>
      </section>

      {/* 10. Contact */}
      <section style={sectionStyle}>
        <h2 style={heading(2)}>10. Contact for Medical Concerns</h2>
        <p style={paragraph}>
          If you have any medical concerns, questions about your treatment, or wish to report an adverse event, please
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
          <strong style={{ color: C.textPrimary }}>Halka Health — Medical Team</strong>
          <br />
          Email:{' '}
          <a href="mailto:medical@halka.health" style={{ color: C.saffron, textDecoration: 'none' }}>
            medical@halka.health
          </a>
          <br />
          <br />
          For urgent medical concerns outside of a consultation, please contact your local healthcare provider or call
          112 for emergencies.
        </div>
      </section>
    </article>
  );
}
