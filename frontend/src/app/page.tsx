// app/page.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/top/Hero";
import { ProductList } from "@/components/top/ProductList";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProductList />
      <Footer />
    </>
  );
}
