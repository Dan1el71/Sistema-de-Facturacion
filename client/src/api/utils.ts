import { AxiosError } from 'axios'
import Swal from 'sweetalert2'

export const handleApiError = (err: unknown, message: string) => {
  if (err instanceof AxiosError) {
    const errorMessage = err.response?.status === 400 ? `${message}` : 'Error'

    Swal.fire({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    })

    window.location.reload()
  } else {
    console.error(err)
  }
}
