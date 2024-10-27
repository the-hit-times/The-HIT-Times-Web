import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>
        <ToastContainer theme='dark'/>
        <div>
            {children}
        </div>
    </div>;
}