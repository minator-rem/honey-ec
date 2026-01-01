'use client';

type ButtonProps = {
  label: string;
  onClick?: () => void;
};

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#F2B705",
        color: "#5A3E1B",
        padding: "12px 20px",
        borderRadius: "8px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
};
