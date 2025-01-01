import { ReactNode } from "react";
import HighlightedText from "./HighlightedText";

interface MDXContentProps {
  children: ReactNode;
}

const MDXContent = ({ children }: MDXContentProps) => {
  // Eğer children bir string ise HighlightedText'i kullan
  if (typeof children === "string") {
    return <HighlightedText text={children} />;
  }

  return (
    <div className="mdx-content prose prose-invert max-w-none">{children}</div>
  );
};

export default MDXContent;
