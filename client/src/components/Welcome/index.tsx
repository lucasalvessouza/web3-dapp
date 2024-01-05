import { AiFillPlayCircle } from 'react-icons/ai'
import { PiPlugsConnectedBold } from 'react-icons/pi'
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'

import { TransactionContext } from '../../context/TransactionContext.tsx'

import { Loader } from '../index.tsx'
import { useContext } from "react";
import {shortenAddress} from "../../utils/shortenAddress.ts";


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const getButtonIcon = (currentAccount: string) => {
    return !currentAccount
        ? <AiFillPlayCircle className="text-white mr-2" />
        : <PiPlugsConnectedBold className="text-white mr-2" />
}
const getButtonText = (currentAccount: string) => {
    return (
        <p className="text-white text-base font-semibold">
            {!currentAccount
                ? "Connect Wallet"
                : "Wallet Connected"}
        </p>
    )
}

const getButtonBackground = (currentAccount: string) => !currentAccount ? 'bg-blue-500 hover:bg-blue-600' : 'bg-violet-500 hover:bg-violet-600'

const Welcome = () => {
    const {
        connectWallet,
        currentAccount,
        disconnectedWallet,
        isWalletLoading
    } = useContext(TransactionContext)

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Fast Marketplace <br/> using Crypto
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy a marketplace easily and directly on CryptoCart.
                    </p>

                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                            Reliability
                        </div>
                        <div className={companyCommonStyles}>Security</div>
                        <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={companyCommonStyles}>Low Fees</div>
                        <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <button
                            type="button"
                            onClick={!currentAccount ? connectWallet : disconnectedWallet}
                            className={`flex flex-row justify-center items-center my-5 ${getButtonBackground(currentAccount)} p-3 rounded-full cursor-pointer w-full`}
                        >

                            {isWalletLoading
                                ? <Loader width={6} color="white"/>
                                :
                                <>
                                    {getButtonIcon(currentAccount)}
                                    {getButtonText(currentAccount)}
                                </>

                            }
                        </button>
                        <div
                            className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-85 w-full my-5 eth-card .white-glassmorphism ">
                            <div className="flex justify-between flex-col w-full h-full">
                                <div className="flex justify-between items-start">
                                    <div
                                        className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                        <SiEthereum fontSize={21} color="#fff"/>
                                    </div>
                                    <BsInfoCircle fontSize={17} color="#fff"/>
                                </div>
                                <div>
                                    <p className="text-white font-light text-sm">
                                        {currentAccount && shortenAddress(currentAccount)}
                                    </p>
                                    <p className="text-white font-semibold text-lg mt-1">
                                        Ethereum
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">*/}
                    {/*    <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange}/>*/}
                    {/*    <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>*/}
                    {/*    <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange}/>*/}
                    {/*    <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange}/>*/}

                    {/*    <div className="h-[1px] w-full bg-gray-400 my-2"/>*/}

                    {/*    {isLoading*/}
                    {/*        ? <Loader/>*/}
                    {/*        : (*/}
                    {/*            <button*/}
                    {/*                type="button"*/}
                    {/*                onClick={handleSubmit}*/}
                    {/*                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"*/}
                    {/*            >*/}
                    {/*                Send now*/}
                    {/*            </button>*/}
                    {/*        )}*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
};

export default Welcome;