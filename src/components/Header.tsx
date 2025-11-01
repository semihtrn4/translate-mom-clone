
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed w-full bg-white dark:bg-gray-950 z-30 py-4 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-brand-orange">TranslateMom</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-brand-orange">
            Home
          </Link>
          <Link to="/pricing" className="text-gray-800 dark:text-gray-200 hover:text-brand-orange">
            Pricing
          </Link>
          <Link to="/about" className="text-gray-800 dark:text-gray-200 hover:text-brand-orange">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button onClick={handleLogout} variant="ghost">
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Log in
              </Button>
              <Button 
                className="bg-brand-orange hover:bg-brand-orange/90"
                onClick={() => setIsSignupModalOpen(true)}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </header>
  );
};

export default Header;
