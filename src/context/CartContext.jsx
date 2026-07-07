import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const initialOrders = [
  { id: "12345", date: "May 15, 2026", status: "Delivered", amount: 499, items: "1x Combo Pack (Monthly Pack)" },
  { id: "12312", date: "April 15, 2026", status: "Delivered", amount: 447, items: "1x XL Pads (280mm), 1x Overnight Pads (320mm)" },
  { id: "12222", date: "March 15, 2026", status: "Delivered", amount: 299, items: "2x Regular Pads (240mm)" }
];

export const CartProvider = ({ children }) => {
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('haana_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Load orders from localStorage
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('haana_orders');
    return savedOrders ? JSON.parse(savedOrders) : initialOrders;
  });

  // Active Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); // in percentage

  // Period Calculator State
  const [periodInfo, setPeriodInfo] = useState(() => {
    const savedPeriod = localStorage.getItem('haana_period');
    return savedPeriod ? JSON.parse(savedPeriod) : {
      lastPeriodDate: "2026-06-05",
      cycleLength: 28,
      periodLength: 5
    };
  });

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('haana_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync orders to localStorage
  useEffect(() => {
    localStorage.setItem('haana_orders', JSON.stringify(orders));
  }, [orders]);

  // Sync periodInfo to localStorage
  useEffect(() => {
    localStorage.setItem('haana_period', JSON.stringify(periodInfo));
  }, [periodInfo]);

  // Add to cart
  const addToCart = (product, quantity = 1, size = null, orderType = 'once') => {
    const selectedSize = size || product.size || "Standard";
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.size === selectedSize && (item.orderType || 'once') === orderType
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, { product, quantity, size: selectedSize, orderType }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (productId, size, orderType = 'once') => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.product.id === productId && item.size === size && (item.orderType || 'once') === orderType))
    );
  };

  // Update item quantity
  const updateQuantity = (productId, size, amount, orderType = 'once') => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product.id === productId && item.size === size && (item.orderType || 'once') === orderType) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      });
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscount(0);
  };

  // Apply promo code
  const applyPromoCode = (code) => {
    const normalizedCode = code.trim().toUpperCase();
    if (normalizedCode === 'HAANA15') {
      setPromoCode('HAANA15');
      setDiscount(15);
      return { success: true, message: "15% discount applied successfully!" };
    } else if (normalizedCode === 'FREESHIP') {
      setPromoCode('FREESHIP');
      setDiscount(0); // Free shipping handled in calculations
      return { success: true, message: "Free shipping applied successfully!" };
    } else {
      return { success: false, message: "Invalid coupon code." };
    }
  };

  // Calculate Subtotal
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  // Calculate Shipping (Free above 499 or with FREESHIP code)
  const getShippingFee = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal >= 499 || promoCode === 'FREESHIP') return 0;
    return 40; // Flat 40 shipping fee
  };

  // Calculate Discount Amount
  const getDiscountAmount = () => {
    const subtotal = getSubtotal();
    return Math.round((subtotal * discount) / 100);
  };

  // Calculate Grand Total
  const getGrandTotal = () => {
    const subtotal = getSubtotal();
    const shipping = getShippingFee();
    const disc = getDiscountAmount();
    return subtotal + shipping - disc;
  };

  // Save Period Calculator details
  const updatePeriodInfo = (info) => {
    setPeriodInfo(info);
  };

  // Helper calculation for calendar days
  const getCalculatedCycle = () => {
    const { lastPeriodDate, cycleLength, periodLength } = periodInfo;
    const lastDate = new Date(lastPeriodDate);
    
    // Calculate Next Period Date
    const nextPeriodDate = new Date(lastDate);
    nextPeriodDate.setDate(lastDate.getDate() + parseInt(cycleLength));
    
    // Calculate Ovulation Date (approx 14 days before next period)
    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(nextPeriodDate.getDate() - 14);

    // Calculate Fertile Window
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);

    // Calculate current cycle day
    const today = new Date();
    today.setHours(0,0,0,0);
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const currentCycleDay = (diffDays % parseInt(cycleLength)) + 1;

    // Calculate Safe Days range (usually starting 3 days after ovulation window ends until 3 days before next period starts)
    const safeStart = new Date(fertileEnd);
    safeStart.setDate(fertileEnd.getDate() + 3);
    const safeEnd = new Date(nextPeriodDate);
    safeEnd.setDate(nextPeriodDate.getDate() - 3);

    return {
      nextPeriod: nextPeriodDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
      ovulation: ovulationDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
      fertileWindow: `${fertileStart.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - ${fertileEnd.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`,
      safeDays: `${safeStart.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - ${safeEnd.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`,
      currentCycleDay,
      cycleProgressPercent: Math.min(100, Math.round((currentCycleDay / parseInt(cycleLength)) * 100))
    };
  };

  // Place Order Simulation
  const placeOrder = (billingDetails) => {
    const newOrder = {
      id: Math.floor(10000 + Math.random() * 90000).toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: "Processing",
      amount: getGrandTotal(),
      items: cartItems.map(item => `${item.quantity}x ${item.product.shortName} (${item.size})`).join(', ')
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
    return newOrder.id;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      orders,
      promoCode,
      discount,
      periodInfo,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyPromoCode,
      getSubtotal,
      getShippingFee,
      getDiscountAmount,
      getGrandTotal,
      updatePeriodInfo,
      getCalculatedCycle,
      placeOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
