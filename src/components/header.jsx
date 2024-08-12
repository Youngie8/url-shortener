import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link2Icon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";


const Header = () => {

    const navigate = useNavigate()
    const {user, fetchUser} = UrlState()
    const {loading, fn: fnLogOut} = useFetch(logout);
  return (
    <>
        <nav className="py-4 flex justify-between item-center">
            <Link to='/'><h1 className="sm:text-3xl font-extrabold sm:text-xl font-bold">SCISSOR</h1></Link>

            <div>
                {!user?
                <Button onClick={() => navigate('/auth')}>Login</Button>
                : (
                <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full w-10 overflow-hidden">
                    <Avatar>
                        <AvatarImage src={user?.user_metadata?.profile_pic} className='object-contain'/>
                        <AvatarFallback>PIC</AvatarFallback>
                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{ user?.user_metadata?.name }</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link2Icon className="mr-2 h-4 w-4"/><span>My links</span></DropdownMenuItem>
                    <DropdownMenuItem className='text-red-400'><LogOut className="mr-2 h-4 w-4"/><span onClick={() => {
                        fnLogOut().then(() => {
                            fetchUser();
                            navigate('/');
                        })
                    }}>Logout</span></DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
                )}
            </div>
        </nav>
            {loading && <BarLoader className="mb-4" width={'100%'} color="#36d7b7" />}
    </>
  )
}

export default Header