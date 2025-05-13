import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import { colors, formInputList, productsList } from "./data";
import Modal from "./components/ui/Modal";
import Input from "./components/ui/Input";
import type { Iproduct } from "./interface";
import { productInputValidation } from "./validation";
import ErrorMsg from "./components/ui/ErrorMsg";
import CircleColors from "./components/ui/CircleColors";

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
  const [tempColor, setTempColor] = useState <string[]> ([]);
  console.log(tempColor)
  const [isOpen, setIsOpen] = useState(false);

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: '',
  });
  
  // handelers
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const onChangeHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });

  } 

  const onSubmitHandeler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const {title, description, imageURL, price} = product;
    const errors = productInputValidation ({
      title,
      description,
      imageURL,
      price,
    });

    const hasMsgError = Object.values(errors).some(value => value === '') &&
                        Object.values(errors).every(value => value === '');

    if (!hasMsgError) {
      setErrors(errors);
      return;
    }

    
    setProduct(defaultProduct);
    close();
  }
  
  
  const onCancel = () => {
    close();
  }

  // render
  const renderProducts = productsList.map(product => <ProductCard key={product.id} product={product}/>);

  const renderInputs = formInputList.map(input => 
  <div className="flex flex-col space-y-2" key={input.id}>
    <label className="text-indigo-500" htmlFor={input.id}>{input.label}</label>
    <Input id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandeler}/>
    <ErrorMsg msg={errors[input.name]}/>
  </div>)

  const renderColors = colors.map(colors => <CircleColors key={colors} color={colors} onClick={() => setTempColor((prev) => [...prev ,colors])}/>)

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

          <div className="my-2 flex space-x-2">
            {renderColors}
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

export default App;
