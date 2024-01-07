import Swal from 'sweetalert2'
import { newProduct } from '../../api/product'
import { handleApiError } from '../../api/utils'
import RegisterForm from '../RegisterForm'

const RegisterProduct = () => {
  const onSubmit = async (formData: Record<string, string>) => {
    try {
      const { name, state, unit_price } = formData

      await newProduct({
        name,
        state,
        unit_price: parseInt(unit_price),
      })

      const alert = await Swal.fire({
        title: 'Hecho!',
        text: 'Producto creado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      })

      if (alert.isConfirmed) {
        window.location.reload()
      }
    } catch (error) {
      handleApiError(error, 'El producto ya existe')
    }
  }

  const fields = [
    {
      name: 'name',
      placeholder: 'Nombre',
      type: 'text',
    },
    {
      name: 'state',
      placeholder: 'Estado',
      type: 'number',
    },
    {
      name: 'unit_price',
      placeholder: 'Precio Unitario',
      type: 'number',
    },
  ]

  return <RegisterForm fields={fields} onSubmit={onSubmit} />
}
export default RegisterProduct
