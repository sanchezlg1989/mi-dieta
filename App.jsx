import { useState } from "react";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const meals = [
  { id: "desayuno", label: "Desayuno", icon: "☀️", time: "7–9 hs" },
  { id: "colacion1", label: "Colación", icon: "🍎", time: "10 hs" },
  { id: "almuerzo", label: "Almuerzo", icon: "🍽️", time: "12:30–14:30 hs" },
  { id: "merienda", label: "Merienda", icon: "☕", time: "17–18 hs" },
  { id: "colacion2", label: "Colación", icon: "🥜", time: "Opcional" },
  { id: "cena", label: "Cena", icon: "🌙", time: "Noche" },
];

const diet = {
  desayuno: [
    "Infusión / 4-5 galletitas de salvado con queso + semillas",
    "Infusión con 2 arroz con queso untable / 3 tostadas de avena y frutas",
    "Infusión / 3 o 4 galletitas integrales con queso untable y granola",
    "Infusión + tortilla o panqueque de avena con frutas",
    "Infusión + 2 o 3 tostadas de arroz con mermelada light + semillas",
    "Infusión con 2 tostadas con queso light",
    "Infusión con 4-5 galletitas de salvado con queso untable / Yogurt con cereales sin azúcar",
  ],
  colacion1: [
    "Huevo duro",
    "Yogurt con avena y frutas",
    "Granola o avena y granola",
    "Gelatina light con frutas",
    "Arroz con mermelada light + semillas",
    "Frutos secos",
    "Yogurt con salvado con queso untable",
  ],
  almuerzo: [
    "Bife de carne con ensalada a elección o puré mixto / Una fruta",
    "Ensalada de verduras con tomate, arvejas, zanahoria y arroz integral / Una fruta",
    "Ensalada de pollo, arroz y vegetales / Ensalada de frutas",
    "Solomillo/carré de cerdo con calabaza y zanahorias asadas / Una fruta",
    "2 empanadas al HORNO + ensalada de vegetales / Ensalada de frutas",
    "Pollo al horno con ensalada a elección o vegetales al horno / Fruta",
    "Carne asada con ensalada o vegetales asados / Ensalada de frutas",
  ],
  merienda: [
    "Infusión y 2 tostadas de arroz con pasta de maní + semillas",
    "Infusión + 2 tostadas integrales con huevo revuelto",
    "Infusión + 2 tostadas integrales con queso untable",
    "Infusión con 3 o 4 galletitas de salvado con mermelada light",
    "Infusión con 2 tostadas de arroz con pasta de maní + semillas",
    "Infusión + 4-5 galletitas de salvado con mermelada light",
    "Infusión + 1 porción de bizcochuelo",
  ],
  colacion2: [
    "Yogurt con cereales",
    "Fruta + media taza de granola",
    "Frutos secos + fruta",
    "Frutos secos + exprimido de naranja",
    "Gelatina light con fruta",
    "Fruta",
    "Frutos secos + fruta",
  ],
  cena: [
    "Omelette con cebolla, queso y espinaca / Fruta",
    "Filet de atún con vegetales salteados / Fruta",
    "Tarta de verduras con ensalada a elección / Fruta",
    "Wok de arroz o fideos y vegetales / Una fruta",
    "Filet de atún con verduras al horno / Fruta",
    "Pasta con salsa a elección / Una fruta",
    "Calabaza rellena con pimientos, arroz y queso / Una fruta",
  ],
};

const mealColors = {
  desayuno: { bg: "#FFF8E7", accent: "#F4A435", light: "#FEF3CD" },
  colacion1: { bg: "#F0FBF4", accent: "#3BAD6A", light: "#D4F0E2" },
  almuerzo: { bg: "#EFF6FF", accent: "#3B82F6", light: "#DBEAFE" },
  merienda: { bg: "#FDF4FF", accent: "#A855F7", light: "#EDE9FE" },
  colacion2: { bg: "#FFF5F0", accent: "#F97316", light: "#FFEDD5" },
  cena: { bg: "#F0F4FF", accent: "#6366F1", light: "#E0E7FF" },
};

const nota = "Podés cambiar los menús según disponibilidad, tiempo y gusto. Recordá optar por carnes una sola vez al día. Comé de 1 a 3 huevos al día usando las claras para preparaciones. Realizá en cada comida un plato variado con vegetales. La fruta de postre es opcional.";

