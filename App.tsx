
import React, { useState, useEffect, useRef } from 'react';
import { ViewState, Product, CartItem, AppContextType, User } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import { NavBar } from './components/NavBar';
import { Button } from './components/Button';
import { ProductCard } from './components/ProductCard';
import { getFashionAdvice } from './services/geminiService';
import { 
  LayoutDashboard, LogOut, Settings, ShoppingBag, Tag, Users, X, 
  MessageSquare, CheckCircle, Search, MapPin, CreditCard, Trash2, 
  Plus, Minus, ArrowRight, Star, Sparkles, ChevronLeft, Heart, 
  Truck, ShieldCheck, ArrowLeft, Send, Menu, Home as HomeIcon,
  Package, User as UserIcon, PieChart as PieChartIcon, Lock, Mail,
  Headphones, Paperclip, Smile
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

/* -------------------------------------------------------------------------- */
/*                             SUB-COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

const FashionAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    const result = await getFashionAdvice(query);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl mt-8 max-w-3xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-lavender-400/20 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none"></div>
      <div className="flex items-center gap-3 mb-4 text-white relative z-10">
        <div className="p-2 bg-lavender-400/20 rounded-full">
          <Sparkles size={20} className="text-lavender-400" />
        </div>
        <h3 className="font-bold text-lg">مساعد فخامة الذكي</h3>
      </div>
      
      <div className="flex gap-3 relative z-10">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="محتار وش تهدي؟ اسألني..."
          className="flex-1 bg-white/90 border-none rounded-2xl px-6 py-4 text-royal-900 placeholder-royal-900/40 focus:ring-4 focus:ring-lavender-400/30 outline-none shadow-inner transition-all"
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button 
          onClick={handleAsk}
          disabled={loading}
          className="bg-gradient-to-br from-lavender-400 to-royal-700 text-white w-14 h-14 rounded-2xl hover:shadow-lg hover:shadow-lavender-400/20 transition-all disabled:opacity-50 flex items-center justify-center shrink-0 active:scale-95"
        >
          {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={24} />}
        </button>
      </div>
      
      {response && (
        <div className="mt-6 p-6 bg-white rounded-2xl text-royal-900 leading-relaxed shadow-lg animate-pulse-once border border-white/50 relative z-10">
          <p className="font-medium">{response}</p>
        </div>
      )}
    </div>
  );
};

const ReviewsSection = () => (
  <div className="mt-20 border-t border-gray-100 pt-10">
    <h2 className="text-3xl font-bold text-royal-900 mb-8">آراء العملاء</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                {i === 1 ? 'س' : 'م'}
              </div>
              <div>
                <h4 className="font-bold text-royal-900">{i === 1 ? 'سلطان العتيبي' : 'محمد القحطاني'}</h4>
                <div className="flex text-amber-400 text-xs mt-1">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={12} fill="currentColor" />)}
                </div>
              </div>
            </div>
            <span className="text-gray-400 text-xs">قبل يومين</span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {i === 1 
              ? 'تجربة ممتازة جداً، الساعة وصلت مغلفة بشكل فخم والتوصيل كان أسرع مما توقعت. شكراً فخامة!'
              : 'الجودة لا يعلى عليها، والتطبيق سهل الاستخدام. الله يوفقكم.'}
          </p>
        </div>
      ))}
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                CHAT SYSTEM                                 */
/* -------------------------------------------------------------------------- */

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  time: string;
}

