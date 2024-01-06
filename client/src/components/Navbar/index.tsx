import { useContext, useState } from "react"
import { HiMenuAlt4 } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"

import logo from "../../../images/logo.png"
import { TransactionContext } from "../../context/TransactionContext.tsx";

const NavbarItem = ({ title, classProps, href, target }: { title: string, href: string, classProps?: string, target?: string }) => {
    return (
        <a href={href} target={target}>
            <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
        </a>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false)
    const {walletBalance} = useContext(TransactionContext)
    const navbarItems = [
        {
            title: "My Wallet",
            href: "#wallet"
        },
        {
            title: "Products",
            href: "#products"
        },
        {
            title: "Transactions",
            href: "#transactions"
        },
        {
            title: "Github Repo",
            id: "github",
            href: "https://github.com/lucasalvessouza/web3-dapp ",
            target: "_blank"
        },
        {
            title: "Linkedin",
            id: "linkedin",
            href: "https://www.linkedin.com/in/lucas-alves-s/",
            target: "_blank"
        }
    ]
    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt={"logo"} className="w-32 cursor-pointer" />
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {navbarItems.map((item: any, index: number) => (
                    <NavbarItem title={item.title} href={item.href} key={item + index} target={item.target} />
                ))}
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] font-bold">
                    ETH: {walletBalance}
                </li>
            </ul>
            <div className="flex relative">
                {toggleMenu
                    ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                    : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />}
                {toggleMenu && (
                    <ul
                        className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                      flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
                    >
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose onClick={() => setToggleMenu(false)}/>
                        </li>
                        {navbarItems.map((item: any, index: number) => (
                            <NavbarItem title={item.title} href={item.href} key={item + index} target={item.target} classProps="my-2 text-lg" />
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    )
};

export default Navbar;