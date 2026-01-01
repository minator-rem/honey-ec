// components/top/ProductCard.tsx
type Props = {
  name: string;
  price: number;
};

export const ProductCard = ({ name, price }: Props) => {
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
      <div
        style={{
          height: "160px",
          backgroundColor: "#FFF3C4",
          borderRadius: "8px",
          marginBottom: "12px",
        }}
      />
      <h3>{name}</h3>
      <p>¥{price.toLocaleString()}</p>
    </div>
  );
};
