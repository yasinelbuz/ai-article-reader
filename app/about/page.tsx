import AboutContainer from "@/containers/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ReadNow",
  description:
    "Learn about our mission to help you improve your English reading skills through AI-powered articles.",
};

export default function AboutPage() {
  return (
    <AboutContainer />
  );
}
