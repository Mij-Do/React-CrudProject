import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import { productsList } from "./data";
import Modal from "./components/ui/Modal";

function App() {
  // states
  let [isOpen, setIsOpen] = useState(false);
  
  // handelers
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  
  

  // render
  const renderProducts = productsList.map(product => <ProductCard key={product.id} product={product}/>)

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-500 hover:bg-indigo-400 my-5" onClick={open}>Add New Product</Button>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 ">
        {renderProducts}
      </div>

      {/* add new product */}
      <Modal isOpen={isOpen} onClose={close} title="Add New Product">
        <label htmlFor="">Product Title</label>
        <input type="text" />
      </Modal>  
    </main>
  )
}

export default App
