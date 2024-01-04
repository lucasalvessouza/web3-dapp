import React, {useEffect, useState} from "react"
import { ethers } from "ethers"

import { contractABI, contractAddress } from "../utils/contants.tsx"

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
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
    const [transactions, setTransactions] = useState([])

    const handleChange = (e: any, name: string) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) {
                return alert('Please install metamask!')
            }
            const transactionContract = getEthereumContract()
            const availableTransactions = await transactionContract.getAllTransactions()
            setTransactions(
                availableTransactions.map((transaction: any) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) * (10 ** 18)
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
            getAllTransactions()
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object")
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) {
                return alert('Please install metamask!')
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object")
        }
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

    const sendTransaction = async () => {
        try {
            if(!ethereum) {
                return alert('Please install metamask!')
            }
            const { addressTo, amount, keyword, message } = formData
            const transactionContract = getEthereumContract()
            const parsedAmount = ethers.utils.parseEther(amount)

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 GWEI
                    value: parsedAmount._hex
                }]
            })
            const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword)

            setIsLoading(true)
            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait()
            setIsLoading(false)
            console.log(`Success = ${transactionHash.hash}`)

            const transactionCount = await transactionContract.getTransactionCount()
            setTransactionCount(transactionCount.toNumber())

            window.location.reload()
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
        checkIfTransactionsExists()
    }, []);

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAccount,
            formData,
            setFormData,
            handleChange,
            sendTransaction,
            isLoading,
            transactionCount,
            transactions
        }}>
            {children}
        </TransactionContext.Provider>
    )
}