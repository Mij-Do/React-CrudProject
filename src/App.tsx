import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import { categories, colors, formInputList, productsList } from "./data";
import Modal from "./components/ui/Modal";
import Input from "./components/ui/Input";
import type { Iproduct } from "./interface";
import { productInputValidation } from "./validation";
import ErrorMsg from "./components/ui/ErrorMsg";
import CircleColors from "./components/ui/CircleColors";
import { uuid } from "./utils/functions";
import Select from "./components/ui/Select";

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
  const [products, setProducts] = useState (productsList);

  const [selected, setSelected] = useState(categories[0]);
  const [tempColor, setTempColor] = useState <string[]> ([]);

  const [isOpen, setIsOpen] = useState(false);

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: '',
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

    const {title, description, imageURL, price, colors} = product;
    const errors = productInputValidation ({
      title,
      description,
      imageURL,
      price,
      colors,
    });

    const hasMsgError = Object.values(errors).some(value => value === '');

    if (!hasMsgError) {
      setErrors(errors);
      return;
    }

    setProducts(prev => [{...product, id: uuid (), colors: tempColor, category: selected}, ...prev]);
    setTempColor([]);
    setProduct(defaultProduct);
    close();
  }
  
  
  const onCancel = () => {
    close();
  }

  // render
  const renderProducts = products.map(product => <ProductCard key={product.id} product={product}/>);

  const renderInputs = formInputList.map(input => 
  <div className="flex flex-col space-y-2" key={input.id}>
    <label className="text-indigo-500" htmlFor={input.id}>{input.label}</label>
    <Input id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandeler}/>
    <ErrorMsg msg={errors[input.name]}/>
  </div>)

  const renderColors = colors.map(colors => 
    <CircleColors key={colors} 
      color={colors} 
      onClick={() => {
        if (tempColor.includes(colors)) {
          setTempColor((prev) => prev.filter(items => items !== colors));
          return;
        }
        setTempColor((prev) => [...prev ,colors])
      }} />)

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

          <div className="my-2">
            <Select selected={selected} setSelected={setSelected}/>
          </div>

          <div className="flex space-x-2 flex-wrap">
            {tempColor.map(colors => 
              <span key={colors} 
                    style={{backgroundColor: colors}} 
                    className="rounded-md text-white block p-1 text-sm mb-1">{colors}
              </span>
            )}
          </div>

          <div className="my-2 flex space-x-2">
            {renderColors}
          </div>
          <div className="mb-2">
            {tempColor.length === 0 ? <ErrorMsg msg={errors.colors}/> : null}
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
