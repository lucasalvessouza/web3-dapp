import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext.tsx";
import { Loader } from "../index.tsx";


const PageLoading = () => {
    const { loadingPageMessage } = useContext(TransactionContext)
    return (loadingPageMessage &&
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <Loader width={12} color="white" />
            <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
            <p className="w-1/3 text-center text-white">{loadingPageMessage}</p>
        </div>
    )
}

export default PageLoading