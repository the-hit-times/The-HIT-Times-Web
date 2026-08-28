export default function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
                {children}
            </div>
        </div>
    );
}