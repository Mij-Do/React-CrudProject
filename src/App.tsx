import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import { categories, colors, formInputList, productsList } from "./data";
import Modal from "./components/ui/Modal";
import Input from "./components/ui/Input";
import type { IProduct } from "./interface";
import { productInputValidation, validationColors } from "./validation";
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

  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [products, setProducts] = useState (productsList);

  const [productToEdit, setProductToEdit] = useState <IProduct> (defaultProduct);
  const [productToEditIdx, setProductToEditIdx] = useState <number> (0);

  const [selected, setSelected] = useState(categories[0]);
  const [tempColor, setTempColor] = useState <string[]> ([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);


  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: '',
  });

  const [errorColors, setErrorColors] = useState({
    colors: '',
  });
  
  // handlers
  const open = useCallback(() => setIsOpen(true), []);
  const close = () => setIsOpen(false);

  const openEditModal = useCallback(() => setIsOpenEditModal(true), []);
  const closeEditModal = () => setIsOpenEditModal(false);

  const openConfirmModal = useCallback(() => setIsOpenConfirmModal(true), []);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);


  // add new product
  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setProduct(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));

    setErrorColors(prev => ({
      ...prev,
      [name]: [],
    }));
  }, [])

  const onSubmitHandler = useCallback((event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const {title, description, imageURL, price, colors} = product;
    const errors = productInputValidation ({
      title,
      description,
      imageURL,
      price,
    });
    
    const errorColors = validationColors({
      colors,
    })
    

    const hasMsgError = Object.values(errors).some(value => value === '') 
    && Object.values(errors).every(value => value === '');

    console.log(errorColors)
    console.log(hasMsgError)
    console.log(errors)

    if (!hasMsgError) {
      setErrors(errors);
      setErrorColors(errorColors);
      return;
    }

    setProducts(prev => [{...product, id: uuid (), colors: tempColor, category: selected}, ...prev]);
    setTempColor([]);
    setProduct(defaultProduct);
    close();
    toast('Product Added!');
  }, [])


  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setProductToEdit(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));

    setErrorColors(prev => ({
      ...prev,
      [name]: [],
    }));

  } 

  // edit products
  const onEditSubmitHandler = useCallback((event: FormEvent<HTMLFormElement>): void  => {
    event.preventDefault();

    const {title, description, imageURL, price, colors} = productToEdit;
    const errors = productInputValidation ({
      title,
      description,
      imageURL,
      price,
    });

    const errorColors = validationColors({
      colors,
    })

    const hasMsgError = Object.values(errors).some(value => value === '') 
    && Object.values(errors).every(value => value === '');

    if (!hasMsgError) {
      setErrors(errors);
      setErrorColors(errorColors);
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
  }, [])
  
  
  const onCancel = () => {
    close();
  }

  const removeProducts = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast('Product Removed!')
  }
  
  const onConfirmSubmitHandler = (event: FormEvent<HTMLFormElement>): void  => {
    event.preventDefault();
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
      openConfirmModal={openConfirmModal}
    />);

  const renderInputs = formInputList.map(input => 
    <div className="flex flex-col space-y-2" key={input.id}>
      <label className="text-indigo-500" htmlFor={input.id}>{input.label}</label>
      <Input id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler}/>
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
            <Input id={id} name={name} value={productToEdit[name]} onChange={onChangeEditHandler}/>
            <ErrorMsg msg={errors[name]}/>
          </div>
      )
  }

  return (
    <main className="container mx-auto">
      <Button fullWidth variant={"default"} className="my-3" onClick={open}>Add New Product</Button>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 ">
        {renderProducts}
      </div>

      {/* Add new product */}
      <Modal isOpen={isOpen} onClose={close} title="Add New Product">
        <form onSubmit={onSubmitHandler}>
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

          <div className="my-3">
            {tempColor.length === 0 ? <ErrorMsg msg={errorColors.colors}/> : null}
          </div>  

          <div className="flex space-x-2">
            <Button className="bg-indigo-600 hover:bg-indigo-400">Submit</Button>
            <Button className="bg-gray-600 hover:bg-gray-400" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </Modal>  


      {/* Edit product */}
      <Modal isOpen={isOpenEditModal} onClose={closeEditModal} title="Edit Product">
        <form onSubmit={onEditSubmitHandler}>
          
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
            <Button className="bg-indigo-600 hover:bg-indigo-400">Update</Button>
            <Button className="bg-gray-600 hover:bg-gray-400" onClick={closeEditModal}>Cancel</Button>
          </div>
        </form>
      </Modal> 


      {/* confirm delete product */}
      <Modal isOpen={isOpenConfirmModal} onClose={closeConfirmModal} title="Confirm Delete Product">
        <form onSubmit={onConfirmSubmitHandler}>
          
          <div className="my-3">
            <p className="text-indigo-400">Are You Sure That You Want to Remove This Product?</p>
          </div>
          
          <div className="flex space-x-2">
            <Button className="bg-red-600 hover:bg-red-400" onClick={removeProducts}>Delete</Button>
            <Button className="bg-gray-600 hover:bg-gray-400" onClick={closeConfirmModal}>Cancel</Button>
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
