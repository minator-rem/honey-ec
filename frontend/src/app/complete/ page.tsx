'use client';

import { useParams } from "next/navigation";

export default function PurchasePage() {
  const params = useParams();
  const productId = params.id;

  return <div>商品ID: {productId} を購入中...</div>;
}
