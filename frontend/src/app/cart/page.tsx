"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { colors } from "@/styles/colors";
import { Header } from "@/components/layout/Header";

type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

const CartPage = () => {
  const router = useRouter();

  // 仮のカートデータ（後でAPIから取得）
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      productId: "1",
      name: "国産はちみつ",
      price: 1200,
      quantity: 2,
      imageUrl: "/honeyEC/honey1.jpeg",
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: "100vh", background: colors.background }}>
      <Header />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1rem",
        }}
      >
        {/* ページタイトル */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: colors.brown,
              marginBottom: "0.5rem",
            }}
          >
            ショッピングカート
          </h1>
          <p style={{ color: colors.text.secondary }}>
            {totalItems}個の商品が入っています
          </p>
        </div>

        {cartItems.length === 0 ? (
          // 空のカート
          <div
            style={{
              background: colors.white,
              borderRadius: "16px",
              padding: "4rem 2rem",
              textAlign: "center",
              boxShadow: `0 2px 8px ${colors.shadow}`,
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: colors.brown,
                marginBottom: "1rem",
              }}
            >
              カートは空です
            </h2>
            <p
              style={{
                color: colors.text.secondary,
                marginBottom: "2rem",
              }}
            >
              商品を追加してください
            </p>
            <button
              onClick={() => router.push("/")}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                color: colors.white,
                background: `linear-gradient(135deg, ${colors.honey}, ${colors.honeyDark})`,
                border: "none",
                borderRadius: "12px",
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
              商品を見る
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
            }}
          >
            {/* カートアイテム一覧 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: colors.white,
                    borderRadius: "16px",
                    padding: "1.5rem",
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "center",
                    boxShadow: `0 2px 8px ${colors.shadow}`,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 4px 16px ${colors.shadowMedium}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 2px 8px ${colors.shadow}`;
                  }}
                >
                  {/* 商品画像 */}
                  <Link
                    href={`/products/${item.productId}`}
                    style={{
                      position: "relative",
                      width: "120px",
                      height: "120px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: `1px solid ${colors.border.light}`,
                    }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Link>

                  {/* 商品情報 */}
                  <div style={{ flex: 1 }}>
                    <Link
                      href={`/products/${item.productId}`}
                      style={{
                        textDecoration: "none",
                        color: colors.brown,
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = colors.honey;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = colors.brown;
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "600",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {item.name}
                      </h3>
                    </Link>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: colors.honey,
                        marginBottom: "1rem",
                      }}
                    >
                      ¥{item.price.toLocaleString()}
                    </p>

                    {/* 数量調整 */}
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        style={{
                          width: "36px",
                          height: "36px",
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: item.quantity <= 1 ? colors.text.light : colors.brown,
                          background: colors.white,
                          border: `2px solid ${
                            item.quantity <= 1 ? colors.border.light : colors.border.default
                          }`,
                          borderRadius: "8px",
                          cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (item.quantity > 1) {
                            e.currentTarget.style.borderColor = colors.honey;
                            e.currentTarget.style.color = colors.honey;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (item.quantity > 1) {
                            e.currentTarget.style.borderColor = colors.border.default;
                            e.currentTarget.style.color = colors.brown;
                          }
                        }}
                      >
                        −
                      </button>
                      <div
                        style={{
                          minWidth: "60px",
                          textAlign: "center",
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: colors.text.primary,
                          padding: "0.5rem",
                          background: colors.background,
                          borderRadius: "8px",
                          border: `2px solid ${colors.border.light}`,
                        }}
                      >
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: "36px",
                          height: "36px",
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: colors.brown,
                          background: colors.white,
                          border: `2px solid ${colors.border.default}`,
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = colors.honey;
                          e.currentTarget.style.color = colors.honey;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = colors.border.default;
                          e.currentTarget.style.color = colors.brown;
                        }}
                      >
                        ＋
                      </button>
                    </div>
                  </div>

                  {/* 小計と削除ボタン */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: colors.brown,
                      }}
                    >
                      ¥{(item.price * item.quantity).toLocaleString()}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        padding: "0.5rem 1rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#FF4444",
                        background: colors.white,
                        border: "2px solid #FF4444",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#FF4444";
                        e.currentTarget.style.color = colors.white;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = colors.white;
                        e.currentTarget.style.color = "#FF4444";
                      }}
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 合計金額と購入ボタン */}
            <div
              style={{
                background: colors.white,
                borderRadius: "16px",
                padding: "2rem",
                boxShadow: `0 4px 16px ${colors.shadowMedium}`,
                position: "sticky",
                top: "100px",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: colors.brown,
                  marginBottom: "1.5rem",
                }}
              >
                お会計
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "1rem",
                    borderBottom: `1px solid ${colors.border.light}`,
                  }}
                >
                  <span style={{ color: colors.text.secondary }}>小計</span>
                  <span
                    style={{
                      fontWeight: "600",
                      color: colors.text.primary,
                    }}
                  >
                    ¥{totalAmount.toLocaleString()}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "1rem",
                    borderBottom: `1px solid ${colors.border.light}`,
                  }}
                >
                  <span style={{ color: colors.text.secondary }}>送料</span>
                  <span
                    style={{
                      fontWeight: "600",
                      color: colors.honey,
                    }}
                  >
                    無料
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      color: colors.brown,
                    }}
                  >
                    合計
                  </span>
                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: colors.honey,
                    }}
                  >
                    ¥{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                style={{
                  width: "100%",
                  marginTop: "2rem",
                  padding: "1rem 2rem",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: colors.white,
                  background: `linear-gradient(135deg, ${colors.honey}, ${colors.honeyDark})`,
                  border: "none",
                  borderRadius: "12px",
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
                購入手続きへ進む
              </button>

              <button
                onClick={() => router.push("/")}
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: colors.text.primary,
                  background: colors.white,
                  border: `2px solid ${colors.border.default}`,
                  borderRadius: "12px",
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
                買い物を続ける
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
