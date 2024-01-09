import { AxiosError } from 'axios'
import Swal from 'sweetalert2'

export const handleApiError = (err: unknown, message?: string) => {
  if (err instanceof AxiosError) {
    const errorMessage =
      message ||
      (err.response?.data && Array.isArray(err.response.data)
        ? err.response.data.map((error) => error.message).join(', ')
        : 'Error desconocido')

    Swal.fire({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    })
  } else {
    console.error(err)
  }
}
