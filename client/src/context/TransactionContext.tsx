import React, {useEffect, useState} from "react"
import { ethers } from "ethers"

import {commonSellerAddress, contractABI, contractAddress} from "../utils/contants.tsx"
import useEthAmountParser from "../hooks/useEthAmountParser.tsx";

export const TransactionContext = React.createContext<any>({})

// @ts-ignore
const { ethereum } = window;
const getEthereumContract  = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    return new ethers.Contract(contractAddress, contractABI, signer)
}

export const TransactionProvider = ({ children }: {children: any}) => {
    const [currentAccount, setCurrentAccount] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)
    const [isWalletLoading, setIsWalletLoading] = useState(false)
    const [loadingPageMessage, setLoadingPageMessage] = useState<string|undefined>(undefined)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
    const [transactions, setTransactions] = useState([])
    const [walletBalance, setWalletBalance] = useState<string | Number>('-')

    const handleChange = (e: any, name: string) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    useEffect(() => {
        getWalletBalance()
        getAllTransactions()
    }, [currentAccount]);

    useEffect(() => {
        getWalletBalance()
    }, [transactions]);

    const getAllTransactions = async () => {
        try {
            if (!ethereum) {
                return alert('Please install metamask!')
            }
            const transactionContract = getEthereumContract()
            const availableTransactions = await transactionContract.getAllTransactions()

            setTransactions(
                availableTransactions
                    .filter((transaction: any) => transaction.sender.toUpperCase() === currentAccount.toUpperCase())
                    .map((transaction: any) => ({
                        addressTo: transaction.receiver,
                        addressFrom: transaction.sender,
                        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                        message: transaction.message,
                        keyword: transaction.keyword,
                        amount: useEthAmountParser(transaction.amount._hex, 4)
                    }))
            )
        } catch (error) {
            console.log(error)
        }
    }
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert('Please install metamask!')
            }

            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if (!accounts.length) {
                console.log("No accounts found")
                return
            }
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object")
        }
    }
    const getWalletBalance = async () => {
        if (!currentAccount) {
            return
        }
        const balance = await ethereum.request({ method: 'eth_getBalance', params: [currentAccount] })
        setWalletBalance(useEthAmountParser(balance, 4))
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) {
                return alert('Please install metamask!')
            }
            setIsWalletLoading(true)
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object")
        } finally {
            setIsWalletLoading(false)
        }
    }

    const disconnectedWallet = async () => {
        if(!ethereum) {
            return alert('Please install metamask!')
        }
        await ethereum.request({
            "method": "wallet_revokePermissions",
            "params": [
                {
                    "eth_accounts": {}
                }
            ]
        })
        setCurrentAccount(undefined)
        setWalletBalance('-')
    }

    const checkIfTransactionsExists = async () => {
        try {
            const transactionContract = getEthereumContract()
            const transactionCount = await transactionContract.getTransactionCount()

            window.localStorage.setItem("transactionCount", transactionCount)
        } catch (error) {
            console.log(error)
            throw new Error("No transactions")
        }
    }

    const sendTransaction = async ({ amount, keyword, message }: { amount: string, keyword: string, message: string }) => {
        try {
            if(!ethereum) {
                return alert('Please install metamask!')
            }
            setLoadingPageMessage("Your purchase is being processed")
            const transactionContract = getEthereumContract()
            const parsedAmount = ethers.utils.parseEther(amount)

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: commonSellerAddress,
                    gas: '0x5208', // 21000 GWEI
                    value: parsedAmount._hex
                }]
            })
            const transactionHash = await transactionContract.addToBlockChain(commonSellerAddress, parsedAmount, message, keyword)

            setIsLoading(true)
            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait()
            setIsLoading(false)
            console.log(`Success = ${transactionHash.hash}`)

            const transactionCount = await transactionContract.getTransactionCount()
            setTransactionCount(transactionCount.toNumber())
            getAllTransactions()
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object")
        } finally {
            setLoadingPageMessage(undefined)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
            .then(() => {
                checkIfTransactionsExists()
            })
    }, []);

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            disconnectedWallet,
            currentAccount,
            formData,
            setFormData,
            handleChange,
            sendTransaction,
            isLoading,
            transactionCount,
            transactions,
            walletBalance,
            isWalletLoading,
            loadingPageMessage
        }}>
            {children}
        </TransactionContext.Provider>
    )
}