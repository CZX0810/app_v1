import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

const contactInfo = [
  {
    icon: Phone,
    title: '咨询电话',
    content: '邵老师 158-2489-9253',
    subContent: '张老师 166-0371-2777',
  },
  {
    icon: Mail,
    title: '电子邮箱',
    content: '1059183064@qq.com',
    subContent: '工作日24小时内回复',
  },
  {
    icon: MapPin,
    title: '公司地址',
    content: '山东总部：济南市解放路62号铁院大厦5楼',
    subContent: '河南区域：河南省郑州市自贸试验区郑州片区（郑东）商鼎路78号升龙广场3号楼B座17268室',
  },
  {
    icon: Clock,
    title: '工作时间',
    content: '周一至周日 9:00-18:00',
    subContent: '节假日正常咨询',
  },
];

const consultTypes = [
  '空乘招聘咨询',
  '航空安全员咨询',
  '机场地勤咨询',
  '军队文职咨询',
  '高铁乘务咨询',
  '其他咨询',
];

// EmailJS 配置
// 请按照下方"配置说明"步骤获取并填写以下信息
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_qq',    // 替换为您的 Email Service ID
  TEMPLATE_ID: 'template_qq',  // 替换为您的 Email Template ID
  PUBLIC_KEY: 'YSU-M76PELbAeHJBs',    // 替换为您的 Public Key
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 初始化 EmailJS
  useEffect(() => {
    // 如果已配置 PUBLIC_KEY，则初始化
    if (EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.type) {
      toast.error('请填写必填项');
      return;
    }

    // 检查 EmailJS 是否已配置
    if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' ||
        EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
        EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      toast.error('邮件服务尚未配置，请联系管理员', {
        description: '请按照配置说明完成 EmailJS 设置',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 准备邮件模板参数
      const templateParams = {
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: formData.email || '未填写',
        consult_type: formData.type,
        message: formData.message || '无留言内容',
        to_email: '1059183064@qq.com',
        submit_time: new Date().toLocaleString('zh-CN'),
      };

      // 发送邮件
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      if (result.status === 200) {
        toast.success('提交成功！我们会尽快与您联系。');
        setFormData({
          name: '',
          phone: '',
          email: '',
          type: '',
          message: '',
        });
      } else {
        throw new Error('发送失败');
      }
    } catch (error) {
      console.error('邮件发送失败:', error);
      toast.error('提交失败，请稍后重试或直接拨打电话联系');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#1a2744] to-[#243454]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            开启您的<span className="text-[#d4a84b]">职业梦想</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            立即联系我们，获取专业的职业规划建议和详细的招聘信息。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#d4a84b]" />
              在线咨询
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">
                    您的姓名 <span className="text-[#d4a84b]">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="请输入姓名"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#d4a84b]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/80">
                    联系电话 <span className="text-[#d4a84b]">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="请输入电话"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#d4a84b]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">
                  电子邮箱 <span className="text-white/40">（选填）</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="请输入邮箱"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#d4a84b]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-white/80">
                  咨询方向 <span className="text-[#d4a84b]">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-[#d4a84b]">
                    <SelectValue placeholder="请选择咨询方向" />
                  </SelectTrigger>
                  <SelectContent>
                    {consultTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/80">
                  留言内容
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="请输入您想咨询的内容..."
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#d4a84b] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d4a84b] hover:bg-[#c49a3f] text-[#1a2744] font-semibold py-6 transition-transform hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  '提交中...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    提交咨询
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#d4a84b]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-[#d4a84b]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-white/80">{item.content}</p>
                  <p className="text-white/50 text-sm">{item.subContent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
