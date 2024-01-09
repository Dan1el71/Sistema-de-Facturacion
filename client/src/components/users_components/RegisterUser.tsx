import Swal from 'sweetalert2'
import { handleApiError } from '../../api/utils'
import RegisterForm from '../RegisterForm'
import { newUser } from '../../api/user'

type Props = {
  profile: {
    id_profile: number
    name: string
  }[]
}

const RegisterUser = ({ profile }: Props) => {
  const onSubmit = async (formData: Record<string, string>) => {
    const { name, middle_name, user, id_profile, password } = formData
    try {
      await newUser({
        name,
        middle_name,
        password,
        user,
        id_profile: parseInt(id_profile),
      })

      const alert = await Swal.fire({
        title: 'Hecho!',
        text: 'Usuario creado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      })

      if (alert) {
        window.location.reload()
      }
    } catch (error) {
      handleApiError(error)
    }
  }

  const fields = [
    {
      name: 'name',
      placeholder: 'Nombre',
      type: 'text',
    },
    {
      name: 'middle_name',
      placeholder: 'Apellido',
      type: 'text',
      notRequired: true,
    },
    {
      name: 'password',
      placeholder: 'Contraseña',
      type: 'password',
    },
    {
      name: 'user',
      placeholder: 'Usuario',
      type: 'text',
    },
    {
      name: 'id_profile',
      placeholder: 'Perfil',
      type: 'select',
      options: profile.map((p) => ({
        value: p.id_profile.toString(),
        label: p.name,
      })),
    },
  ]

  return <RegisterForm fields={fields} onSubmit={onSubmit} />
}
export default RegisterUser
