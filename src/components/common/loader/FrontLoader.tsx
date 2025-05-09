export const AnimatedLoader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="relative w-200 h-200 overflow-hidden rounded-2xl shadow-lg flex justify-center items-center mx-4 mt-20 mb-60">
                <video 
                    autoPlay 
                    muted 
                    loop 
                    className="w-full h-full object-cover scale-105"
                >
                    <source src='/tht_loader_1.mp4' type="video/mp4" />
                </video>
            </div>
        </div>
    );
};