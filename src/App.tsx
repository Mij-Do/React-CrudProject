import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import { formInputList, productsList } from "./data";
import Modal from "./components/ui/Modal";
import Input from "./components/ui/Input";
import type { Iproduct } from "./interface";

function App() {
    const defaultProduct = {
    id: '',
    title: '',
    price: '',
    description: '',
    imageURL: '',
    category: {
      name: '',
      imageURL: '',
    },
    colors: [],
  }
  // states
  const [product, setProduct] = useState<Iproduct>(defaultProduct);
  const [isOpen, setIsOpen] = useState(false);
  
  // handelers
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const onChangeHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  } 

  const onSubmitHandeler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setProduct(defaultProduct);
    close();
  }
  
  
  const onCancel = () => {
    event?.preventDefault();
    close();
  }
  // render
  const renderProducts = productsList.map(product => <ProductCard key={product.id} product={product}/>);

  const renderInputs = formInputList.map(input => 
  <div className="flex flex-col space-y-2">
    <label className="text-indigo-500" htmlFor={input.id}>{input.label}</label>
    <Input id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandeler}/>
  </div>)

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-500 hover:bg-indigo-400 my-5" onClick={open}>Add New Product</Button>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 ">
        {renderProducts}
      </div>

      {/* add new product */}
      <Modal isOpen={isOpen} onClose={close} title="Add New Product">
        <form onSubmit={onSubmitHandeler}>
          <div className="my-2">
            {renderInputs}
          </div>

          <div className="flex space-x-2">
            <Button className="bg-indigo-500 hover:bg-indigo-400">Submit</Button>
            <Button className="bg-gray-500 hover:bg-gray-400" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </Modal>  
    </main>
  )
}

export default App
