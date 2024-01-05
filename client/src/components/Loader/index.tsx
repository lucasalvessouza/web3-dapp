const Loader = ({ width = 32, color = "red-700" }: { width?: number, color?: string }) => (
    <div className="flex justify-center items-center">
        <div className={`animate-spin  rounded-full h-${width} w-${width} border-b-2 border-${color}`} />
    </div>
);

export default Loader;