import Image from "./Image";
import Button from "./ui/Button";

const ProductCard = () => {
    return (
        <div className="border border-gray-400 rounded-md flex flex-col justify-between">
            <Image 
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" 
                alt="Girl with a Camera"
                className="w-full rounded-md mb-5"
                />
            <div className="p-1">
                <h2 className="mb-5">Product Title</h2>
                <p className="mb-5">Product Description</p>

                <div className="flex space-x-2 mb-5">
                    <span className="w-5 h-5 rounded-full bg-indigo-500 block cursor-pointer"></span>
                    <span className="w-5 h-5 rounded-full bg-red-500 block cursor-pointer"></span>
                    <span className="w-5 h-5 rounded-full bg-orange-500 block cursor-pointer"></span>
                </div>

                <div className="flex justify-between items-center mb-5">
                    <span className="block text-indigo-400">$5,000</span>
                    <Image 
                    src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" 
                    alt="Girl with a Camera"
                    className="rounded-full w-10 h-10 object-contain"
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