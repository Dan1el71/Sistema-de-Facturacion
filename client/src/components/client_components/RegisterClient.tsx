import Swal from 'sweetalert2'
import { newClient } from '../../api/client'
import { Identification, RegisterClientProps } from '../../types/types'
import RegisterForm from '../RegisterForm'
import { handleApiError } from '../../api/utils'

const RegisterClient = ({ identificationTypes }: RegisterClientProps) => {
  const onSubmit = async (formData: Record<string, string>) => {
    try {
      const { identification, social_reason, state, identification_type } =
        formData

      await newClient({
        identification_type: parseInt(identification_type),
        identification,
        social_reason,
        state,
      })

      const alert = await Swal.fire({
        title: 'Hecho!',
        text: 'Cliente creado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      })

      if (alert.isConfirmed) {
        window.location.reload()
      }
    } catch (err) {
      handleApiError(err, 'El cliente ya existe')
    }
  }

  const fields = [
    {
      name: 'identification_type',
      placeholder: 'Tipo de Identificación',
      type: 'select',
      options: identificationTypes.map((id: Identification) => ({
        value: id.identification_type.toString(),
        label: id.abreviature,
      })),
    },
    { name: 'identification', placeholder: 'Identificación', type: 'number' },
    { name: 'social_reason', placeholder: 'Razón social', type: 'text' },
    { name: 'state', placeholder: 'Estado', type: 'number' },
  ]

  return <RegisterForm fields={fields} onSubmit={onSubmit} />
}

export default RegisterClient
