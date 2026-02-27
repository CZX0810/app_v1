import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Building2 } from 'lucide-react';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(end * easeOut));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: Users, value: 1000, suffix: '+', label: '成功就业学员' },
  { icon: TrendingUp, value: 98, suffix: '%', label: '面试通过率' },
  { icon: Building2, value: 20, suffix: '+', label: '合作航空公司' },
];

export default function Hero() {
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
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/asset_1.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2744]/95 via-[#1a2744]/80 to-[#1a2744]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-[#d4a84b]/20 border border-[#d4a84b]/30 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-[#d4a84b] rounded-full animate-pulse" />
              <span className="text-[#d4a84b] text-sm font-medium">2026年招聘火热进行中</span>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                梦想起航
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-[#d4a84b]">成就</span>
                <span className="text-white">非凡人生</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-white/80 leading-relaxed max-w-xl">
              专业空乘与军队文职招聘培训，依托行业顶级资源，为您提供从培训到就业的一站式服务，助力实现职业梦想。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => scrollToSection('#jobs')}
                className="bg-[#d4a84b] hover:bg-[#c49a3f] text-[#1a2744] font-semibold px-8 py-6 text-lg transition-transform hover:scale-105"
              >
                空乘招聘
              </Button>
              <Button
                onClick={() => scrollToSection('#military')}
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg transition-transform hover:scale-105"
              >
                军队文职
              </Button>
            </div>
          </div>

          {/* Right Stats */}
          <div className="grid gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#d4a84b]/20 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-[#d4a84b]" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#d4a84b]">
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
