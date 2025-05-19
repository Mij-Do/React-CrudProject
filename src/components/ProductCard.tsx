import type { Iproduct } from "../interface";
import { txtLength } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColors from "./ui/CircleColors";

interface IProps {
    product: Iproduct;
    openEditModal: () => void;
    setProductToEdit: (product: Iproduct) => void;
    setProductToEditIdx: (value: number) => void;
    idx: number;
    openConfirmModal: () => void;
}

const ProductCard = ({product, openEditModal, setProductToEdit, setProductToEditIdx, idx, openConfirmModal}: IProps) => {
    const {title, description, imageURL, price, colors, category} = product;

    const renderColors = colors.map(colors => 
        <CircleColors key={colors} 
            color={colors} 
        />)

    const onEdit = () => {
        setProductToEdit(product);
        openEditModal();
        setProductToEditIdx(idx);
    }

    const onRemove = () => {
        setProductToEdit(product);
        openConfirmModal();
    }
    return (
        <div className="border border-gray-400 rounded-md flex flex-col justify-between">
            <Image 
                src={imageURL}
                alt={title}
                className="w-40 h-40 m-auto rounded-md mb-1"
            />

            <div className="p-1">
                <h2 className="mb-5">{title}</h2>
                <p className="mb-5">{txtLength(description, 80)}</p>

                <div className="flex space-x-2 mb-5">
                    {renderColors}
                </div>

                <div className="flex justify-between items-center mb-5">
                    <span className="block text-indigo-400">${price}</span>
                    <Image 
                        src={category.imageURL || imageURL}
                        alt={title}
                        className="w-10 h-10 rounded-full object-contain"
                    />
                </div>

                <div className="flex space-x-2">
                    <Button className="bg-indigo-600 hover:bg-indigo-400" onClick={onEdit}>Edit</Button>
                    <Button className="bg-red-600 hover:bg-red-400" onClick={onRemove}>Delete</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;