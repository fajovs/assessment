import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

function HeaderNavigation() {
  
  const {user, session} = useSelector((state : RootState) => state.auth);
 

  if(!session){
    return <Navigate to="/sign-in" replace/>
  }

  return (
    <NavigationMenu className="flex justify-end items-center bg-black max-w-full">
      <NavigationMenuList className="gap-5 p-2">
        {session ? (
          <>
            <NavigationMenuItem>
              <Link to="/sign-in" className={navigationMenuTriggerStyle()}>
                Sign-In
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/sign-up" className={navigationMenuTriggerStyle()}>
                Register
              </Link>
            </NavigationMenuItem>
          </>
        ) : (
          <>
          <NavigationMenuItem>
            {user?.email}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/" className={navigationMenuTriggerStyle()}>
              Logout
            </Link>
          </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default HeaderNavigation;
