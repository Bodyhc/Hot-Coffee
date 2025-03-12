import { Coffee, Menu, ShoppingCart } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Coffee className="h-8 w-8 text-amber-800" />
            <span className="ml-2 text-xl font-bold text-amber-900">
              Hot Coffee
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#home" className="text-amber-900 hover:text-amber-700">
                Home
              </a>
              <a href="#about" className="text-amber-900 hover:text-amber-700">
                About
              </a>
              <a href="#menu" className="text-amber-900 hover:text-amber-700">
                Menu
              </a>
              <a
                href="#contact"
                className="text-amber-900 hover:text-amber-700">
                Contact
              </a>
              <button className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-700">
                Order Now
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative" onClick={onCartClick}>
              <ShoppingCart className="h-6 w-6 text-amber-800" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Menu className="h-6 w-6 text-amber-800 md:hidden" />
          </div>
        </div>
      </div>
    </nav>
  );
}
