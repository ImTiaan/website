import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Imtiaan Wolmarans - Financial OS Architect";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Font loading could be added here if we had custom fonts files in the project
  // For now we use system fonts or standard available ones

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage: "radial-gradient(circle at 25px 25px, #10b981 2%, transparent 0%), radial-gradient(circle at 75px 75px, #10b981 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          position: "relative",
        }}
      >
        {/* Glass Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "1px solid rgba(52, 211, 153, 0.2)", // Emerald-400 border
            borderRadius: "24px",
            padding: "60px 80px",
            boxShadow: "0 0 80px rgba(16, 185, 129, 0.15)", // Emerald glow
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Top decorative bar */}
          <div
            style={{
              display: "flex",
              width: "100%",
              marginBottom: "40px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#eab308" }} />
              <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: "20px",
                fontFamily: "monospace",
              }}
            >
              tOS v1.0
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "72px",
                fontWeight: "bold",
                background: "linear-gradient(to bottom right, #ffffff, #a7f3d0)", // White to Emerald-200
                backgroundClip: "text",
                color: "transparent",
                margin: "0 0 20px 0",
                textAlign: "center",
                letterSpacing: "-0.02em",
              }}
            >
              Tiaan Wolmarans
            </h1>
            <div
              style={{
                fontSize: "32px",
                color: "#34d399", // Emerald-400
                marginBottom: "40px",
                fontFamily: "monospace",
                letterSpacing: "0.05em",
              }}
            >
              FINANCIAL OS ARCHITECT
            </div>
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  padding: "10px 24px",
                  borderRadius: "99px",
                  backgroundColor: "rgba(52, 211, 153, 0.1)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  color: "#d1fae5",
                  fontSize: "20px",
                }}
              >
                Fintech
              </div>
              <div
                style={{
                  padding: "10px 24px",
                  borderRadius: "99px",
                  backgroundColor: "rgba(52, 211, 153, 0.1)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  color: "#d1fae5",
                  fontSize: "20px",
                }}
              >
                Product
              </div>
              <div
                style={{
                  padding: "10px 24px",
                  borderRadius: "99px",
                  backgroundColor: "rgba(52, 211, 153, 0.1)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  color: "#d1fae5",
                  fontSize: "20px",
                }}
              >
                Operations
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer/URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            color: "rgba(255, 255, 255, 0.3)",
            fontSize: "24px",
            fontFamily: "monospace",
          }}
        >
          imtiaan.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
