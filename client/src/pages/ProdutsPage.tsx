import { useState } from 'react'
import ProductSearch from '../components/products_components/ProductSearch'

const ProdutsPage = () => {
  const [modal, setModal] = useState(true)

  return (
    <div className="flex-auto overflow-y-scroll h-screen">
      <div className="text-center m-2 ">
        <h1 className="text-xl font-semibold p-4">Productos</h1>
      </div>
      <div id="Consultar" className="mx-12 my-4">
        <div
          onClick={() => setModal(!modal)}
          className="flex cursor-pointer w-fit"
        >
          <i className="pr-2 bi bi-search" />
          <h2>Consultar producto</h2>
          <button className="px-2">
            {modal ? (
              <i className="bi bi-caret-up-fill" />
            ) : (
              <i className="bi bi-caret-down-fill" />
            )}
          </button>
        </div>
        {modal && (
          <>
            <ProductSearch />
          </>
        )}
      </div>
    </div>
  )
}
export default ProdutsPage
