// components/top/ProductList.tsx
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const products = [
    { id: 1, name: "アカシアはちみつ", price: 1200 },
    { id: 2, name: "百花はちみつ", price: 1000 },
    { id: 3, name: "れんげはちみつ", price: 1500 },
  ];

  return (
    <section style={{ padding: "40px 32px" }}>
      <h2 style={{ marginBottom: "24px" }}>商品一覧</h2>
      <div style={{ display: "flex", gap: "24px" }}>
        {products.map((p) => (
          <ProductCard key={p.id} name={p.name} price={p.price} />
        ))}
      </div>
    </section>
  );
};
