interface Props {
  children: React.ReactNode
}

const Error = ({ children }: Props) => {
  return (
    <div className="bg-[#25171C]  text-center rounded-md w-[300px] mx-auto mb-6 border-red-950 border">
      <p className="p-4 text-sm">{children}</p>
    </div>
  )
}
export default Error
