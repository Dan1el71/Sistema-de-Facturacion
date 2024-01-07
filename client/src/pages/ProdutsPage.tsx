import ProductSearch from '../components/products_components/ProductSearch'
import RegisterProduct from '../components/products_components/RegisterProduct'
import UpdateProduct from '../components/products_components/UpdateProduct'
import ToggleSection from '../components/ToggleSection'

const ProdutsPage = () => {
  return (
    <div className="flex-auto overflow-y-scroll h-screen">
      <div className="text-center m-2 ">
        <h1 className="text-xl font-semibold p-4">Productos</h1>
      </div>
      <div id="Consultar">
        <ToggleSection title="Consultar producto" icon="bi bi-search">
          <ProductSearch />
        </ToggleSection>
      </div>
      <div id="Registrar">
        <ToggleSection title="Registrar producto" icon="bi bi-person-plus">
          <RegisterProduct />
        </ToggleSection>
      </div>
      <div id="Modificar">
        <ToggleSection title="Modificar producto" icon="bi bi-pencil">
          <UpdateProduct />
        </ToggleSection>
      </div>
    </div>
  )
}
export default ProdutsPage
