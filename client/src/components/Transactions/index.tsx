import { useContext } from "react";

import { TransactionContext } from "../../context/TransactionContext";

import { shortenAddress } from "../../utils/shortenAddress";
import products from "../../utils/dummyData.ts"
import { FaCalendarCheck, FaEthereum } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";

type TransactionCardType = {
    addressTo: string,
    addressFrom: string,
    timestamp: string,
    message: string,
    keyword: string,
    amount: string,
    url: string
}
const TransactionsCard = ({ addressTo, timestamp, keyword, amount }: TransactionCardType) => {
    const product = products.find(product => product.sku === keyword)

    if (!product) {
        return
    }

    const {
        image,
        title,
    } = product

    return (
        <div
            className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transform transition duration-500 hover:scale-105"
            id="transactions">
            <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                <img
                    className="object-cover"
                    src={image}
                    alt="product image"/>
                <span
                    className="absolute top-0 left-0 m-2 px-2 text-center text-sm font-medium text-green-500">
                    <FaCircleCheck className="w-12 h-12"/>
                </span>
            </a>
            <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl tracking-tight text-slate-900">{title}</h5>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <div className="flex-col">
                        <div className="flex items-center my-3">
                            <FaEthereum className="text-black w-6 h-6 mr-2"/>
                            <span className="text-1xl font-bold text-slate-900">{amount}</span>
                            {/*<span className="text-sm text-slate-900 line-through">$699</span>*/}
                        </div>
                        <div className="flex items-center my-3">
                            <FaCalendarCheck className="text-black w-6 h-6 mr-2"/>
                            <span className="text-1xl font-bold text-slate-900">{timestamp}</span>
                            {/*<span className="text-sm text-slate-900 line-through">$699</span>*/}
                        </div>
                        <div className="flex items-center my-3">
                            <IoPersonCircle className="text-black w-6 h-6 mr-2"/>
                            <span className="text-1xl font-bold text-slate-900">Seller address: {shortenAddress(addressTo)}</span>
                            {/*<span className="text-sm text-slate-900 line-through">$699</span>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const Transactions = () => {
    const {transactions, currentAccount} = useContext(TransactionContext);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
            {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">
                        Latest Transactions
                    </h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">
                        Connect your account to see the latest transactions
                    </h3>
                )}

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {[...transactions].reverse().map((transaction, i) => (
                        <TransactionsCard key={i} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Transactions;