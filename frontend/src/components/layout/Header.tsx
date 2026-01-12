"use client";

import { colors } from "@/styles/colors";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  const iconButtonStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: `2px solid ${colors.border.light}`,
    background: colors.white,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.25rem",
    position: "relative" as const,
  };

  return (
    <header
      style={{
        padding: "16px 32px",
        backgroundColor: colors.background,
        borderBottom: `2px solid ${colors.honeyLight}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: `0 2px 8px ${colors.shadow}`,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* ロゴ */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1
            style={{
              color: colors.honeyDark,
              fontSize: "1.75rem",
              fontWeight: "700",
              margin: 0,
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.honey;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.honeyDark;
            }}
          >
            🍯 Honey Store
          </h1>
        </Link>

        {/* 右側のボタン群 */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* お知らせボタン */}
          <button
            onClick={() => router.push("/notifications")}
            style={iconButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.honey;
              e.currentTarget.style.background = colors.honeyLight + "20";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border.light;
              e.currentTarget.style.background = colors.white;
              e.currentTarget.style.transform = "translateY(0)";
            }}
            aria-label="お知らせ"
          >
            <span>🔔</span>
            {/* 通知バッジ */}
            <span
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#FF4444",
                border: `2px solid ${colors.white}`,
              }}
            />
          </button>

          {/* カートボタン */}
          <button
            onClick={() => router.push("/cart")}
            style={iconButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.honey;
              e.currentTarget.style.background = colors.honeyLight + "20";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border.light;
              e.currentTarget.style.background = colors.white;
              e.currentTarget.style.transform = "translateY(0)";
            }}
            aria-label="カート"
          >
            <span>🛒</span>
            {/* カート内の商品数バッジ */}
            <span
              style={{
                position: "absolute",
                top: "2px",
                right: "2px",
                minWidth: "20px",
                height: "20px",
                borderRadius: "10px",
                background: `linear-gradient(135deg, ${colors.honey}, ${colors.honeyDark})`,
                color: colors.white,
                fontSize: "0.75rem",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 5px",
                border: `2px solid ${colors.white}`,
              }}
            >
              2
            </span>
          </button>

          {/* ユーザーボタン */}
          <button
            onClick={() => router.push("/profile")}
            style={iconButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.honey;
              e.currentTarget.style.background = colors.honeyLight + "20";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border.light;
              e.currentTarget.style.background = colors.white;
              e.currentTarget.style.transform = "translateY(0)";
            }}
            aria-label="ユーザー"
          >
            <span>👤</span>
          </button>
        </div>
      </div>
    </header>
  );
};
