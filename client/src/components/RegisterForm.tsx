import { useState } from 'react'
import { GenericFormProps } from '../types/types'

const RegisterForm = ({ fields, onSubmit }: GenericFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-11/12">
      <form
        onSubmit={handleSubmit}
        className="flex gap-6 mt-6 text-center flex-col md:flex-row"
      >
        {fields.map((field) => {
          if (field.type === 'select' && field.options) {
            return (
              <select
                key={field.name}
                name={field.name}
                required
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="bg-[#161b22] p-1 m-1 rounded-md border border-gray-600"
              >
                <option value="" label="" />
                {field.options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            )
          } else {
            return (
              <input
                key={field.name}
                required
                placeholder={field.placeholder}
                className="flex-1 text-center rounded-md px-3 py-[3px] m-1 bg-[#0D1117] border border-[#30363D]"
                name={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={handleChange}
              />
            )
          }
        })}
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

export default RegisterForm
