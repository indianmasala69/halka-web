'use client';

import { COLOR_SYSTEM as C } from '@/lib/colors';

interface ComparisonTableProps {
  onQuiz: () => void;
}

function CheckMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill={C.greenLight} />
      <path
        d="M6 10.5L8.5 13L14 7.5"
        stroke={C.green}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#FEE2E2" />
      <path
        d="M7 7L13 13M13 7L7 13"
        stroke={C.error}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CellValue =
  | { type: 'yes' }
  | { type: 'no' }
  | { type: 'partial'; label: string }
  | { type: 'text'; label: string };

function CellContent({ value }: { value: CellValue }) {
  if (value.type === 'yes') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' } as any}>
        <CheckMark />
        <span style={{ color: C.green, fontWeight: 600, fontSize: '13.5px' } as any}>Yes</span>
      </span>
    );
  }
  if (value.type === 'no') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' } as any}>
        <XMark />
        <span style={{ color: C.error, fontWeight: 600, fontSize: '13.5px' } as any}>No</span>
      </span>
    );
  }
  if (value.type === 'partial') {
    return (
      <span
        style={{
          color: C.textMuted,
          fontWeight: 500,
          fontSize: '13.5px',
          fontStyle: 'italic',
        } as any}
      >
        {value.label}
      </span>
    );
  }
  return (
    <span style={{ color: C.textSecondary, fontWeight: 500, fontSize: '13.5px' } as any}>
      {value.label}
    </span>
  );
}

const columns = ['Halka', 'Dietitian', 'Gym', 'Supplements', 'Surgery'];

const rows: { label: string; values: CellValue[] }[] = [
  {
    label: 'Doctor-supervised',
    values: [
      { type: 'yes' },
      { type: 'partial', label: 'Sometimes' },
      { type: 'no' },
      { type: 'no' },
      { type: 'yes' },
    ],
  },
  {
    label: 'Prescription medication',
    values: [
      { type: 'yes' },
      { type: 'no' },
      { type: 'no' },
      { type: 'no' },
      { type: 'partial', label: 'N/A' },
    ],
  },
  {
    label: 'Average weight loss',
    values: [
      { type: 'text', label: '10\u201315%' },
      { type: 'text', label: '3\u20135%' },
      { type: 'text', label: '2\u20134%' },
      { type: 'text', label: '1\u20132%' },
      { type: 'text', label: '25\u201330%' },
    ],
  },
  {
    label: 'Monthly cost',
    values: [
      { type: 'text', label: '~\u20B91,000/week' },
      { type: 'text', label: '\u20B93,000\u20138,000' },
      { type: 'text', label: '\u20B92,000\u20135,000' },
      { type: 'text', label: '\u20B91,500\u20134,000' },
      { type: 'text', label: '\u20B92\u20135 lakh (one-time)' },
    ],
  },
  {
    label: 'Sustainable results',
    values: [
      { type: 'yes' },
      { type: 'partial', label: 'Sometimes' },
      { type: 'partial', label: 'Requires commitment' },
      { type: 'no' },
      { type: 'yes' },
    ],
  },
  {
    label: 'Side effects',
    values: [
      { type: 'partial', label: 'Mild/managed' },
      { type: 'text', label: 'None' },
      { type: 'partial', label: 'Injury risk' },
      { type: 'partial', label: 'Unknown' },
      { type: 'partial', label: 'Significant' },
    ],
  },
  {
    label: 'Time to see results',
    values: [
      { type: 'text', label: '2\u20134 weeks' },
      { type: 'text', label: '4\u20138 weeks' },
      { type: 'text', label: '8\u201312 weeks' },
      { type: 'partial', label: 'Unlikely' },
      { type: 'text', label: 'Immediate' },
    ],
  },
];

