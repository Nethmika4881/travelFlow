import { LocateIcon, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2 px-6">
      <div className="flex h-5 w-5 items-center justify-center sm:h-10 sm:w-10">
        <MapPin color="#ee5b2b" strokeWidth={2.5} />
      </div>
      <span>TravelFlow</span>
    </NavLink>
  );
}
export default Logo;
