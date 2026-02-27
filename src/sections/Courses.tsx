import { useEffect, useRef, useState } from 'react';
import { Users, Award, Plane, TrendingUp, BookOpen, Clock } from 'lucide-react';

const advantages = [
  {
    icon: Users,
    title: '专业师资',
    desc: '80%以上教师具有民航乘务、安全员教员资质',
  },
  {
    icon: Award,
    title: '权威认证',
    desc: '中国航空运输协会会员单位，1+X证书协调中心',
  },
  {
    icon: Plane,
    title: '实训设备',
    desc: 'B737、A320等多种机型模拟舱，真实客舱环境',
  },
  {
    icon: TrendingUp,
    title: '就业保障',
    desc: '与多家航空公司建立稳定就业渠道，98%通过率',
  },
];

const courses = [
  { name: '面试流程介绍', hours: 2 },
  { name: '形体礼仪', hours: 16 },
  { name: '化妆造型', hours: 8 },
  { name: '语言表达', hours: 12 },
  { name: '航空英语', hours: 20 },
  { name: '体能塑形', hours: 16 },
  { name: '面试心理学', hours: 4 },
  { name: '面试技巧', hours: 8 },
  { name: '模拟面试', hours: 4 },
];

export default function Courses() {
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
    <section id="courses" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1a2744] mb-4">
            系统化<span className="text-[#d4a84b]">专业培训</span>体系
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            从面试技巧到专业技能，全方位提升您的竞争力，助力顺利通过航空公司面试。
          </p>
        </div>

        {/* Advantages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {advantages.map((item, index) => (
            <div
              key={item.title}
              className={`bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-t-4 border-[#d4a84b] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-[#d4a84b]/10 rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-[#d4a84b]" />
              </div>
              <h3 className="text-lg font-bold text-[#1a2744] mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Training Image */}
        <div
          className={`relative rounded-2xl overflow-hidden mb-12 shadow-2xl ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '400ms', transition: 'all 0.8s ease-out' }}
        >
          <img
            src="/images/asset_6.jpg"
            alt="培训场景"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#1a2744] font-semibold">培训周期：1-3个月</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-[#1a2744] font-semibold">班级规模：小班教学</span>
              </div>
              <div className="bg-[#d4a84b] rounded-lg px-4 py-2">
                <span className="text-[#1a2744] font-semibold">通过率：98%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div>
          <h3 className="text-xl font-semibold text-[#1a2744] mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#d4a84b]" />
            培训课程体系
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, index) => (
              <div
                key={course.name}
                className={`flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-[#d4a84b]/5 hover:border-[#d4a84b]/30 border border-transparent transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${(index + 5) * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#d4a84b]/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-[#d4a84b]" />
                  </div>
                  <span className="text-[#1a2744] font-medium">{course.name}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{course.hours}课时</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
