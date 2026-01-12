"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { PurchaseButton } from "@/components/product/PurchaseButton";
import { colors } from "@/styles/colors";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";

type Props = {
  params: { id: string };
};

const fetchProduct = async (id: string): Promise<Product> => {
  // 仮API（後でJava APIに置き換え）
  return {
    id,
    name: "国産はちみつ",
    description: "自然豊かな環境で採れた純粋はちみつ",
    price: 1200,
    imageUrl: "/honeyEC/honey1.jpeg",
  };
};

const ProductDetailPage = ({ params }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct(params.id).then(setProduct);
  }, [params.id]);

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.background,
        }}
      >
        <div style={{ fontSize: "1.25rem", color: colors.text.secondary }}>
          読み込み中...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(to bottom, ${colors.background}, ${colors.white})`,
        padding: "2rem 1rem",
      }}
    >
      <Header/>
      {/* パンくずリスト */}
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto 2rem",
          fontSize: "0.875rem",
          color: colors.text.secondary,
        }}
      >
        <Link
          href="/"
          style={{
            color: colors.text.secondary,
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          ホーム
        </Link>
        <span style={{ margin: "0 0.5rem" }}>›</span>
        <Link
          href="/products"
          style={{
            color: colors.text.secondary,
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          商品一覧
        </Link>
        <span style={{ margin: "0 0.5rem" }}>›</span>
        <span style={{ color: colors.text.light }}>{product.name}</span>
      </nav>

      {/* メインコンテンツ */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        {/* 画像セクション */}
        <div
          style={{
            position: "relative",
            background: colors.white,
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: `0 4px 20px ${colors.shadow}, 0 1px 4px ${colors.shadowMedium}`,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = `0 8px 30px ${colors.shadowMedium}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 4px 20px ${colors.shadow}, 0 1px 4px ${colors.shadowMedium}`;
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4/3",
              borderRadius: "12px",
              overflow: "hidden",
              border: `1px solid ${colors.border.light}`,
            }}
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* バッジ */}
          <div
            style={{
              position: "absolute",
              top: "2.5rem",
              right: "2.5rem",
              background: `linear-gradient(135deg, ${colors.honey}, ${colors.honeyDark})`,
              color: colors.white,
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              fontSize: "0.875rem",
              fontWeight: "600",
              boxShadow: `0 2px 8px ${colors.shadow}`,
            }}
          >
            在庫あり
          </div>

          {/* 数量選択とボタン */}
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* 数量選択 */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: colors.brown,
                  marginBottom: "0.5rem",
                }}
              >
                数量
              </label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: quantity <= 1 ? colors.text.light : colors.brown,
                    background: colors.white,
                    border: `2px solid ${quantity <= 1 ? colors.border.light : colors.border.default}`,
                    borderRadius: "8px",
                    cursor: quantity <= 1 ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (quantity > 1) {
                      e.currentTarget.style.borderColor = colors.honey;
                      e.currentTarget.style.color = colors.honey;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (quantity > 1) {
                      e.currentTarget.style.borderColor = colors.border.default;
                      e.currentTarget.style.color = colors.brown;
                    }
                  }}
                >
                  −
                </button>
                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: colors.text.primary,
                    padding: "0.5rem",
                    background: colors.background,
                    borderRadius: "8px",
                    border: `2px solid ${colors.border.light}`,
                  }}
                >
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "1.25rem",
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

            {/* 購入ボタン */}
            <PurchaseButton product={product} quantity={quantity} />
          </div>
        </div>

        {/* 商品情報セクション */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* タイトルと価格 */}
          <div>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: colors.brown,
                marginBottom: "1rem",
                lineHeight: "1.2",
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "3rem",
                  fontWeight: "700",
                  color: colors.honey,
                  lineHeight: "1",
                }}
              >
                ¥{product.price.toLocaleString()}
              </span>
              <span style={{ fontSize: "1.125rem", color: colors.text.light }}>
                (税込)
              </span>
            </div>

            <div
              style={{
                height: "2px",
                background: `linear-gradient(to right, ${colors.honeyLight}, transparent)`,
                marginBottom: "1.5rem",
              }}
            />
          </div>

          {/* 商品説明 */}
          <div
            style={{
              background: colors.white,
              padding: "2rem",
              borderRadius: "12px",
              border: `1px solid ${colors.border.light}`,
              boxShadow: `0 2px 8px ${colors.shadow}`,
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: colors.brown,
                marginBottom: "1rem",
              }}
            >
              商品説明
            </h2>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.8",
                color: colors.text.primary,
              }}
            >
              {product.description}
            </p>
          </div>

          {/* 商品詳細情報 */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.honeyLight}15, ${colors.background})`,
              padding: "2rem",
              borderRadius: "12px",
              border: `1px solid ${colors.border.light}`,
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: colors.brown,
                marginBottom: "1.5rem",
              }}
            >
              商品詳細
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "内容量", value: "300g" },
                { label: "原産地", value: "日本" },
                { label: "保存方法", value: "常温保存" },
                { label: "賞味期限", value: "製造日より2年" },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    paddingBottom: "1rem",
                    borderBottom:
                      index < 3 ? `1px solid ${colors.border.light}` : "none",
                  }}
                >
                  <span
                    style={{
                      width: "120px",
                      fontWeight: "600",
                      color: colors.text.secondary,
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ color: colors.text.primary }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 配送情報 */}
          <div
            style={{
              background: colors.white,
              padding: "1.5rem",
              borderRadius: "12px",
              border: `2px dashed ${colors.border.default}`,
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
              }}
            >
              🚚
            </div>
            <div>
              <div
                style={{
                  fontWeight: "600",
                  color: colors.brown,
                  marginBottom: "0.25rem",
                }}
              >
                送料無料
              </div>
              <div style={{ fontSize: "0.875rem", color: colors.text.secondary }}>
                全国一律・最短翌日お届け
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
