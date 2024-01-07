import ProductSearch from '../components/products_components/ProductSearch'
import RegisterProduct from '../components/products_components/RegisterProduct'
import ToggleSection from '../components/ToggleSection'

const ProdutsPage = () => {
  return (
    <div className="flex-auto overflow-y-scroll h-screen">
      <div className="text-center m-2 ">
        <h1 className="text-xl font-semibold p-4">Productos</h1>
      </div>
      <div id="Consultar">
        <ToggleSection title="Consultar producto" icon="pr-2 bi bi-search">
          <ProductSearch />
        </ToggleSection>
      </div>
      <div id="Registrar">
        <ToggleSection title="Registrar producto" icon="pr-2 bi bi-person-plus">
          <RegisterProduct />
        </ToggleSection>
      </div>
    </div>
  )
}
export default ProdutsPage