export default function ComparisonTable({ onQuiz }: ComparisonTableProps) {
  const halkaColWidth = '160px';
  const otherColWidth = '140px';
  const labelColWidth = '180px';

  return (
    <section
      className="halka-comparison"
      style={{
        background: `linear-gradient(180deg, ${C.white} 0%, ${C.bgWarm} 100%)`,
        padding: '100px 24px 80px',
      } as any}
    >
      <style>{`
        .halka-comparison-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .halka-comparison-scroll::-webkit-scrollbar-track {
          background: ${C.borderLight};
          border-radius: 3px;
        }
        .halka-comparison-scroll::-webkit-scrollbar-thumb {
          background: ${C.border};
          border-radius: 3px;
        }
        .halka-comparison-cta {
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .halka-comparison-cta:hover {
          transform: scale(1.015);
          background: linear-gradient(135deg, ${C.saffronHover}, ${C.saffron}) !important;
        }
        @media (max-width: 767px) {
          .halka-comparison { padding: 60px 16px 60px !important; }
          .halka-comparison-label-col {
            display: none !important;
          }
          .halka-comparison-halka-col {
            min-width: 130px !important;
            position: sticky !important;
            left: 0 !important;
            z-index: 2 !important;
          }
          .halka-comparison-halka-header {
            position: sticky !important;
            left: 0 !important;
            z-index: 3 !important;
          }
          .halka-comparison-other-col {
            min-width: 120px !important;
          }
          .halka-comparison-row-label-mobile {
            display: block !important;
          }
        }
        @media (max-width: 480px) {
          .halka-comparison { padding: 48px 12px 48px !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1120px', margin: '0 auto' } as any}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' } as any}>
          <div
            style={{
              display: 'inline-block',
              background: C.saffronLight,
              color: C.saffron,
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              padding: '6px 16px',
              borderRadius: '100px',
              letterSpacing: '0.8px',
              textTransform: 'uppercase' as const,
              marginBottom: '20px',
            } as any}
          >
            Why Halka
          </div>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(30px, 5vw, 44px)',
              color: C.textPrimary,
              letterSpacing: '-0.6px',
              marginBottom: '16px',
              lineHeight: 1.15,
            } as any}
          >
            Why choose Halka?
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '17px',
              color: C.textSecondary,
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.6,
            } as any}
          >
            See how prescription GLP-1 treatment compares to other weight loss methods.
          </p>
        </div>

        {/* Table Container */}
        <div
          className="halka-comparison-scroll"
          style={{
            overflowX: 'auto',
            borderRadius: '16px',
            border: `1px solid ${C.border}`,
            background: C.white,
            boxShadow: C.shadowMd,
          } as any}
        >
          <table
            style={{
              width: '100%',
              minWidth: '780px',
              borderCollapse: 'collapse',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            } as any}
          >
            {/* Table Header */}
            <thead>
              <tr>
                {/* Label column header */}
                <th
                  className="halka-comparison-label-col"
                  style={{
                    width: labelColWidth,
                    minWidth: labelColWidth,
                    padding: '20px 24px',
                    textAlign: 'left' as const,
                    borderBottom: `2px solid ${C.border}`,
                    background: C.bgPrimary,
                  } as any}
                />
                {/* Halka column header */}
                <th
                  className="halka-comparison-halka-col halka-comparison-halka-header"
                  style={{
                    width: halkaColWidth,
                    minWidth: halkaColWidth,
                    padding: '20px 16px',
                    textAlign: 'center' as const,
                    borderBottom: `2px solid ${C.saffron}`,
                    background: C.saffronLight,
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: '16px',
                    color: C.saffron,
                    letterSpacing: '-0.2px',
                  } as any}
                >
                  Halka
                </th>
                {/* Other column headers */}
                {columns.slice(1).map((col) => (
                  <th
                    key={col}
                    className="halka-comparison-other-col"
                    style={{
                      width: otherColWidth,
                      minWidth: otherColWidth,
                      padding: '20px 16px',
                      textAlign: 'center' as const,
                      borderBottom: `2px solid ${C.border}`,
                      background: C.bgPrimary,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: '13px',
                      color: C.textSecondary,
                      letterSpacing: '0.3px',
                      textTransform: 'uppercase' as const,
                    } as any}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isEven = i % 2 === 0;
                return (
                  <tr key={row.label}>
                    {/* Row label (desktop) */}
                    <td
                      className="halka-comparison-label-col"
                      style={{
                        padding: '16px 24px',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: C.textPrimary,
                        background: isEven ? C.white : C.bgPrimary,
                        borderBottom: i < rows.length - 1 ? `1px solid ${C.borderLight}` : 'none',
                        whiteSpace: 'nowrap' as const,
                      } as any}
                    >
                      {row.label}
                    </td>
                    {/* Halka column value */}
                    <td
                      className="halka-comparison-halka-col"
                      style={{
                        padding: '16px',
                        textAlign: 'center' as const,
                        background: isEven
                          ? C.saffronLight
                          : `linear-gradient(180deg, ${C.saffronLight} 0%, #FFF5EE 100%)`,
                        borderBottom: i < rows.length - 1 ? `1px solid #FFE0CC` : 'none',
                        borderLeft: `2px solid ${C.saffronLight}`,
                        borderRight: `2px solid ${C.saffronLight}`,
                      } as any}
                    >
                      {/* Mobile row label shown inline */}
                      <div
                        className="halka-comparison-row-label-mobile"
                        style={{
                          display: 'none',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: C.saffronDark,
                          textTransform: 'uppercase' as const,
                          letterSpacing: '0.5px',
                          marginBottom: '6px',
                        } as any}
                      >
                        {row.label}
                      </div>
                      <CellContent value={row.values[0]} />
                    </td>
                    {/* Other columns */}
                    {row.values.slice(1).map((val, j) => (
                      <td
                        key={j}
                        className="halka-comparison-other-col"
                        style={{
                          padding: '16px',
                          textAlign: 'center' as const,
                          background: isEven ? C.white : C.bgPrimary,
                          borderBottom:
                            i < rows.length - 1 ? `1px solid ${C.borderLight}` : 'none',
                        } as any}
                      >
                        <CellContent value={val} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' } as any}>
          <button
            className="halka-comparison-cta"
            onClick={onQuiz}
            style={{
              background: `linear-gradient(135deg, ${C.saffron}, ${C.saffronDark})`,
              color: C.white,
              border: 'none',
              padding: '16px 40px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '16px',
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              minHeight: '50px',
              letterSpacing: '0.2px',
              boxShadow: '0 4px 14px rgba(255, 107, 44, 0.3)',
            } as any}
          >
            Start your doctor-supervised journey
          </button>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              color: C.textMuted,
              marginTop: '14px',
              marginBottom: 0,
            } as any}
          >
            Free assessment. No commitment required.
          </p>
        </div>
      </div>
    </section>
  );
}