export default function DietaApp() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [view, setView] = useState("dia"); // "dia" | "semana"

  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #f0f9f4 50%, #fef9ef 100%)",
      fontFamily: "'Georgia', serif",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1e4d3a 0%, #2d6a4f 60%, #40916c 100%)",
        padding: "28px 24px 20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -30, right: -20, width: 120, height: 120,
          borderRadius: "50%", background: "rgba(255,255,255,0.05)"
        }} />
        <div style={{
          position: "absolute", bottom: -40, left: -20, width: 100, height: 100,
          borderRadius: "50%", background: "rgba(255,255,255,0.04)"
        }} />
        <div style={{ fontSize: 36, marginBottom: 4 }}>🥗</div>
        <h1 style={{ color: "#fff", margin: 0, fontSize: 22, fontWeight: "bold", letterSpacing: 1 }}>
          Mi Plan de Alimentación
        </h1>
        <p style={{ color: "#b7e4c7", margin: "4px 0 0", fontSize: 13 }}>
          Semanal • Personalizado
        </p>

        {/* View toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
          {["dia", "semana"].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "6px 18px",
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: view === v ? "bold" : "normal",
                background: view === v ? "#fff" : "rgba(255,255,255,0.15)",
                color: view === v ? "#1e4d3a" : "#fff",
                transition: "all 0.2s",
              }}
            >
              {v === "dia" ? "Por día" : "Semana completa"}
            </button>
          ))}
        </div>
      </div>

      {view === "dia" ? (
        <>
          {/* Day selector */}
          <div style={{
            display: "flex", overflowX: "auto", gap: 8,
            padding: "16px 16px 8px", scrollbarWidth: "none",
          }}>
            {days.map((d, i) => (
              <button
                key={d}
                onClick={() => { setSelectedDay(i); setExpandedMeal(null); }}
                style={{
                  flexShrink: 0,
                  padding: "8px 14px",
                  borderRadius: 12,
                  border: selectedDay === i ? "2px solid #2d6a4f" : "2px solid transparent",
                  background: selectedDay === i ? "#2d6a4f" : i === todayIndex ? "#e8f5e9" : "#fff",
                  color: selectedDay === i ? "#fff" : i === todayIndex ? "#2d6a4f" : "#555",
                  fontWeight: selectedDay === i || i === todayIndex ? "bold" : "normal",
                  fontSize: 13,
                  cursor: "pointer",
                  boxShadow: selectedDay === i ? "0 2px 8px rgba(45,106,79,0.3)" : "0 1px 4px rgba(0,0,0,0.08)",
                  transition: "all 0.2s",
                  position: "relative",
                }}
              >
                {d}
                {i === todayIndex && (
                  <span style={{
                    position: "absolute", top: -4, right: -4,
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#F4A435", border: "2px solid #fff"
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Day title */}
          <div style={{ padding: "4px 20px 12px" }}>
            <h2 style={{ margin: 0, color: "#1e4d3a", fontSize: 20 }}>
              {days[selectedDay]}
              {selectedDay === todayIndex && (
                <span style={{ fontSize: 12, color: "#F4A435", marginLeft: 8, fontStyle: "italic" }}>hoy</span>
              )}
            </h2>
          </div>

          {/* Meals list */}
          <div style={{ padding: "0 16px 100px", display: "flex", flexDirection: "column", gap: 10 }}>
            {meals.map((meal) => {
              const colors = mealColors[meal.id];
              const isOpen = expandedMeal === meal.id;
              return (
                <div
                  key={meal.id}
                  onClick={() => setExpandedMeal(isOpen ? null : meal.id)}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: isOpen ? "0 4px 16px rgba(0,0,0,0.12)" : "0 1px 6px rgba(0,0,0,0.07)",
                    border: isOpen ? `2px solid ${colors.accent}` : "2px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {/* Meal header */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "14px 16px",
                    background: isOpen ? colors.light : "#fff",
                  }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: colors.bg, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 22, flexShrink: 0,
                      border: `1px solid ${colors.light}`,
                    }}>
                      {meal.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", color: "#222", fontSize: 15 }}>{meal.label}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>{meal.time}</div>
                    </div>
                    <div style={{
                      fontSize: 11, color: colors.accent, fontWeight: "bold",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.2s"
                    }}>▼</div>
                  </div>

                  {/* Expanded content */}
                  {isOpen && (
                    <div style={{
                      padding: "12px 16px 16px",
                      borderTop: `1px solid ${colors.light}`,
                    }}>
                      <p style={{
                        margin: 0, color: "#333", fontSize: 15, lineHeight: 1.6,
                        background: colors.bg, padding: "12px 14px", borderRadius: 10,
                      }}>
                        {diet[meal.id][selectedDay]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Weekly view */
        <div style={{ padding: "16px 16px 80px", overflowX: "auto" }}>
          {meals.map((meal) => {
            const colors = mealColors[meal.id];
            return (
              <div key={meal.id} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{meal.icon}</span>
                  <h3 style={{ margin: 0, color: "#1e4d3a", fontSize: 15 }}>{meal.label}</h3>
                  <span style={{ fontSize: 11, color: "#999" }}>{meal.time}</span>
                </div>
                <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                  {days.map((day, i) => (
                    <div key={day} style={{
                      flexShrink: 0, width: 160,
                      background: i === todayIndex ? colors.light : colors.bg,
                      borderRadius: 12, padding: "10px 12px",
                      border: i === todayIndex ? `2px solid ${colors.accent}` : "2px solid transparent",
                    }}>
                      <div style={{
                        fontSize: 11, fontWeight: "bold", color: colors.accent,
                        marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5
                      }}>
                        {day}{i === todayIndex ? " ★" : ""}
                      </div>
                      <div style={{ fontSize: 12, color: "#444", lineHeight: 1.5 }}>
                        {diet[meal.id][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer tip */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(135deg, #1e4d3a, #2d6a4f)",
        padding: "12px 20px",
      }}>
        <p style={{ margin: 0, color: "#b7e4c7", fontSize: 11, lineHeight: 1.5 }}>
          💡 {nota}
        </p>
      </div>
    </div>
  );
}
