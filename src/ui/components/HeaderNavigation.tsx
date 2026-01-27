import { useState } from "react";

function HeaderNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <nav>
      
      <ul>
        <li>juandelacruz@gmail.com</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
