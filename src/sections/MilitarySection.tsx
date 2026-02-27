import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Wallet,
  Home,
  Heart,
  Shield,
  Calendar,
  Gift,
  GraduationCap,
  UserCheck,
  FileCheck,
  Stethoscope,
  ClipboardList,
  Search,
  Edit3,
  BookOpen,
  Users,
  FileSearch,
  CheckCircle,
} from 'lucide-react';

const benefits = [
  { icon: Wallet, title: '薪资待遇', desc: '工资水平与现役军官基本相当，总体上高于地方同类人员' },
  { icon: Home, title: '住房保障', desc: '实行社会化、货币化保障政策，住房公积金按12%缴纳' },
  { icon: Heart, title: '医疗保障', desc: '平时可在地方医院看病，任务期间实行军队免费医疗' },
  { icon: Shield, title: '社会保险', desc: '参照国家工作人员最高标准缴纳各类保险' },
  { icon: Calendar, title: '休假探亲', desc: '参照国家机关、事业单位工作人员有关规定执行' },
  { icon: Gift, title: '其他福利', desc: '享受防暑降温费、子女保育教育费等福利待遇' },
];

const requirements = [
  { icon: GraduationCap, title: '学历要求', desc: '全日制本科及以上，护理、艺术、体育岗位可放宽至大专' },
  { icon: UserCheck, title: '年龄要求', desc: '18-35周岁，中级岗位可放宽至45周岁' },
  { icon: FileCheck, title: '政治条件', desc: '符合军队招录标准，无违法犯罪记录' },
  { icon: Stethoscope, title: '身体条件', desc: '符合军队体检标准，无纹身、无明显疤痕' },
];

const process = [
  { icon: ClipboardList, title: '公布招考', desc: '军队人才网发布招考信息' },
  { icon: Edit3, title: '报名初审', desc: '网上报名，系统自动初审' },
  { icon: BookOpen, title: '统一考试', desc: '公共科目+专业科目笔试' },
  { icon: Users, title: '面试体检', desc: '用人单位组织面试体检' },
  { icon: FileSearch, title: '政审考察', desc: '政治考核和综合考察' },
  { icon: CheckCircle, title: '录用上岗', desc: '公示无异议后办理录用' },
];

export default function MilitarySection() {
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

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
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
    <section id="military" ref={sectionRef} className="py-20 bg-gradient-to-b from-[#1a2744] to-[#243454]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            孔雀蓝制服<span className="text-[#d4a84b]">荣耀使命</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            中国人民解放军文职人员，非现役军人，依法享有国家工作人员权利，薪资待遇优厚，职业稳定有保障。
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#d4a84b]" />
            薪资待遇
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((item, index) => (
              <div
                key={item.title}
                className={`bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10 hover:bg-white/10 hover:border-[#d4a84b]/30 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#d4a84b]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#d4a84b]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements & Process */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Requirements */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Search className="w-5 h-5 text-[#d4a84b]" />
              报考条件
            </h3>
            <div className="space-y-4">
              {requirements.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-4 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${(index + 6) * 100}ms`, transition: 'all 0.5s ease-out' }}
                >
                  <div className="w-8 h-8 bg-[#d4a84b]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-[#d4a84b]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-[#d4a84b]" />
              报考流程
            </h3>
            <div className="space-y-3">
              {process.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex items-center gap-4 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                  style={{ transitionDelay: `${(index + 10) * 100}ms`, transition: 'all 0.5s ease-out' }}
                >
                  <div className="w-8 h-8 bg-[#d4a84b] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1a2744] font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={scrollToContact}
            className="bg-[#d4a84b] hover:bg-[#c49a3f] text-[#1a2744] font-semibold px-8 py-6 text-lg transition-transform hover:scale-105"
          >
            咨询军队文职报考
          </Button>
        </div>
      </div>
    </section>
  );
}
