'use client';

import { Button } from "@/components/common/Button";

export const Hero = () => {
  return (
    <section
      style={{
        padding: "80px 32px",
        backgroundColor: "#FFE08A",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "36px", color: "#5A3E1B" }}>
        自然の恵み、はちみつをあなたへ
      </h2>
      <p style={{ margin: "24px 0", color: "#5A3E1B" }}>
        厳選された国産はちみつを産地直送でお届けします
      </p>
      <Button label="商品を見る" />
    </section>
  );
};
