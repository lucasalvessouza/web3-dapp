import { useContext } from "react";
import { FaEthereum, FaDollarSign, FaCartArrowDown } from 'react-icons/fa'

import { TransactionContext } from "../../context/TransactionContext";

import products from "../../utils/dummyData.ts"

import { ProductStars } from "../index.tsx";
import useEthToUsd from "../../hooks/useEthToUsd.tsx";

type ProductType = {
    sku: string,
    image: string,
    seller: string,
    amount: string,
    title: string,
}

type ProductCardType = ProductType & {
    buyProduct: (sku: string) => void
}
const ProductCard = ({ sku, image, amount, title, buyProduct }: ProductCardType) => {
    return (
        <div
            className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transform transition duration-500 hover:scale-105">
            <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                <img
                    className="object-cover"
                    src={image}
                    alt="product image"/>
            </a>
            <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl tracking-tight text-slate-900">{title}</h5>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <div className="flex-col">
                        <div className="flex items-center">
                            <FaEthereum className="text-black w-6 h-6 mr-2" />
                            <span className="text-2xl font-bold text-slate-900">{amount}</span>
                            {/*<span className="text-sm text-slate-900 line-through">$699</span>*/}
                        </div>
                        <div className="flex items-center">
                            <FaDollarSign className="text-black w-6 h-6 mr-2"/>
                            <span className="text-2xl font-bold text-slate-900">{useEthToUsd(amount)}</span>
                        </div>
                    </div>
                    <ProductStars numberOfStars={5}/>
                </div>
                <button
                   className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                   onClick={() => buyProduct(sku)}
                >
                    <FaCartArrowDown className="text-white w-6 h-6 mr-3" />
                    Buy this product
                </button
                >
            </div>
        </div>
    );
};

const Products = () => {
    const { sendTransaction } = useContext(TransactionContext);

    const buyProduct = async (sku: string) => {
        const product = products.find((product: ProductType) => product.sku === sku)
        if (!product) {
            return
        }
        const {
            amount,
            sku: keyword,
            title: message
        } = product
        sendTransaction({
            amount,
            keyword,
            message
        }).then(() => alert(`Woot woot! Your order is on its way!`))
    }

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                <h3 className="text-white text-3xl text-center my-2">
                    Products
                </h3>

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {products.map((product: ProductType) => (
                        <ProductCard key={product.sku} {...product} buyProduct={buyProduct}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;