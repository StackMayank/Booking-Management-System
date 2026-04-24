import icons from "@/lib/icons"

const Icon = ({icon, ...props}) => {
  const IconComponent = icons[icon]
  if (!IconComponent) return null;
  return (
    <IconComponent {...props} />
  )
}

export default Icon