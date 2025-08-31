"use client";

import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Vizija", href: "#hero" },
  { label: "Preduzeće", href: "#about" },
  { label: "Rad na terenu", href: "#gallery" },
  { label: "Usluge", href: "#services" },
  { label: "Planiranje", href: "#cta" },
  { label: "Kontakt", href: "#contact" },
];

export function Nav1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100; // Offset for nav height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    handleScroll(); // Check initial position
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-2">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-7">
          <div className="flex items-center">
            <span className="text-xl font-bold text-black">tanac.rs</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`transition-colors duration-200  ${
                  activeSection === item.href ? "text-black" : "text-black/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleMenuToggle}
            className="lg:hidden text-gray-700 hover:text-gray-900 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="flex flex-col items-center justify-center min-h-screen bg-white/[0.975]">
              <div className="text-center space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full text-2xl block text-center transition-colors duration-200 font-medium ${
                      activeSection === item.href
                        ? "text-black"
                        : "text-black/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleMenuToggle}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              aria-label="Close mobile menu"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
