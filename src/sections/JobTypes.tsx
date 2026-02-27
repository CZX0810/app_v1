import { useEffect, useRef, useState } from 'react';
import { Plane, Shield, Briefcase, Train } from 'lucide-react';

const jobTypes = [
  {
    icon: Plane,
    title: '空中乘务员',
    salary: '月薪10000-20000+',
    benefits: '七险两金，全球飞行',
    image: '/images/asset_2.jpg',
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    icon: Shield,
    title: '军队文职',
    salary: '月薪9000-13000+',
    benefits: '编制稳定，福利优厚',
    image: '/images/asset_3.jpg',
    color: 'from-green-500/20 to-green-600/20',
  },
  {
    icon: Briefcase,
    title: '机场地勤',
    salary: '月薪5000-10000',
    benefits: '五险一金，工作稳定',
    image: '/images/asset_4.jpg',
    color: 'from-orange-500/20 to-orange-600/20',
  },
  {
    icon: Train,
    title: '高铁乘务',
    salary: '月薪5000-9000',
    benefits: '国企编制，晋升清晰',
    image: '/images/asset_5.jpg',
    color: 'from-purple-500/20 to-purple-600/20',
  },
];

export default function JobTypes() {
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
    <section id="jobs" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1a2744] mb-4">
            民航业<span className="text-[#d4a84b]">黄金职业</span>等你来
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            中国民航业蓬勃发展，未来20年需要新增数十万名专业人才，选择航空事业，成就精彩人生。
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobTypes.map((job, index) => (
            <div
              key={job.title}
              className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${job.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center shadow-md">
                  <job.icon className="w-5 h-5 text-[#1a2744]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#1a2744] mb-2">{job.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#d4a84b] font-semibold">{job.salary}</span>
                </div>
                <p className="text-gray-500 text-sm">{job.benefits}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
