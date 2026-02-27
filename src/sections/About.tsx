import { useEffect, useRef, useState } from 'react';
import { Calendar, Users, Building2, TrendingUp, Award, Heart, Briefcase } from 'lucide-react';

const stats = [
  { icon: Calendar, value: 8, suffix: '年', label: '行业经验' },
  { icon: Users, value: 1000, suffix: '+', label: '成功就业' },
  { icon: Building2, value: 20, suffix: '+', label: '合作航司' },
  { icon: TrendingUp, value: 98, suffix: '%', label: '通过率' },
];

const advantages = [
  {
    icon: Award,
    title: '师资力量优势',
    desc: '公司教员具有民航乘务教员及民航空保教员资质，同时具备丰富的教学、管理及就业指导实践经验。聘请中航协及航空公司的行业专家、飞行经验丰富的专业教员参与指导教学工作。',
  },
  {
    icon: Heart,
    title: '服务质量优势',
    desc: '强化与学员沟通，对待学员学习及就业方面进行有针对性地高效沟通。秉承"耐心、细心、真诚、诚信"的服务理念，给学员带来实际有效的帮助。',
  },
  {
    icon: Briefcase,
    title: '就业优势',
    desc: '与中国民用航空局、中国航空运输协会、中国航空工业集团等单位达成战略合作，通过大型供需对接就业活动、招聘双选会、航司招聘等方式搭建就业平台。',
  },
];

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

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1a2744] mb-4">
            专业<span className="text-[#d4a84b]">人力资源</span>服务商
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            山东中升新方向人力资源有限公司，深耕齐鲁、辐射全国的一体化人力资源解决方案领航者。
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div
            className={`relative ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transition: 'all 0.8s ease-out' }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/asset_7.jpg"
                alt="公司环境"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/40 to-transparent" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#d4a84b] rounded-xl p-6 shadow-xl">
              <div className="text-4xl font-bold text-[#1a2744]">100%</div>
              <div className="text-[#1a2744]/80 text-sm">用心服务</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:border-[#d4a84b]/30 hover:shadow-lg transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 bg-[#d4a84b]/10 rounded-lg flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-[#d4a84b]" />
                </div>
                <div className="text-3xl font-bold text-[#1a2744] mb-1">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages */}
        <div>
          <h3 className="text-xl font-semibold text-[#1a2744] mb-6 text-center">核心优势</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {advantages.map((item, index) => (
              <div
                key={item.title}
                className={`bg-gradient-to-br from-[#1a2744] to-[#243454] rounded-xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 5) * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#d4a84b]/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#d4a84b]" />
                  </div>
                  <span className="text-lg font-semibold">{item.title}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
