import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link2Icon, LogOut } from "lucide-react";


const Header = () => {

    const navigate = useNavigate()
    const user = false;
  return (
    <nav className="py-4 flex justify-between item-center">
        <Link to='/'><h1 className="sm:text-3xl font-extrabold sm:text-xl font-bold">SCISSOR</h1></Link>

        <div>
            {!user?
            <Button onClick={() => navigate('/auth')}>Login</Button>
            : (
            <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full w-10 overflow-hidden">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.pngg" />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase() }{ user.name.charAt(1).toUpperCase()}</AvatarFallback>
                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{ user.name }</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link2Icon className="mr-2 h-4 w-4"/><span>My links</span></DropdownMenuItem>
                <DropdownMenuItem className='text-red-400'><LogOut className="mr-2 h-4 w-4"/><span>Logout</span></DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>

            )
            }
        </div>
    </nav>
  )
}

export default Header