const ChatInterface = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'يا هلا بك في فخامة! 💜 آمرني كيف أقدر أخدمك اليوم؟', sender: 'agent', time: '10:00 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate agent reply
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: 'أبشر، جاري التحقق من الموضوع ولا يهمك...',
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-3xl overflow-hidden border border-gray-200 shadow-inner">
      {/* Chat Header */}
      <div className="bg-white p-4 border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-royal-900 flex items-center justify-center text-white">
              <Headphones size={18} />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h4 className="font-bold text-royal-900 text-sm">خدمة العملاء</h4>
            <p className="text-xs text-green-600 font-medium">متصل الآن</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm text-sm leading-relaxed relative ${
                msg.sender === 'user' 
                  ? 'bg-royal-900 text-white rounded-tl-none' 
                  : 'bg-white text-gray-700 border border-gray-100 rounded-tr-none'
              }`}
            >
              {msg.text}
              <span className={`text-[10px] block mt-1 opacity-70 ${msg.sender === 'user' ? 'text-lavender-100' : 'text-gray-400'}`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button type="button" className="p-3 text-gray-400 hover:text-royal-900 hover:bg-gray-50 rounded-xl transition-colors">
            <Paperclip size={20} />
          </button>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-royal-900/10 outline-none"
          />
          <button 
            type="submit" 
            disabled={!inputText.trim()}
            className="p-3 bg-royal-900 text-white rounded-xl hover:bg-royal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-royal-900/20"
          >
            <Send size={20} className={!inputText.trim() ? '' : 'ml-0.5'} />
          </button>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                MAIN VIEWS                                  */
/* -------------------------------------------------------------------------- */

const AuthView = ({ ctx }: { ctx: AppContextType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUser: User = {
        name: 'فهد الأحمد',
        email: email || 'fahad@example.com',
        avatar: 'https://i.pravatar.cc/150?u=fahad',
        role: 'user'
      };
      ctx.setUser(mockUser);
      ctx.setView('HOME');
      setIsLoading(false);
    }, 1500);
  };

  const handleGuest = () => {
    const guestUser: User = {
      name: 'زائر',
      email: '',
      avatar: '',
      role: 'guest'
    };
    ctx.setUser(guestUser);
    ctx.setView('HOME');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#F8FAFC]">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-royal-900/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-lavender-400/20 rounded-full blur-[100px]"></div>

      <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 min-h-[600px]">
        
        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center order-2 md:order-1">
          <div className="mb-10 text-center md:text-right">
             <div className="w-14 h-14 bg-gradient-to-br from-royal-900 to-royal-700 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto md:mx-0 shadow-lg shadow-royal-900/20">
              <span className="text-2xl font-bold">ف</span>
            </div>
            <h1 className="text-4xl font-black text-royal-900 mb-2">حياك الله! 👋</h1>
            <p className="text-gray-500 text-lg">سجل دخولك واستمتع بتجربة تسوق فاخرة.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-royal-900 pr-2">البريد الإلكتروني</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 border border-gray-100 text-gray-900 rounded-xl px-5 py-4 pl-12 focus:ring-2 focus:ring-royal-900/20 focus:bg-white focus:border-royal-900/50 transition-all outline-none"
                />
                <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-royal-900 pr-2">كلمة المرور</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-100 text-gray-900 rounded-xl px-5 py-4 pl-12 focus:ring-2 focus:ring-royal-900/20 focus:bg-white focus:border-royal-900/50 transition-all outline-none"
                />
                <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-royal-900 focus:ring-royal-900" />
                <span className="text-gray-500">تذكرني</span>
              </label>
              <a href="#" className="text-royal-700 font-bold hover:underline">نسيت كلمة المرور؟</a>
            </div>

            <Button 
              type="submit" 
              fullWidth 
              size="lg" 
              disabled={isLoading}
              className="mt-4"
            >
              {isLoading ? 'جاري الدخول...' : 'تسجيل الدخول'}
            </Button>
          </form>

          <div className="mt-8 relative text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <span className="relative bg-white px-4 text-sm text-gray-400 font-medium">أو</span>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={handleGuest}
              className="text-gray-500 font-bold hover:text-royal-900 transition-colors hover:bg-gray-50 px-6 py-3 rounded-xl"
            >
              تصفح كـ زائر <ArrowLeft className="inline mr-2" size={18} />
            </button>
          </div>
        </div>

        {/* Left Side: Visuals */}
        <div className="hidden md:block md:w-1/2 bg-royal-900 relative overflow-hidden order-1 md:order-2">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-royal-900/50 to-royal-900"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between p-16 text-white">
            <div className="flex justify-end">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
                جديد الموسم 2024 ✨
              </div>
            </div>
            
            <div>
              <h2 className="text-5xl font-black leading-tight mb-6">
                التميز هو<br/>
                <span className="text-lavender-400">اختيارك الأول.</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-sm leading-relaxed">
                انضم لأكثر من 100,000 عميل يثقون في فخامة لتلبية احتياجاتهم من المنتجات الراقية.
              </p>
            </div>

            <div className="flex gap-2">
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-lavender-400"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const HomeView = ({ ctx }: { ctx: AppContextType }) => (
  <div className="space-y-12 pb-20">
    {/* Hero Section */}
    <div className="relative overflow-hidden rounded-[3rem] bg-royal-900 text-white min-h-[600px] flex items-center mx-4 mt-4 shadow-2xl shadow-royal-900/30">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-royal-900 via-royal-900/80 to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-8 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in slide-in-from-right duration-1000">
          <span className="inline-block px-4 py-2 rounded-full bg-lavender-400/20 text-lavender-400 font-bold border border-lavender-400/20 backdrop-blur-md">
            وصل حديثاً 🔥
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            الأناقة السعودية <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender-400 to-white">بمفهوم جديد</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-md leading-relaxed">
            اكتشف تشكيلة حصرية من أرقى المنتجات العالمية والمحلية، مختارة بعناية لتناسب ذوقك الرفيع.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => ctx.setView('PLP')} size="lg" className="shadow-lavender-400/20">
              تسوق الآن
              <ArrowLeft className="mr-2" size={20} />
            </Button>
          </div>
        </div>
        
        <div className="hidden md:block relative">
          <div className="absolute inset-0 bg-lavender-400/30 blur-[100px] rounded-full animate-pulse"></div>
          <div className="relative z-10 animate-float">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl transform rotate-[-6deg] hover:rotate-0 transition-all duration-500">
              <img src={PRODUCTS[0].image} alt="Featured" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold">{PRODUCTS[0].name}</h3>
                <p className="text-lavender-400 font-bold text-xl mt-2">{PRODUCTS[0].price} ر.س</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* AI Assistant */}
    <div className="container mx-auto px-4">
      <FashionAssistant />
    </div>

    {/* Categories */}
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-royal-900 mb-8 flex items-center gap-2">
        <Tag className="text-lavender-400" /> الأقسام
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.id}
            onClick={() => ctx.setView('PLP')}
            className="group bg-white hover:bg-royal-900 transition-colors duration-300 p-6 rounded-2xl shadow-sm hover:shadow-xl cursor-pointer flex flex-col items-center gap-4 border border-gray-50"
          >
            <div className="w-16 h-16 rounded-full bg-gray-50 group-hover:bg-white/10 flex items-center justify-center transition-colors">
               {/* Using a generic icon here for simplicity, real app would map icons */}
               <ShoppingBag size={24} className="text-royal-900 group-hover:text-white" />
            </div>
            <span className="font-bold text-gray-700 group-hover:text-white text-lg">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Best Sellers */}
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-3xl font-bold text-royal-900">الأكثر مبيعاً</h2>
        <button onClick={() => ctx.setView('PLP')} className="text-royal-700 font-bold hover:text-royal-900 flex items-center gap-1">
          عرض الكل <ChevronLeft size={20} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.slice(0, 3).map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAdd={ctx.addToCart}
            onClick={ctx.setSelectedProductId}
          />
        ))}
      </div>
    </div>
  </div>
);

const PLPView = ({ ctx }: { ctx: AppContextType }) => (
  <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
    {/* Sidebar Filter */}
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 sticky top-24">
        <div className="flex items-center gap-2 mb-6 text-royal-900">
          <Settings size={20} />
          <h3 className="font-bold text-xl">تصفية</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-bold mb-3 text-sm text-gray-500 uppercase">السعر</h4>
            <input type="range" className="w-full accent-royal-900 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            <div className="flex justify-between text-sm mt-2 font-medium text-royal-900">
              <span>100 ر.س</span>
              <span>5000 ر.س</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-sm text-gray-500 uppercase">الفئة</h4>
            <div className="space-y-2">
              {CATEGORIES.map(cat => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-royal-900 focus:ring-royal-900" />
                  <span className="text-gray-700">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>

    {/* Product Grid */}
    <div className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-royal-900">كل المنتجات ({PRODUCTS.length})</h2>
        <select className="bg-white border-none rounded-xl px-4 py-2 shadow-sm text-gray-700 font-medium focus:ring-2 focus:ring-royal-900/20 outline-none">
          <option>الأحدث</option>
          <option>الأعلى سعراً</option>
          <option>الأقل سعراً</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAdd={ctx.addToCart}
            onClick={ctx.setSelectedProductId}
          />
        ))}
      </div>
    </div>
  </div>
);

const PDPView = ({ ctx, productId }: { ctx: AppContextType, productId: number }) => {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <button onClick={() => ctx.setView('PLP')} className="mb-8 flex items-center gap-2 text-gray-500 hover:text-royal-900 transition-colors">
        <ArrowRight size={20} /> العودة للمنتجات
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-50 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="bg-gray-100 relative group h-[500px] md:h-auto">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur rounded-full hover:bg-white text-gray-400 hover:text-red-500 transition-all shadow-lg">
              <Heart size={24} />
            </button>
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-lavender-400 font-bold mb-4">
              <span className="px-3 py-1 bg-lavender-100 rounded-lg text-sm">{product.category}</span>
              {product.isTrending && <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-lg text-sm flex items-center gap-1"><Sparkles size={12}/> هبة</span>}
            </div>

            <h1 className="text-4xl font-black text-royal-900 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-lg">
                <Star className="text-amber-400 fill-current" size={16} />
                <span className="font-bold text-royal-900">{product.rating}</span>
              </div>
              <span className="text-gray-400 text-sm">({product.reviews_count} تقييم)</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-black text-royal-900">{product.price} <span className="text-lg font-medium text-gray-400">ر.س</span></span>
              <span className="text-green-500 font-bold mb-2 bg-green-50 px-2 py-1 rounded text-sm">شامل الضريبة</span>
            </div>

            <div className="flex gap-4 mt-auto">
              <Button onClick={() => ctx.addToCart(product)} fullWidth size="lg" className="shadow-royal-900/20">
                إضافة للسلة - {product.price} ر.س
              </Button>
              <button className="p-4 rounded-xl border-2 border-gray-100 hover:border-royal-900 text-royal-900 transition-colors">
                <MessageSquare size={24} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-12 border-t border-gray-100 pt-8">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-2"><Truck size={20}/></div>
                <p className="text-xs font-bold text-royal-900">توصيل سريع</p>
                <p className="text-[10px] text-gray-500">خلال 2-4 أيام</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto bg-purple-50 rounded-full flex items-center justify-center text-purple-500 mb-2"><ShieldCheck size={20}/></div>
                <p className="text-xs font-bold text-royal-900">ضمان ذهبي</p>
                <p className="text-[10px] text-gray-500">سنتين صيانة</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2"><CheckCircle size={20}/></div>
                <p className="text-xs font-bold text-royal-900">أصلي 100%</p>
                <p className="text-[10px] text-gray-500">موثق ومعتمد</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ReviewsSection />
    </div>
  );
};

const CartView = ({ ctx }: { ctx: AppContextType }) => {
  const subtotal = ctx.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 25;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-royal-900 mb-8">سلة المشتريات ({ctx.cart.length})</h1>
      
      {ctx.cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
          <p className="text-xl text-gray-500 font-medium">سلتك فاضية، دلع نفسك وتسوق!</p>
          <Button onClick={() => ctx.setView('PLP')} variant="outline" className="mt-6">تصفح المنتجات</Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {ctx.cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover bg-gray-100" />
                <div className="flex-1">
                  <h3 className="font-bold text-royal-900">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                  <div className="font-bold text-lavender-400">{item.price} ر.س</div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
                  <button onClick={() => ctx.updateQuantity(item.id, -1)} className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600"><Minus size={16} /></button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => ctx.updateQuantity(item.id, 1)} className="p-2 hover:bg-white rounded-lg transition-colors text-royal-900"><Plus size={16} /></button>
                </div>
                <button onClick={() => ctx.removeFromCart(item.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors mr-2">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-royal-900/5 sticky top-24">
              <h3 className="text-xl font-bold text-royal-900 mb-6">ملخص الطلب</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>المجموع الفرعي</span>
                  <span className="font-bold">{subtotal} ر.س</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>الشحن</span>
                  <span className="font-bold">{shipping} ر.س</span>
                </div>
                <div className="h-px bg-gray-100 my-4"></div>
                <div className="flex justify-between text-xl font-bold text-royal-900">
                  <span>الإجمالي</span>
                  <span>{total} ر.س</span>
                </div>
              </div>
              <div className="relative mb-4">
                <input type="text" placeholder="عندك كود خصم؟" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-royal-900/10 outline-none" />
                <button className="absolute left-2 top-2 bottom-2 px-3 bg-royal-900 text-white text-xs font-bold rounded-lg hover:bg-royal-800 transition-colors">تطبيق</button>
              </div>
              <Button onClick={() => ctx.setView('CHECKOUT')} fullWidth size="lg">
                إتمام الشراء
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckoutView = ({ ctx }: { ctx: AppContextType }) => {
  const [step, setStep] = useState(1);
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-center mb-12">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-royal-900 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
        <div className={`w-20 h-1 bg-gray-200 mx-2 ${step >= 2 ? 'bg-royal-900' : ''}`}></div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-royal-900 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
        <div className={`w-20 h-1 bg-gray-200 mx-2 ${step >= 3 ? 'bg-royal-900' : ''}`}></div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-royal-900 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-50">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-royal-900 mb-6 flex items-center gap-2"><MapPin /> عنوان التوصيل</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="الاسم الأول" className="bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-royal-900/20 outline-none" />
              <input type="text" placeholder="اسم العائلة" className="bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-royal-900/20 outline-none" />
              <input type="text" placeholder="رقم الجوال (05xxxxxxxx)" className="md:col-span-2 bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-royal-900/20 outline-none" />
              <div className="md:col-span-2 h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2" />
                  <span>حدد موقعك على الخريطة</span>
                </div>
              </div>
            </div>
            <Button onClick={() => setStep(2)} fullWidth>التالي: الدفع</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-royal-900 mb-6 flex items-center gap-2"><CreditCard /> طريقة الدفع</h2>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 border border-royal-900/20 bg-royal-50 rounded-xl cursor-pointer">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" className="text-royal-900 focus:ring-royal-900" defaultChecked />
                  <span className="font-bold text-royal-900">بطاقة مدى / ائتمانية</span>
                </div>
                <CreditCard size={20} className="text-royal-900" />
              </label>
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" className="text-royal-900 focus:ring-royal-900" />
                  <span className="font-bold text-gray-700">Apple Pay</span>
                </div>
                {/* Icon placeholder */}
                <div className="w-8 h-5 bg-black rounded"></div>
              </label>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => setStep(1)} variant="outline" className="w-1/3">رجوع</Button>
              <Button onClick={() => setStep(3)} fullWidth>تأكيد الطلب</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-black text-royal-900 mb-2">تم استلام طلبك بنجاح!</h2>
            <p className="text-gray-500 mb-8">رقم الطلب #892333 - بيوصلك رسالة بالتفاصيل</p>
            <Button onClick={() => ctx.setView('HOME')}>العودة للرئيسية</Button>
          </div>
        )}
      </div>
    </div>
  );
};

const UserDashboard = ({ ctx }: { ctx: AppContextType }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'complaints' | 'settings'>('orders');
  const [showChat, setShowChat] = useState(false);

  const renderContent = () => {
    if (activeTab === 'orders') {
      return (
        <div className="space-y-4 animate-in fade-in">
          <h2 className="text-2xl font-bold text-royal-900 mb-6">آخر الطلبات</h2>
          {[1, 2, 3].map((order) => (
            <div key={order} className="border border-gray-100 rounded-2xl p-6 flex flex-wrap items-center justify-between hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <div className="font-bold text-royal-900">طلب #4039{order}</div>
                <div className="text-sm text-gray-500">24 أكتوبر 2024</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${order === 1 ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                <span className="text-sm font-medium">{order === 1 ? 'تم التوصيل' : 'قيد التجهيز'}</span>
              </div>
              <div className="font-bold text-royal-900">450 ر.س</div>
              <Button variant="outline" size="sm">التفاصيل</Button>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'complaints') {
      if (showChat) {
        return <ChatInterface onClose={() => setShowChat(false)} />;
      }
      return (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-royal-900">التذاكر والدعم الفني</h2>
            <Button onClick={() => setShowChat(true)} className="gap-2">
              <MessageSquare size={18} /> محادثة جديدة
            </Button>
          </div>
          
          <div className="grid gap-4">
            {[
              { id: 101, title: 'مشكلة في استرجاع منتج', date: 'أمس', status: 'open' },
              { id: 102, title: 'استفسار عن المقاسات', date: 'قبل أسبوع', status: 'closed' }
            ].map((ticket) => (
              <div key={ticket.id} className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-royal-900/20 transition-all cursor-pointer" onClick={() => setShowChat(true)}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-royal-900 mb-1">{ticket.title}</h3>
                    <p className="text-sm text-gray-400">تذكرة #{ticket.id} • {ticket.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${ticket.status === 'open' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {ticket.status === 'open' ? 'جاري المعالجة' : 'مغلقة'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-royal-50 rounded-2xl p-6 flex items-center gap-4 mt-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-royal-900 shadow-sm">
              <Headphones size={24} />
            </div>
            <div>
              <h4 className="font-bold text-royal-900">نحن هنا لمساعدتك</h4>
              <p className="text-sm text-gray-500">فريقنا متواجد على مدار الساعة لخدمتك.</p>
            </div>
          </div>
        </div>
      );
    }

    return <div className="text-center py-12 text-gray-400">قريباً...</div>;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-72 space-y-2">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 mb-6 text-center">
            <div className="w-24 h-24 bg-royal-100 rounded-full mx-auto mb-4 flex items-center justify-center text-royal-900 font-bold text-3xl">
               {ctx.user?.avatar ? <img src={ctx.user.avatar} alt="User" className="w-full h-full rounded-full object-cover"/> : (ctx.user?.name?.[0] || 'ز')}
            </div>
            <h3 className="font-bold text-xl text-royal-900">{ctx.user?.name || 'ضيف فخامة'}</h3>
            <p className="text-gray-400 text-sm">{ctx.user?.role === 'guest' ? 'زائر' : 'عميل مميز'}</p>
          </div>
          <nav className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 space-y-1">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 font-bold rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-royal-50 text-royal-900' : 'text-gray-500 hover:bg-gray-50 hover:text-royal-900'}`}
            >
              <Package size={20}/> طلباتي
            </button>
            <button 
              onClick={() => setActiveTab('favorites')}
              className={`w-full flex items-center gap-3 px-4 py-3 font-bold rounded-xl transition-colors ${activeTab === 'favorites' ? 'bg-royal-50 text-royal-900' : 'text-gray-500 hover:bg-gray-50 hover:text-royal-900'}`}
            >
              <Heart size={20}/> المفضلة
            </button>
            <button 
              onClick={() => setActiveTab('complaints')}
              className={`w-full flex items-center gap-3 px-4 py-3 font-bold rounded-xl transition-colors ${activeTab === 'complaints' ? 'bg-royal-50 text-royal-900' : 'text-gray-500 hover:bg-gray-50 hover:text-royal-900'}`}
            >
              <Headphones size={20}/> الشكاوى والدعم
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 font-bold rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-royal-50 text-royal-900' : 'text-gray-500 hover:bg-gray-50 hover:text-royal-900'}`}
            >
              <Settings size={20}/> الإعدادات
            </button>
            <div className="h-px bg-gray-100 my-2"></div>
            <button 
              onClick={() => { ctx.setUser(null); ctx.setView('AUTH'); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 font-medium rounded-xl transition-colors"
            >
              <LogOut size={20}/> تسجيل خروج
            </button>
          </nav>
          {ctx.user?.role !== 'guest' && (
            <button onClick={() => ctx.setView('ADMIN_DASHBOARD')} className="w-full mt-4 py-3 text-xs text-gray-300 hover:text-royal-900">لوحة التحكم (تجريبي)</button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 min-h-[600px]">
          {ctx.user?.role === 'guest' ? (
            <div className="text-center py-20 flex flex-col items-center justify-center h-full">
               <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                 <Lock size={32} />
               </div>
               <h3 className="text-xl font-bold text-royal-900 mb-2">المحتوى محمي</h3>
               <p className="text-gray-500 mb-8 max-w-md">سجل دخولك عشان تقدر تشوف طلباتك، تتواصل مع الدعم الفني، وتحفظ منتجاتك المفضلة.</p>
               <Button onClick={() => { ctx.setUser(null); ctx.setView('AUTH'); }}>تسجيل الدخول</Button>
            </div>
          ) : renderContent()}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ ctx }: { ctx: AppContextType }) => {
  const data = [
    { name: 'ساعات', sales: 4000 },
    { name: 'عطور', sales: 3000 },
    { name: 'حقائب', sales: 2000 },
    { name: 'مجوهرات', sales: 2780 },
    { name: 'أحذية', sales: 1890 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-royal-900">لوحة التحكم</h1>
        <Button onClick={() => ctx.setView('HOME')} variant="ghost">العودة للمتجر</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[{ title: 'المبيعات', val: '240,000', unit: 'ر.س' }, { title: 'الطلبات', val: '1,450', unit: 'طلب' }, { title: 'الزوار', val: '85,000', unit: 'زائر' }, { title: 'العملاء', val: '400', unit: 'جديد' }].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
            <h3 className="text-gray-500 text-sm font-bold mb-2">{stat.title}</h3>
            <div className="text-3xl font-black text-royal-900">{stat.val} <span className="text-xs font-normal text-gray-400">{stat.unit}</span></div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
          <h3 className="font-bold text-xl text-royal-900 mb-6">المبيعات حسب القسم</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#4E4376' }} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="sales" fill="#4E4376" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
          <h3 className="font-bold text-xl text-royal-900 mb-6">الطلبات الأخيرة</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="pb-3">رقم الطلب</th>
                  <th className="pb-3">العميل</th>
                  <th className="pb-3">الحالة</th>
                  <th className="pb-3">المبلغ</th>
                </tr>
              </thead>
              <tbody className="text-royal-900 font-medium">
                {[1,2,3,4,5].map(i => (
                  <tr key={i} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-3 group-hover:text-royal-700">#892{i}</td>
                    <td className="py-3">عبدالله محمد</td>
                    <td className="py-3"><span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">مكتمل</span></td>
                    <td className="py-3">350 ر.س</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                APP COMPONENT                               */
/* -------------------------------------------------------------------------- */

const App = () => {
  const [currentView, setView] = useState<ViewState>('AUTH');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [currentView, selectedProductId]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleProductClick = (id: number) => {
    setSelectedProductId(id);
    setView('PDP');
  };

  const context: AppContextType = {
    user,
    setUser,
    currentView,
    setView,
    selectedProductId,
    setSelectedProductId: handleProductClick,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    searchQuery,
    setSearchQuery
  };

  const renderView = () => {
    switch (currentView) {
      case 'AUTH': return <AuthView ctx={context} />;
      case 'HOME': return <HomeView ctx={context} />;
      case 'PLP': return <PLPView ctx={context} />;
      case 'PDP': return selectedProductId ? <PDPView ctx={context} productId={selectedProductId} /> : <PLPView ctx={context} />;
      case 'CART': return <CartView ctx={context} />;
      case 'CHECKOUT': return <CheckoutView ctx={context} />;
      case 'USER_DASHBOARD': return <UserDashboard ctx={context} />;
      case 'ADMIN_DASHBOARD': return <AdminDashboard ctx={context} />;
      default: return <HomeView ctx={context} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-lavender-400/30">
      {currentView !== 'AUTH' && <NavBar ctx={context} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />}
      
      {/* Mobile Sidebar */}
      {isMenuOpen && currentView !== 'AUTH' && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute top-0 right-0 w-3/4 h-full bg-white shadow-2xl p-6 animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-royal-900">فخامة</h2>
              <button onClick={() => setIsMenuOpen(false)}><X size={24}/></button>
            </div>
            <div className="space-y-4 flex flex-col">
              <button onClick={() => setView('HOME')} className="text-right font-bold text-lg py-2 border-b border-gray-100">الرئيسية</button>
              <button onClick={() => setView('PLP')} className="text-right font-bold text-lg py-2 border-b border-gray-100">المنتجات</button>
              <button onClick={() => setView('USER_DASHBOARD')} className="text-right font-bold text-lg py-2 border-b border-gray-100">حسابي</button>
              <button onClick={() => setView('CART')} className="text-right font-bold text-lg py-2 border-b border-gray-100">السلة</button>
            </div>
          </div>
        </div>
      )}

      <main className="animate-in fade-in duration-500">
        {renderView()}
      </main>

      {currentView !== 'AUTH' && (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-royal-900 rounded-lg flex items-center justify-center text-white font-bold">ف</div>
                  <span className="text-2xl font-black text-royal-900">فخامة</span>
                </div>
                <p className="text-gray-500 leading-relaxed">
                  وجهتك الأولى للتسوق الفاخر في المملكة. نجمع لك أرقى الماركات العالمية والمحلية في مكان واحد.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-royal-900 mb-6">روابط سريعة</h4>
                <ul className="space-y-3 text-gray-500">
                  <li><button onClick={() => setView('HOME')} className="hover:text-royal-900">الرئيسية</button></li>
                  <li><button onClick={() => setView('PLP')} className="hover:text-royal-900">كل المنتجات</button></li>
                  <li><button onClick={() => setView('USER_DASHBOARD')} className="hover:text-royal-900">حسابي</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-royal-900 mb-6">الدعم</h4>
                <ul className="space-y-3 text-gray-500">
                  <li>سياسة الاسترجاع</li>
                  <li>الأسئلة الشائعة</li>
                  <li>تواصل معنا</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-royal-900 mb-6">طرق الدفع</h4>
                <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  <div className="h-8 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="text-center text-gray-400 text-sm pt-8 border-t border-gray-50">
              © 2024 متجر فخامة. جميع الحقوق محفوظة.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
