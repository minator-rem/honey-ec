'use client';

import { Product } from "@/types/product";
import { colors } from "@/styles/colors";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
  quantity: number;
};

export const PurchaseButton = ({ product, quantity }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handlePurchase = async () => {
    // 後で API POST /cart に接続
    setShowModal(true);
  };

  const handleGoToCart = () => {
    setShowModal(false);
    router.push("/cart");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handlePurchase}
        style={{
          width: "100%",
          padding: "1rem 2rem",
          fontSize: "1.125rem",
          fontWeight: "600",
          color: colors.white,
          background: `linear-gradient(135deg, ${colors.honey}, ${colors.honeyDark})`,
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: `0 4px 12px ${colors.shadow}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = `0 6px 20px ${colors.shadowMedium}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = `0 4px 12px ${colors.shadow}`;
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        カートに入れる
      </button>

      {/* モーダル */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          }}
          onClick={handleClose}
        >
          <div
            style={{
              background: colors.white,
              borderRadius: "16px",
              padding: "2.5rem",
              maxWidth: "450px",
              width: "90%",
              boxShadow: `0 20px 60px ${colors.shadowMedium}`,
              animation: "modalFadeIn 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 成功アイコン */}
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${colors.honeyLight}, ${colors.honey})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "2rem",
              }}
            >
              ✓
            </div>

            {/* メッセージ */}
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: colors.brown,
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              カートに入れました！
            </h2>

            <p
              style={{
                fontSize: "1rem",
                color: colors.text.secondary,
                textAlign: "center",
                marginBottom: "2rem",
                lineHeight: "1.6",
              }}
            >
              {product.name} を{quantity}個カートに追加しました。
              <br />
              カートを確認しますか？
            </p>

            {/* ボタン */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handleClose}
                style={{
                  flex: 1,
                  padding: "0.875rem 1.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: colors.text.primary,
                  background: colors.white,
                  border: `2px solid ${colors.border.default}`,
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.background;
                  e.currentTarget.style.borderColor = colors.brown;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.white;
                  e.currentTarget.style.borderColor = colors.border.default;
                }}
              >
                いいえ
              </button>

              <button
                onClick={handleGoToCart}
                style={{
                  flex: 1,
                  padding: "0.875rem 1.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: colors.white,
                  background: `linear-gradient(135deg, ${colors.honey}, ${colors.honeyDark})`,
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: `0 4px 12px ${colors.shadow}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 6px 20px ${colors.shadowMedium}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 4px 12px ${colors.shadow}`;
                }}
              >
                はい
              </button>
            </div>
          </div>

          <style jsx>{`
            @keyframes modalFadeIn {
              from {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};
