import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="hidden grow items-center justify-around self-stretch sm:flex">
      <NavLink
        to="/explore"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors hover:bg-stone-100 ${
            isActive ? "bg-stone-100 font-bold" : ""
          }`
        }
      >
        Explore
      </NavLink>
      <NavLink
        to="mytrips"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors hover:bg-stone-100 ${
            isActive ? "bg-stone-100 font-bold" : ""
          }`
        }
      >
        My Trips
      </NavLink>
      <NavLink
        to="guiders"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-colors hover:bg-stone-100 ${
            isActive ? "bg-stone-100 font-bold" : ""
          }`
        }
      >
        Guiders
      </NavLink>
    </nav>
  );
}

export default NavBar;
