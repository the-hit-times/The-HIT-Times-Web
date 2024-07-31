import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Not Found | The HIT Times",
    description: "The official website of the The HIT Times.",
  };

export default function NotFound() {
    return (
        <div className="min-h-screen">Page your trying to visit does not exists.</div>
    );
}