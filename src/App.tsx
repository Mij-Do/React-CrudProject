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
import type { TProductName } from "./types";
import toast, { Toaster } from 'react-hot-toast';

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

  const [productToEdit, setProductToEdit] = useState <Iproduct> (defaultProduct);
  const [productToEditIdx, setProductToEditIdx] = useState <number> (0);

  const [selected, setSelected] = useState(categories[0]);
  const [tempColor, setTempColor] = useState <string[]> ([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

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

  const openEditModal = () => setIsOpenEditModal(true);
  const closeEditModal = () => setIsOpenEditModal(false);

  // add new produc
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
    toast('Product Added!');
  }


  // edit products
  const onChangeEditHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });

  } 

  const onEditSubmitHandeler = (event: FormEvent<HTMLFormElement>): void  => {
    event.preventDefault();

    const {title, description, imageURL, price, colors} = productToEdit;
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

  // Update Products 
    const updateProducts = [...products];
    updateProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColor.concat(productToEdit.colors),
      category: productToEdit.category,
    };

    setProducts(updateProducts);

    setProductToEdit(defaultProduct);
    setTempColor([]);
    closeEditModal();
    toast('Product Updated!');
  }
  
  
  const onCancel = () => {
    close();
  }

  const removeProducts = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    toast('Product Removed!');
  }

  // render
  const renderProducts = products.map((product, idx) => 
    <ProductCard 
      key={product.id} 
      product={product}
      openEditModal={openEditModal}
      setProductToEdit={setProductToEdit}
      setProductToEditIdx={setProductToEditIdx}
      idx={idx}
      removeProducts={removeProducts}
    />);

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
          setTempColor(prev => prev.filter(items => items !== colors));
          return;
        }
        if (productToEdit.colors.includes(colors)) {
          setTempColor(prev => prev.filter(items => items !== colors));
          return;
        }
        setTempColor((prev) => [...prev ,colors])
      }} />)

  const renderProductWithErrorMsg = (id: string, label: string, name: TProductName) => {
      return (
        <div className="flex flex-col space-y-2" key={id}>
            <label className="text-indigo-500" htmlFor={id}>{label}</label>
            <Input id={id} name={name} value={productToEdit[name]} onChange={onChangeEditHandeler}/>
            <ErrorMsg msg={errors[name]}/>
          </div>
      )
  }

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-500 hover:bg-indigo-400 my-5" onClick={open}>Add New Product</Button>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 ">
        {renderProducts}
      </div>

      {/* Add new product */}
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


      {/* Edit product */}
      <Modal isOpen={isOpenEditModal} onClose={closeEditModal} title="Edit Product">
        <form onSubmit={onEditSubmitHandeler}>
          
          <div className="my-2">
            {renderProductWithErrorMsg('title', 'Product Title', 'title')}
            {renderProductWithErrorMsg('description', 'Product Description', 'description')}
            {renderProductWithErrorMsg('imageURL', 'Product ImageURL', 'imageURL')}
            {renderProductWithErrorMsg('price', 'Product Price', 'price')}
          </div>

          <div className="my-4">
            <Select selected={productToEdit.category} setSelected={(value => setProductToEdit({...productToEdit, category: value}))}/>
          </div>

          <div className="flex space-x-2 flex-wrap">
            {tempColor.concat(productToEdit.colors).map(colors => 
              <span key={colors} 
                    style={{backgroundColor: colors}} 
                    className="rounded-md text-white block p-1 text-sm mb-1">{colors}
              </span>
            )}
          </div>
          <div className="my-2 flex space-x-2">
            {renderColors}
          </div>
          
          <div className="flex space-x-2">
            <Button className="bg-indigo-500 hover:bg-indigo-400">Update</Button>
            <Button className="bg-gray-500 hover:bg-gray-400" onClick={closeEditModal}>Cancel</Button>
          </div>
        </form>
      </Modal> 
      <Toaster 
        toastOptions={{
          style: {
            backgroundColor: "black",
            color: "white",
          },
        }}
      />
    </main>
  )
}

export default App;
