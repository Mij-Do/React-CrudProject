import { useSelector } from "react-redux";
import { cartSelector } from "../app/cart/cartSlice";
import Button from "./ui/Button";

interface IProps {
    open: () => void;
}

const Navbar = ({open}: IProps) => {
    const {cartItems} = useSelector(cartSelector);
    return (
        <nav className="my-5 bg-indigo-600 p-2 rounded-md text-white">
            <ul className="uppercase flex flex-col md:flex-row space-y-5 md:space-y-0 justify-between items-center md:space-x-5">
                <li className="cursor-pointer bg-white text-indigo-700 p-2 rounded-md hover:bg-indigo-200">Cart: {cartItems.length}</li>
                <li><Button fullWidth variant={"default"} className="my-1" onClick={open}>Add New Product</Button></li>
            </ul>
        </nav>
    )
}

export default Navbar;