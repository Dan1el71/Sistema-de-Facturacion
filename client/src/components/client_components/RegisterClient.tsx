import { newClient } from '../../api/client'
import { Identification, RegisterClientProps } from '../../types/types'
import Swal from 'sweetalert2'
import { AxiosError } from 'axios'

const RegisterClient = ({ identificationTypes }: RegisterClientProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const identification_type = parseInt(
        (e.currentTarget[0] as HTMLInputElement).value
      )
      const { value: identification } = e.currentTarget[1] as HTMLInputElement
      const { value: social_reason } = e.currentTarget[2] as HTMLInputElement
      const { value: state } = e.currentTarget[3] as HTMLInputElement

      await newClient({
        identification_type,
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
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.status === 400 ? 'El cliente ya existe' : 'Error'
        await Swal.fire({
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
  }

  return (
    <div className="w-11/12">
      <h2>
        <i className="pr-2 bi bi-person-plus" />
        Registrar cliente
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex gap-6 mt-2 text-center flex-col  md:flex-row"
      >
        <select
          name="idType"
          required
          className="bg-[#161b22] p-1 m-1 rounded-md border border-gray-600"
        >
          <option value="" label="" />
          {identificationTypes.map((id: Identification) => (
            <option
              key={id.abreviature}
              value={id.identification_type}
              label={id.abreviature}
            >
              {id.abreviature}
            </option>
          ))}
        </select>
        <input
          required
          placeholder="Identificación"
          className="flex-1 text-center rounded-md px-3 py-[3px] m-1 bg-[#0D1117] border border-[#30363D]"
          id="identification"
          type="number"
        />
        <input
          required
          placeholder="Razón social"
          className="flex-1 text-center rounded-md px-3 py-[3px] mb-1 mt-1 bg-[#0D1117] border border-[#30363D]"
          id="social_reason"
          type="text"
        />
        <input
          required
          placeholder="Estado"
          className="flex-1 text-center rounded-md px-3 py-[3px] mb-1 mt-1 bg-[#0D1117] border border-[#30363D]"
          id="state"
          type="number"
        />
        <button
          className="rounded-md px-3 mb-1 mt-1 bg-green-button hover:green-button-hover border border-[#30363D]"
          type="submit"
        >
          <i className="bi bi-play-fill"></i>
        </button>
      </form>
    </div>
  )
}
export default RegisterClient
