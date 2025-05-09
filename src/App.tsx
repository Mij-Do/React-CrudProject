import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import { formInputList, productsList } from "./data";
import Modal from "./components/ui/Modal";
import Input from "./components/ui/Input";


function App() {
  // states
  let [isOpen, setIsOpen] = useState(false);
  
  // handelers
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  
  

  // render
  const renderProducts = productsList.map(product => <ProductCard key={product.id} product={product}/>);

  const renderInputs = formInputList.map(input => 
  <div className="flex flex-col space-y-2">
    <label className="text-indigo-500" htmlFor={input.id}>{input.label}</label>
    <Input id={input.id} name={input.name}/>
  </div>)

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-500 hover:bg-indigo-400 my-5" onClick={open}>Add New Product</Button>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 ">
        {renderProducts}
      </div>

      {/* add new product */}
      <Modal isOpen={isOpen} onClose={close} title="Add New Product">
        <form>
          {renderInputs}

        </form>
      </Modal>  
    </main>
  )
}

export default App
