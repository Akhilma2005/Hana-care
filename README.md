# Hana Care | Premium Organic Menstrual Care

An ultra-premium, interactive e-commerce web application for **Hana Care** (a brand of **JENISHADIPSON PRIVATE LIMITED**), built using **React**, **Tailwind CSS (v4)**, and **React Router**.

---

## 🎨 Design Mockup Reference

Below is the visual mockup that this application implements:

![Hana Care UI Design Mockup](./public/mockup.png)

---

## 🚀 Key Features

1. **Vibrant & Premium Aesthetics**: Tailwind's HSL-tailored color palette, Plus Jakarta & Outfit typography imports, custom glassmorphism utilities, and smooth micro-animations.
2. **Hero Section Carousel (New)**: A dynamic 4-slide slideshow featuring responsive overlays, text readability gradients, manual navigation controls (chevrons & indicators), and automatic 6-second rotation:
   - **Slide 1 (Pink Theme):** General introduction to Hana Care.
   - **Slide 2 (Green Theme):** 100% Certified Organic Cotton sanitary pads highlights.
   - **Slide 3 (Blue Theme):** Ultimate comfort and leak-proof security for heavy flow.
   - **Slide 4 (Violet Theme):** 12-Hour protection and peaceful nights.
3. **Global E-Commerce Routing**: Native routes handled via React Router:
   - **Shop catalog list** with price limiters, category filters, and ratings selectors.
   - **Product details page** with absorbency droplet meters, pack size selector tabs, photo thumbnails, and detailed product info tabs (including dynamic fallback to **3 Years Shelf Life / Expiry**).
   - **Interactive shopping cart** with coupon codes (`HANA15` for 15% discount, `FREESHIP` for free shipping).
   - **Checkout form summary** and order placement flow.
4. **Period Calculator**: Interactive form calculator calculating ovulation and fertile cycle dates based on last start inputs, synced dynamically to the Dashboard.
5. **Health Blogs Catalog**: Educational guides with reading overlays.
6. **Customer Dashboard**: Overview of recent order histories, cycle day progress circles, and subscription plan status indicators.
7. **Side-by-side Comparison**: A floating comparison toggle at the bottom-left of the site that loads the design mockup overlay for visual verification.

---

## 🛠️ Project Setup

Follow these steps to run the application locally:

### 1. Install Dependencies
Run the command below in the project directory to install all packages:
```bash
npm install
```

### 2. Run the Development Server
Launch the local server:
```bash
npm run dev
```
Open **http://localhost:5173/** in your web browser.

### 3. Build for Production
Verify compilation and compile a production bundle:
```bash
npm run build
```
Production assets will compile inside the `dist/` directory.

---

## 📁 Component Directory Structure

- `src/context/CartContext.jsx` - Core context provider for shopping states and cycle dates.
- `src/context/ProductContext.jsx` - Context provider managing the products list, local storage syncer, and defaults.
- `src/components/Header.jsx` - Navigation bar with search functionality and shopping cart count badge.
- `src/components/Footer.jsx` - Standard website footer containing company details, office address, and GSTIN registration.
- `src/components/Hero.jsx` - Main landing slideshow banner with highlights badges and navigation controls.
- `src/components/ProductCard.jsx` - Shopping card with flow droplets indicators and size options.
- `src/components/FilterSidebar.jsx` - Shop refiner panel.
- `src/components/CartItem.jsx` - Cart list rows.
- `src/pages/` - E-commerce pages routes directories (About, Admin, Blog, Cart, Checkout, Contact, Dashboard, FAQ, Home, ProductDetail, Shop).
- `src/data/products.js` - Mock datasets for products, blogs, and FAQ listings.
