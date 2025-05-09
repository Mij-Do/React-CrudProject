import type { Iproduct } from "../interface";
import { txtLength } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
    product: Iproduct;
}

const ProductCard = ({product}: IProps) => {
    const {title, description, imageURL, price} = product;
    return (
        <div className="border border-gray-400 rounded-md flex flex-col justify-between">
            <Image 
                src={imageURL}
                alt={title}
                className="w-35 h-35 m-auto rounded-md mb-5"
            />

            <div className="p-1">
                <h2 className="mb-5">{title}</h2>
                <p className="mb-5">{txtLength(description, 80)}</p>

                <div className="flex space-x-2 mb-5">
                    <span className="w-5 h-5 rounded-full bg-indigo-500 block cursor-pointer"></span>
                    <span className="w-5 h-5 rounded-full bg-red-500 block cursor-pointer"></span>
                    <span className="w-5 h-5 rounded-full bg-orange-500 block cursor-pointer"></span>
                </div>

                <div className="flex justify-between items-center mb-5">
                    <span className="block text-indigo-400">${price}</span>
                    <Image 
                        src={imageURL}
                        alt={title}
                        className="w-10 h-10 rounded-full object-contain"
                    />
                </div>

                <div className="flex space-x-2">
                    <Button className="bg-indigo-600 hover:bg-indigo-400">Edit</Button>
                    <Button className="bg-red-500 hover:bg-red-400">Delete</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;