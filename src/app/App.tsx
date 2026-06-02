import { useState } from "react";
import { Menu, Calendar, Search, ChevronDown, ChevronUp, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

/* MARKER-MAKE-KIT-INVOKED */

const ORANGE = "#FF6600";
const CHARCOAL = "#222222";
const GRAY_MID = "#666666";
const GRAY_LIGHT = "#F9F9F9";
const BORDER = "#E0E0E0";

interface Employee {
  id: number;
  name: string;
  workDays: string;
  paidLeave: string;
  specialLeave: string;
  absentDays: string;
  totalHours: string;
  overtime: string;
}

const employees: Employee[] = [
  { id: 1, name: "山田太郎", workDays: "20.0", paidLeave: "0.0", specialLeave: "2.0", absentDays: "2.0", totalHours: "155:00:00.000", overtime: "00:00:00.000" },
  { id: 2, name: "鈴木花子", workDays: "18.0", paidLeave: "2.0", specialLeave: "0.0", absentDays: "0.0", totalHours: "160:30:00.000", overtime: "08:30:00.000" },
  { id: 3, name: "田中一郎", workDays: "22.0", paidLeave: "0.0", specialLeave: "0.0", absentDays: "0.0", totalHours: "176:00:00.000", overtime: "16:00:00.000" },
  { id: 4, name: "佐藤美咲", workDays: "19.0", paidLeave: "1.0", specialLeave: "1.0", absentDays: "1.0", totalHours: "152:00:00.000", overtime: "00:00:00.000" },
  { id: 5, name: "伊藤健二", workDays: "20.0", paidLeave: "0.0", specialLeave: "0.0", absentDays: "0.0", totalHours: "168:45:00.000", overtime: "08:45:00.000" },
  { id: 6, name: "渡辺さくら", workDays: "17.0", paidLeave: "3.0", specialLeave: "0.0", absentDays: "2.0", totalHours: "148:00:00.000", overtime: "00:00:00.000" },
];

export default function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div
      style={{
        fontFamily: "'Noto Sans JP', 'Meiryo', sans-serif",
        backgroundColor: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: CHARCOAL,
      }}
    >
      {/* 1. Main Navigation Bar */}
      <nav
        style={{
          backgroundColor: ORANGE,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <span style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 700, letterSpacing: "0.02em" }}>
          勤怠管理システム
        </span>
        <button
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center" }}
          aria-label="メニュー"
        >
          <Menu size={24} color="#FFFFFF" strokeWidth={2.5} />
        </button>
      </nav>

      {/* 2. Breadcrumb Header */}
      <div
        style={{
          backgroundColor: "#FFF3EB",
          display: "flex",
          alignItems: "center",
          padding: "12px 24px",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: 500, color: CHARCOAL }}>
          勤怠管理 &gt; 稼働時間一覧
        </span>
      </div>

      {/* 3. Filter and Control Toolbar */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "16px",
          padding: "16px 24px",
          backgroundColor: "#FFFFFF",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        {/* Date Picker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: `1px solid ${BORDER}`,
            borderRadius: "4px",
            padding: "8px 12px",
            backgroundColor: "#FFFFFF",
            gap: "8px",
            minWidth: "160px",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "14px", color: CHARCOAL, flex: 1 }}>2026年05月</span>
          <Calendar size={16} color={GRAY_MID} />
        </div>

        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: `1px solid ${BORDER}`,
            borderRadius: "4px",
            padding: "8px 12px",
            backgroundColor: "#FFFFFF",
            gap: "8px",
            flex: 1,
            minWidth: "200px",
            maxWidth: "360px",
          }}
        >
          <Search size={16} color={GRAY_MID} />
          <input
            type="text"
            placeholder="氏名から検索"
            style={{
              border: "none",
              outline: "none",
              fontSize: "14px",
              color: CHARCOAL,
              backgroundColor: "transparent",
              flex: 1,
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* 4. Main Data Table */}
      <div style={{ flex: 1, padding: "24px", boxSizing: "border-box", overflowX: "auto" }}>
        <div style={{ width: "100%", overflowX: "auto", borderRadius: "4px", border: `1px solid ${BORDER}` }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
              <tr style={{ backgroundColor: ORANGE }}>
                {[
                  { label: "ID", w: "5%" },
                  { label: "氏名", w: "14%" },
                  { label: "出勤日数", w: "9%" },
                  { label: "有休日数", w: "9%" },
                  { label: "特別休暇", w: "9%" },
                  { label: "欠勤日数", w: "9%" },
                  { label: "総合稼働時間\n(実働時間+有休)", w: "18%" },
                  { label: "残業時間\n(有休時間含む)", w: "17%" },
                  { label: "アクション", w: "10%" },
                ].map((col) => (
                  <th
                    key={col.label}
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "12px",
                      padding: "12px 10px",
                      textAlign: "center",
                      whiteSpace: "pre-line",
                      lineHeight: "1.4",
                      width: col.w,
                      borderRight: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => (
                <tr
                  key={emp.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderBottom: `1px solid ${BORDER}`,
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = GRAY_LIGHT; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#FFFFFF"; }}
                >
                  <td style={tdStyle}>{emp.id}</td>
                  <td style={{ ...tdStyle, textAlign: "left", fontWeight: 500 }}>{emp.name}</td>
                  <td style={tdStyle}>{emp.workDays}</td>
                  <td style={tdStyle}>{emp.paidLeave}</td>
                  <td style={tdStyle}>{emp.specialLeave}</td>
                  <td style={tdStyle}>{emp.absentDays}</td>
                  <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "12px" }}>{emp.totalHours}</td>
                  <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: "12px" }}>{emp.overtime}</td>
                  <td style={{ ...tdStyle, position: "relative" }}>
                    {idx === 0 ? (
                      <div style={{ position: "relative", display: "inline-block" }}>
                        <button
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          style={{
                            background: "none",
                            border: `1px solid ${BORDER}`,
                            borderRadius: "4px",
                            cursor: "pointer",
                            padding: "4px 10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            color: CHARCOAL,
                          }}
                          aria-label="アクション"
                        >
                          {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {dropdownOpen && (
                          <div
                            style={{
                              position: "absolute",
                              top: "calc(100% + 8px)",
                              left: "50%",
                              transform: "translateX(-50%)",
                              backgroundColor: "#FFFFFF",
                              border: `1px solid ${BORDER}`,
                              borderRadius: "6px",
                              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                              zIndex: 100,
                              minWidth: "160px",
                              overflow: "hidden",
                            }}
                          >
                            {/* Caret triangle */}
                            <div
                              style={{
                                position: "absolute",
                                top: "-7px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: 0,
                                height: 0,
                                borderLeft: "7px solid transparent",
                                borderRight: "7px solid transparent",
                                borderBottom: `7px solid ${BORDER}`,
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: "-6px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: 0,
                                height: 0,
                                borderLeft: "6px solid transparent",
                                borderRight: "6px solid transparent",
                                borderBottom: "6px solid #FFFFFF",
                              }}
                            />

                            {[
                              { label: "有休管理", key: "paid" },
                              { label: "打刻時間情報管理", key: "stamp" },
                            ].map((item) => (
                              <div
                                key={item.key}
                                onMouseEnter={() => setHoveredItem(item.key)}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                  padding: "10px 16px",
                                  fontSize: "13px",
                                  cursor: "pointer",
                                  color: CHARCOAL,
                                  backgroundColor:
                                    item.key === "paid"
                                      ? "#FFF0E6"
                                      : hoveredItem === item.key
                                      ? GRAY_LIGHT
                                      : "#FFFFFF",
                                  transition: "background-color 0.1s",
                                  borderBottom: item.key === "paid" ? `1px solid ${BORDER}` : "none",
                                  fontWeight: item.key === "paid" ? 500 : 400,
                                }}
                              >
                                {item.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        style={{
                          background: "none",
                          border: `1px solid ${BORDER}`,
                          borderRadius: "4px",
                          cursor: "pointer",
                          padding: "4px 10px",
                          display: "flex",
                          alignItems: "center",
                          color: CHARCOAL,
                        }}
                        aria-label="アクション"
                      >
                        <ChevronDown size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 6. Pagination */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "16px",
            padding: "16px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: GRAY_MID }}>
            <span>ページあたりの行数:</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${BORDER}`,
                borderRadius: "4px",
                padding: "4px 8px",
                gap: "4px",
                cursor: "pointer",
                backgroundColor: "#FFFFFF",
              }}
            >
              <span style={{ color: CHARCOAL, fontSize: "13px" }}>10行</span>
              <ChevronDown size={12} color={GRAY_MID} />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: GRAY_MID }}>
            <span>1-6 全6件</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            {[
              { icon: <ChevronsLeft size={16} />, disabled: true },
              { icon: <ChevronLeft size={16} />, disabled: true },
              { icon: <ChevronRight size={16} />, disabled: true },
              { icon: <ChevronsRight size={16} />, disabled: true },
            ].map((btn, i) => (
              <button
                key={i}
                disabled={btn.disabled}
                style={{
                  background: "none",
                  border: `1px solid ${BORDER}`,
                  borderRadius: "3px",
                  padding: "4px 6px",
                  cursor: btn.disabled ? "not-allowed" : "pointer",
                  color: btn.disabled ? BORDER : CHARCOAL,
                  display: "flex",
                  alignItems: "center",
                  lineHeight: 1,
                }}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "12px 24px",
          fontSize: "11px",
          color: GRAY_MID,
          borderTop: `1px solid ${BORDER}`,
          backgroundColor: "#FFFFFF",
        }}
      >
        Copyright © NAYUTA Corporation. All Rights Reserved.
      </footer>
    </div>
  );
}

const tdStyle: React.CSSProperties = {
  padding: "12px 10px",
  fontSize: "13px",
  color: CHARCOAL,
  textAlign: "center",
  verticalAlign: "middle",
};
