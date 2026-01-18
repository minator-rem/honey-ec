import { Product } from "@/types/product";
import Link from "next/link";
import { colors } from "@/styles/colors";
import { Header } from "@/components/layout/Header";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";

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

export async function generateStaticParams() {
  // 本来はAPIやDBから取得（AWS S3での静的生成に必要）
  const products: Product[] = [
    {
      id: "1",
      name: "国産はちみつ",
      description: "自然豊かな環境で採れた純粋はちみつ",
      price: 1200,
      imageUrl: "/honeyEC/honey1.jpeg",
    },
    {
      id: "2",
      name: "アカシアはちみつ",
      description: "自然豊かな環境で採れた純粋はちみつ",
      price: 1500,
      imageUrl: "/honeyEC/honey1.jpeg",
    },
  ];

  return products.map((product) => ({
    id: product.id,
  }));
}

const ProductDetailPage = async ({ params }: Props) => {
  const product = await fetchProduct(params.id);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(to bottom, ${colors.background}, ${colors.white})`,
      }}
    >
      <Header />

      <div style={{ padding: "2rem 1rem" }}>
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
            }}
          >
            商品一覧
          </Link>
          <span style={{ margin: "0 0.5rem" }}>›</span>
          <span style={{ color: colors.text.light }}>{product.name}</span>
        </nav>

        {/* メインコンテンツ（Client Component） */}
        <ProductDetailClient product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
