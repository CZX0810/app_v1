import { useEffect, useRef, useState } from 'react';

const airlines = [
  { name: '国航', count: 200 },
  { name: '东航', count: 180 },
  { name: '南航', count: 150 },
  { name: '海航', count: 120 },
  { name: '厦航', count: 100 },
  { name: '其他航司', count: 250 },
];

interface CounterProps {
  end: number;
  duration?: number;
}

function Counter({ end, duration = 2000 }: CounterProps) {
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

  return <span ref={countRef}>{count}</span>;
}

export default function Employment() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1a2744] mb-4">
            学员<span className="text-[#d4a84b]">就业分布</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            与多家知名航空公司建立长期合作关系，为学员提供广阔的就业平台。
          </p>
        </div>

        {/* Airlines Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {airlines.map((airline, index) => (
            <div
              key={airline.name}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#1a2744] to-[#243454] rounded-full flex items-center justify-center group-hover:from-[#d4a84b] group-hover:to-[#c49a3f] transition-all duration-300">
                <span className="text-white font-bold text-lg">{airline.name.charAt(0)}</span>
              </div>
              <h3 className="text-lg font-semibold text-[#1a2744] mb-2">{airline.name}</h3>
              <div className="text-3xl font-bold text-[#d4a84b] mb-1">
                <Counter end={airline.count} />+
              </div>
              <p className="text-gray-500 text-sm">就业学员</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
