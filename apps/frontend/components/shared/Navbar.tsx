import { HomeIcon, InfoIcon, LogIn } from "lucide-react"
import { Logo } from "../../../common/icons/Logo"
import { Button } from "@heroui/react"

const navBarData = [
  {
    label : 'Home',
    Icon : HomeIcon,
  },
  {
    label : 'About',
    Icon : InfoIcon
  },
  {
    label : 'Sign In',
    Icon : LogIn
  }
]

export const Navbar = () => {
  return (
    <div className="w-full justify-center sticky top-5 z-50">
      <div className="p-2 sticky top-0 z-50 bg-background rounded-full w-1/2 mx-auto border border-primary">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 pl-4">
          <Logo color="#38056d" className="size-7"/>
          <span className="text-primary font-semibold text-base">ResAI</span>
        </div>
        <div className="flex items-center gap-2">
          {navBarData.map((item, index) => (
            <Button size="sm" key={index} className="bg-background rounded-full">
              <div className="flex items-center justify-center gap-1">
                {item.label && <item.Icon color="#38056d" className="size-3"/>}
                <span className="text-secondary-text font-medium text-xs">{item.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
    </div>

  )
}
