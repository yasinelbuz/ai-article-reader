import { cn } from "@/utils";
import React from "react";


export type DividerProps = {
  direction?: "horizontal" | "vertical";
  thickness?: "thin" | "normal" | "thick" | number; // tailwind veya px
  color?: "gray" | "red" | "blue" | "green" | string;
  length?: string; // px, %, rem, tailwind class olabilir
  margin?: string; // tailwind classlar veya css değerleri
  styleType?: "solid" | "dashed" | "dotted";
  className?: string;
  fullLength?: boolean;
};

const thicknessMap = {
  thin: "border-t-[1px]",
  normal: "border-t-[2px]",
  thick: "border-t-[4px]",
};

const colorMap = {
  gray: "border-gray-300",
  red: "border-red-500",
  blue: "border-blue-500",
  green: "border-green-500",
};

const styleTypeMap = {
  solid: "",
  dashed: "border-dashed",
  dotted: "border-dotted",
};

export const Divider: React.FC<DividerProps> = ({
  direction = "horizontal",
  thickness = "normal",
  color = "gray",
  length = "100%",
  margin,
  styleType = "solid",
  className,
  fullLength = false,
}) => {
  const isHorizontal = direction === "horizontal";

  const baseThickness =
    typeof thickness === "number" ? `border-${isHorizontal ? "t" : "l"}-[${thickness}px]` : thicknessMap[thickness] || thicknessMap.normal;

  const baseColor = colorMap[color as keyof typeof colorMap] || `border-[${color}]`;

  const baseStyle = styleTypeMap[styleType] || "";

  // length & margin inline styles fallback için
  const inlineStyles: React.CSSProperties = {
    width: isHorizontal ? (fullLength ? "100%" : length) : undefined,
    height: !isHorizontal ? (fullLength ? "100%" : length) : undefined,
    margin: margin,
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        baseThickness,
        baseColor,
        baseStyle,
        isHorizontal ? "border-t" : "border-l",
        className
      )}
      style={inlineStyles}
    />
  );
};
