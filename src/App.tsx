import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CoffeeScene } from "./components/CoffeeScene";
import { Navbar } from "./components/Navbar";
import { CartModal } from "./components/CartModal";
import { Coffee, Clock, MapPin, Phone, Star } from "lucide-react";

// Menu items data
const menuItems = [
  {
    category: "Hot Coffee",
    items: [
      {
        id: 1,
        title: "Artisan Espresso",
        price: 4.5,
        description: "Rich and bold single-origin espresso",
        image:
          "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 2,
        title: "Caramel Macchiato",
        price: 5.5,
        description: "Espresso with steamed milk and vanilla-caramel syrup",
        image:
          "https://images.unsplash.com/photo-1527678357412-ef45dfbd9ecc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        title: "Turkish Coffee",
        price: 4.75,
        description: "Traditional unfiltered coffee with cardamom",
        image:
          "https://plus.unsplash.com/premium_photo-1732818135469-3bfc10ed83a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    category: "Cold Coffee",
    items: [
      {
        id: 4,
        title: "Cold Brew",
        price: 4.75,
        description: "24-hour steeped cold brew coffee",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 5,
        title: "Iced Latte",
        price: 5.25,
        description: "Espresso with cold milk and ice",
        image:
          "https://images.unsplash.com/photo-1553909489-cd47e0907980?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 6,
        title: "Frappuccino",
        price: 6.0,
        description: "Blended coffee with cream and ice",
        image:
          "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    category: "Pastries",
    items: [
      {
        id: 7,
        title: "Croissant",
        price: 3.5,
        description: "Buttery, flaky French pastry",
        image:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 8,
        title: "Chocolate Muffin",
        price: 3.75,
        description: "Double chocolate chip muffin",
        image:
          "https://images.unsplash.com/photo-1604882406195-d94d4888567d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 9,
        title: "Cinnamon Roll",
        price: 4.25,
        description: "Fresh-baked cinnamon roll with cream cheese frosting",
        image:
          "https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

export type CartItem = {
  id: number;
  quantity: number;
};

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (itemId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: itemId, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, cartItem) => {
      const menuItem = menuItems
        .flatMap((category) => category.items)
        .find((item) => item.id === cartItem.id);
      return total + (menuItem?.price || 0) * cartItem.quantity;
    }, 0);
  };

  const findItemById = (id: number) => {
    return menuItems
      .flatMap((category) => category.items)
      .find((item) => item.id === id);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar
        cartCount={getCartItemCount()}
        onCartClick={() => setIsCartOpen(true)}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        menuItems={menuItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        total={getCartTotal()}
        findItemById={findItemById}
      />

      {/* Hero Section with 3D Animation */}
      <section id="home" className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Suspense fallback={null}>
              <CoffeeScene />
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
              Experience Coffee Perfection
            </h1>
            <p className="text-xl text-amber-800 mb-8">
              Artisanal coffee crafted with passion, served with love
            </p>
            <a
              href="#menu"
              className="bg-amber-800 text-white px-8 py-3 rounded-full text-lg hover:bg-amber-700 transition-colors inline-block">
              View Our Menu
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Our Story
            </h2>
            <p className="text-lg text-amber-700 max-w-3xl mx-auto">
              Founded in 2010, Aroma Haven has been a sanctuary for coffee
              lovers seeking the perfect brew. Our passion for coffee excellence
              drives us to source the finest beans from sustainable farms
              worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-amber-800" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Premium Beans
              </h3>
              <p className="text-amber-700">
                Carefully selected beans from the world's finest coffee regions.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-amber-800" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Expert Baristas
              </h3>
              <p className="text-amber-700">
                Skilled baristas trained in the art of coffee preparation.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-amber-800" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Perfect Atmosphere
              </h3>
              <p className="text-amber-700">
                A cozy environment designed for comfort and conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            Our Menu
          </h2>

          {menuItems.map((category, idx) => (
            <div key={idx} className="mb-16 last:mb-0">
              <h3 className="text-2xl font-semibold text-amber-800 mb-8 text-center">
                {category.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-amber-900">
                        {item.title}
                      </h3>
                      <p className="text-amber-700 mt-2">{item.description}</p>
                      <p className="text-amber-900 font-bold mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => addToCart(item.id)}
                        className="mt-4 w-full bg-amber-800 text-white py-2 rounded hover:bg-amber-700 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 bg-amber-50 p-6 rounded-lg shadow-md">
              <Clock className="h-8 w-8 text-amber-800" />
              <div>
                <h3 className="font-semibold text-amber-900">Opening Hours</h3>
                <p className="text-amber-700">Mon-Sun: 7am - 8pm</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-amber-50 p-6 rounded-lg shadow-md">
              <MapPin className="h-8 w-8 text-amber-800" />
              <div>
                <h3 className="font-semibold text-amber-900">Location</h3>
                <p className="text-amber-700">123 Coffee Street</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-amber-50 p-6 rounded-lg shadow-md">
              <Phone className="h-8 w-8 text-amber-800" />
              <div>
                <h3 className="font-semibold text-amber-900">Contact</h3>
                <p className="text-amber-700">(555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Coffee className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">Aroma Haven</span>
              </div>
              <p className="mt-4">
                Crafting perfect moments, one cup at a time.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="hover:text-amber-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-amber-300">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-amber-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-amber-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-amber-300">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-300">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-300">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <form className="mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded bg-amber-800 text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                <button className="mt-2 w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-600 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-amber-800 text-center">
            <p>&copy; 2025 Hot Coffee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
