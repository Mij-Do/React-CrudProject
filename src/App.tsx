import ProductCard from "./components/ProductCard"
import Button from "./components/ui/Button"
import { productsList } from "./data"

function App() {

  // render
  const renderProducts = productsList.map(product => <ProductCard key={product.id} product={product}/>)

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-500 hover:bg-indigo-400 my-5">Add New Product</Button>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-1 ">
        {renderProducts}
      </div>
    </main>
  )
}

export default App
