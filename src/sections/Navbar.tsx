import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: '首页', href: '#hero' },
  { label: '空乘招聘', href: '#jobs' },
  { label: '军队文职', href: '#military' },
  { label: '培训课程', href: '#courses' },
  { label: '关于我们', href: '#about' },
  { label: '联系我们', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1a2744]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-white">
              <div className="text-xl font-bold">中升新方向</div>
              <div className="text-xs text-[#d4a84b]">航空·文职招聘</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm text-white/90 hover:text-[#d4a84b] transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#d4a84b] transition-all duration-200 group-hover:w-4/5" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-[#d4a84b] hover:bg-[#c49a3f] text-[#1a2744] font-semibold px-6"
            >
              <Phone className="w-4 h-4 mr-2" />
              立即咨询
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#1a2744]/98 backdrop-blur-md rounded-lg mt-2 p-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-3 text-left text-white/90 hover:text-[#d4a84b] hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-[#d4a84b] hover:bg-[#c49a3f] text-[#1a2744] font-semibold mt-2"
              >
                <Phone className="w-4 h-4 mr-2" />
                立即咨询
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
