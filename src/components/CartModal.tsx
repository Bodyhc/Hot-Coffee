import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem } from '../App';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  menuItems: any[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  total: number;
  findItemById: (id: number) => any;
}

export function CartModal({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  total,
  findItemById
}: CartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-amber-900">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-amber-900" />
            </button>
          </div>

          <div className="p-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => {
                  const menuItem = findItemById(item.id);
                  if (!menuItem) return null;

                  return (
                    <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-0">
                      <img
                        src={menuItem.image}
                        alt={menuItem.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-amber-900">{menuItem.title}</h3>
                        <p className="text-amber-700">${menuItem.price.toFixed(2)}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-amber-100 rounded transition-colors"
                          >
                            <Minus className="h-4 w-4 text-amber-900" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-amber-100 rounded transition-colors"
                          >
                            <Plus className="h-4 w-4 text-amber-900" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold text-amber-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <button
                    className="mt-4 w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}