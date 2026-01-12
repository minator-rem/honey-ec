'use client';

import Link from 'next/link';
import Image from "next/image";

type Props = {
  id: number;
  name: string;
  price: number;
  imageBase64: string;
};

export const ProductCard = ({ id, name, price, imageBase64 }: Props) => {
  return (
    <div
      style={{
        border: "1px solid #FFE08A",
        borderRadius: "12px",
        padding: "16px",
        width: "240px",
        backgroundColor: "#FFF",
      }}
    >
      {/* 画像 */}
      <Link href={`/products/${id}`}>
        <div
          style={{
            position: "relative",
            height: "160px",
            borderRadius: "8px",
            marginBottom: "12px",
            cursor: "pointer",
            overflow: "hidden",
          }}
        >
        <Image
          src="/honeyEC/honey1.jpeg"
          alt="はちみつ"
          fill
          style={{
            objectFit: "cover",
          }}
        />
        </div>
      </Link>

      {/* 商品名 */}
      <Link href={`/products/${id}`}>
        <h3 style={{ cursor: "pointer" }}>{name}</h3>
      </Link>

      <p>¥{price.toLocaleString()}</p>
    </div>
  );
};
