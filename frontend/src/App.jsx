import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/Pages/Home';
import { ProductsPage } from './components/Pages/Products';
import { ProductDetailPage } from './components/Pages/ProductDetail';
import { CartPage } from './components/Pages/Cart';
import { LoginPage } from './components/Auth/Login';
import { SignupPage } from './components/Auth/Signup';
import { ProfilePage } from './components/Pages/Profile';
import { WishlistPage } from './components/Pages/Wishlist';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import NotFound from './components/Pages/NotFound';
import ContactUs from './components/Pages/Info/ContactUs';
import { FAQs } from './components/Pages/Info/FAQs';
import { ShippingReturns } from './components/Pages/Info/ShippingReturns';
import { SizeGuide } from './components/Pages/Info/SizeGuide';
import { PrivacyPolicy } from './components/Pages/Info/PrivacyPolicy';
import TermsOfService from './components/Pages/Info/TermsOfService';
import ComingSoon from './components/Pages/Info/ComingSoon';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/shipping-returns" element={<ShippingReturns />} />
      <Route path="/size-guide" element={<SizeGuide />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;