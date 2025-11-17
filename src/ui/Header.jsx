import Logo from "./Logo";
import Navbar from "./NavBar";
import Profile from "./Profile";

function Header() {
  return (
    <div className="flex h-20 w-full items-center justify-center bg-white">
      <header className="flex h-15 w-full items-center justify-between px-4 text-lg font-semibold text-gray-800 sm:h-20 sm:w-4/5 sm:px-8 sm:text-2xl lg:px-20">
        <Logo />
        <Navbar />
        <Profile />
      </header>
    </div>
  );
}

export default Header;

// // Header.jsx
// function Header() {
//   return (
//     <header className="bg-white/80 shadow-sm backdrop-blur-md">
//       <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
//         <Logo />
//         <NavBar />
//         <Profile />
//       </div>
//     </header>
//   );
// }
