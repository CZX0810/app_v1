import { Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

const quickLinks = [
  { label: '空乘招聘', href: '#jobs' },
  { label: '军队文职', href: '#military' },
  { label: '培训课程', href: '#courses' },
  { label: '关于我们', href: '#about' },
  { label: '联系我们', href: '#contact' },
];

const services = [
  '空中乘务员培训',
  '航空安全员培训',
  '机场地勤培训',
  '军队文职培训',
  '高铁乘务培训',
  '就业指导服务',
];

export default function Footer() {
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
    <footer className="bg-[#1a2744] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="text-xl font-bold text-white">中升新方向</div>
              <div className="text-sm text-[#d4a84b]">航空·文职招聘</div>
            </div>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              专业空乘与军队文职招聘培训，依托行业顶级资源，为您提供从培训到就业的一站式服务。
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-[#d4a84b] flex-shrink-0" />
                <div>
                  <div>邵老师 158-2489-9253</div>
                  <div>张老师 166-0371-2777</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-[#d4a84b] flex-shrink-0" />
                <span>1059183064@qq.com</span>
              </div>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-[#d4a84b] flex-shrink-0 mt-0.5" />
                <div>
                  <div>山东总部：济南市解放路62号铁院大厦5楼</div>
                  <div className="mt-1">河南区域：河南省郑州市自贸试验区郑州片区（郑东）商鼎路78号升龙广场3号楼B座17268室</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">快速链接</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/60 hover:text-[#d4a84b] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">服务项目</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/60 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-white font-semibold mb-6">工作时间</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#d4a84b] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm">周一至周日</p>
                  <p className="text-white/60 text-sm">9:00 - 18:00</p>
                  <p className="text-white/40 text-xs mt-1">节假日正常咨询服务</p>
                </div>
              </div>
              <div className="bg-[#d4a84b]/10 rounded-lg p-4">
                <p className="text-[#d4a84b] text-sm font-medium mb-1">咨询热线</p>
                <p className="text-white font-bold">邵老师 158-2489-9253</p>
                <p className="text-white font-bold">张老师 166-0371-2777</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              © 2026 山东中升新方向人力资源有限公司 版权所有
            </p>
            <p className="text-white/40 text-sm flex items-center gap-1">
              用
              <Heart className="w-4 h-4 text-[#d4a84b] fill-[#d4a84b]" />
              服务每一位学员
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
