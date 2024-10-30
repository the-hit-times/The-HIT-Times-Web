import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ToastContainer theme="dark" />
      <Suspense fallback={<p>Loading...</p>}>
        <div className="sm:my-8">{children}</div>
      </Suspense>
    </div>
  );
}
