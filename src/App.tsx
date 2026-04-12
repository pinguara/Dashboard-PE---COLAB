/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  FileText, 
  Smartphone, 
  Bot, 
  Settings, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  ChevronRight,
  Info,
  PlusCircle,
  Home,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';
import { categories } from './data';
import { Category, MonthlyResult } from './types';
import { supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';

const COLORS = {
  primary: '#2D2A70', // Mesquita Blue
  secondary: '#C5A059', // Mesquita Gold
  success: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
  bg: '#f8fafc'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [monthlyResults, setMonthlyResults] = useState<MonthlyResult[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data, error } = await supabase
          .from('monthly_results')
          .select('*');
        
        if (error) throw error;

        if (data) {
          const mappedData: MonthlyResult[] = data.map(item => ({
            goalId: item.goal_id,
            year: item.year,
            month: item.month,
            value: item.value
          }));
          setMonthlyResults(mappedData);
        }
      } catch (error) {
        console.error('Error fetching results from Supabase:', error);
        // Fallback to localStorage if Supabase fails
        const saved = localStorage.getItem('mesquita_dashboard_results');
        if (saved) {
          setMonthlyResults(JSON.parse(saved));
        }
      } finally {
        setIsLoaded(true);
      }
    };

    fetchResults();
  }, []);

  const getTargetDate = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() - 1, 1);
  };

  const targetDate = getTargetDate();
  const targetMonth = targetDate.getMonth() + 1;
  const targetYear = targetDate.getFullYear();
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
        alert('Conta criada com sucesso! Verifique seu e-mail se a confirmação estiver ativada ou tente fazer login.');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
        setShowLoginModal(false);
      }
      setAuthEmail('');
      setAuthPassword('');
    } catch (error: any) {
      alert('Erro na autenticação: ' + error.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setActiveTab('home');
  };

  const handleAddResult = async (goalId: string, value: number) => {
    if (!user) {
      alert('Você precisa estar logado para salvar dados.');
      return;
    }
    const newResult: MonthlyResult = {
      goalId,
      year: targetYear,
      month: targetMonth,
      value
    };
    
    // Optimistic update
    setMonthlyResults(prev => {
      const filtered = prev.filter(r => r.goalId !== goalId || r.year !== targetYear || r.month !== targetMonth);
      return [...filtered, newResult];
    });

    // Save to localStorage as backup
    const updatedResults = [...monthlyResults.filter(r => r.goalId !== goalId || r.year !== targetYear || r.month !== targetMonth), newResult];
    localStorage.setItem('mesquita_dashboard_results', JSON.stringify(updatedResults));

    // Sync with Supabase
    setIsSyncing(true);
    try {
      const { error } = await supabase
        .from('monthly_results')
        .upsert({
          goal_id: goalId,
          year: targetYear,
          month: targetMonth,
          value: value
        }, { onConflict: 'goal_id,year,month' });

      if (error) throw error;
    } catch (error) {
      console.error('Error syncing with Supabase:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const getStatusColor = (goalId: string, targetValue: string | number) => {
    const result = monthlyResults.find(r => r.goalId === goalId && r.year === targetYear);
    if (!result) return 'bg-gray-200';

    // Handle percentage targets
    let target = typeof targetValue === 'string' ? parseFloat(targetValue.replace(/[^\d.-]/g, '')) : targetValue;
    let current = result.value;

    // If the target is "0" (like reducing demands to 0), the logic is different
    if (target === 0) {
      if (current === 0) return 'bg-green-500';
      if (current <= 5) return 'bg-yellow-500'; // Arbitrary small threshold for "close"
      return 'bg-red-500';
    }

    // Handle "≥" targets
    const isGreaterOrEqual = typeof targetValue === 'string' && targetValue.includes('≥');
    const isLessOrEqual = typeof targetValue === 'string' && targetValue.includes('≤');

    if (isGreaterOrEqual) {
      if (current >= target) return 'bg-green-500';
      if (current >= target * 0.75) return 'bg-yellow-500';
      return 'bg-red-500';
    }

    if (isLessOrEqual) {
      if (current <= target) return 'bg-green-500';
      if (current <= target * 1.25) return 'bg-yellow-500';
      return 'bg-red-500';
    }

    // Default: higher is better
    if (current >= target) return 'bg-green-500';
    if (current >= target * 0.75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderHome = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[#2D2A70]">Dashboard do Setor de Otimização de Serviços</h1>
        <p className="text-xl text-gray-600">
          Este é o local de acompanhamento das metas do setor em respeito ao planejamento estratégico do quadriênio 2025-2028.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <h2 className="text-2xl font-semibold text-[#2D2A70] flex items-center gap-2">
          <Info className="w-6 h-6 text-[#C5A059]" />
          Sobre o Setor de Otimização de Serviços
        </h2>
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
          <p>
            Implementado em agosto de 2018 na Prefeitura de Mesquita, o Setor de Otimização de Serviços atua na Secretaria de Planejamento (SEPLAG). 
            O setor se divide na coordenação de demandas do cidadão e na otimização com serviços digitais.
          </p>
          <p>
            O planejamento estratégico é o processo de definição dos objetivos de longo prazo e dos planos de ação necessários para alcançá-los, 
            orientando a organização em direção ao seu futuro com base em decisões informadas e alinhadas aos valores de uma gestão pública eficiente.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const categoryImages: Record<string, string> = {
            demandas: 'https://images.unsplash.com/photo-1471958680802-1345a694ba6d?auto=format&fit=crop&w=400&h=250&q=80', // Lamppost with bulb
            satisfacao: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&h=250&q=80', // Survey
            aprimoramento: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&h=250&q=80', // Process flow
            cartas: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=400&h=250&q=80', // Digital letter
            usuarios: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&h=250&q=80', // People
            digitais: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&h=250&q=80', // Digital services
            campo: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&h=250&q=80', // App on phone
            kids: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&h=250&q=80', // Children
            dash: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&h=250&q=80', // Dashboard
            bot: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=400&h=250&q=80' // WhatsApp/Bot
          };

          const imageUrl = categoryImages[cat.id] || `https://picsum.photos/seed/${cat.id}/400/250`;

          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(cat.id)}
              className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-left transition-all hover:shadow-xl hover:border-[#C5A059]/50"
            >
              <div className="h-32 w-full overflow-hidden relative">
                <img 
                  src={imageUrl} 
                  alt={cat.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A70]/80 to-transparent opacity-60" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-xs font-black text-white/90 bg-[#C5A059] px-2 py-1 rounded">0{idx + 1}</span>
                </div>
              </div>
              
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#2D2A70] group-hover:text-[#C5A059] transition-colors line-clamp-1">{cat.title}</h3>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );

  const renderCategory = (category: Category) => {
    const groupedGoals = category.goals.reduce((acc, goal) => {
      const axis = goal.axis || 'Geral';
      if (!acc[axis]) acc[axis] = [];
      acc[axis].push(goal);
      return acc;
    }, {} as Record<string, typeof category.goals>);

    const axisList = Object.keys(groupedGoals);

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8"
      >
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-3xl font-bold text-[#2D2A70]">{category.title}</h2>
          <p className="text-gray-600 text-lg">{category.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <h3 className="font-bold text-[#C5A059] uppercase tracking-wider text-sm">Iniciativas</h3>
              <ul className="space-y-2">
                {category.initiatives.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-[#C5A059] uppercase tracking-wider text-sm">Resultados Esperados</h3>
              <ul className="space-y-2">
                {category.expectedResults.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2D2A70] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {axisList.map((axis) => (
          <div key={axis} className="space-y-4">
            {axis !== 'Geral' && (
              <div className="flex items-center gap-3 px-2">
                <div className="h-8 w-1.5 bg-[#C5A059] rounded-full" />
                <h3 className="text-xl font-bold text-[#2D2A70]">
                  {axis}
                </h3>
              </div>
            )}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 font-bold text-[#2D2A70] text-sm uppercase tracking-wider">Meta</th>
                      <th className="p-4 font-bold text-[#2D2A70] text-sm uppercase tracking-wider">Fórmula</th>
                      <th className="p-4 font-bold text-[#2D2A70] text-sm uppercase tracking-wider text-center">2025</th>
                      <th className="p-4 font-bold text-[#2D2A70] text-sm uppercase tracking-wider text-center">2026</th>
                      <th className="p-4 font-bold text-[#2D2A70] text-sm uppercase tracking-wider text-center">2027</th>
                      <th className="p-4 font-bold text-[#2D2A70] text-sm uppercase tracking-wider text-center">2028</th>
                      <th className="p-4 font-bold text-[#2D2A70] text-sm uppercase tracking-wider text-center">Realizado</th>
                      <th className="p-4 font-bold text-[#2D2A70] text-sm uppercase tracking-wider text-center">Farol ({targetYear})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedGoals[axis].map((goal) => {
                      const currentResult = monthlyResults.find(r => r.goalId === goal.id && r.year === targetYear && r.month === targetMonth);
                      return (
                        <tr key={goal.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 text-gray-800 font-medium max-w-xs">{goal.meta}</td>
                          <td className="p-4 text-gray-500 text-sm italic">{goal.formula}</td>
                          <td className="p-4 text-center font-mono text-sm">{goal.indicators[2025]}</td>
                          <td className="p-4 text-center font-mono text-sm">{goal.indicators[2026]}</td>
                          <td className="p-4 text-center font-mono text-sm">{goal.indicators[2027]}</td>
                          <td className="p-4 text-center font-mono text-sm">{goal.indicators[2028]}</td>
                          <td className="p-4 text-center font-mono text-sm font-bold text-[#2D2A70]">
                            {currentResult ? currentResult.value : '-'}
                          </td>
                          <td className="p-4">
                            <div className="flex justify-center">
                              <div className={`w-4 h-4 rounded-full shadow-inner ${getStatusColor(goal.id, goal.indicators[targetYear] || goal.indicators[2025])}`} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    );
  };

  const renderDataEntry = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <PlusCircle className="w-8 h-8 text-[#C5A059]" />
            <h2 className="text-2xl font-bold text-[#2D2A70]">Preenchimento de Dados (Mês de Referência / {targetYear})</h2>
            {isSyncing && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-4 h-4 border-2 border-[#C5A059] border-t-transparent rounded-full"
              />
            )}
          </div>
          <button 
            onClick={async () => {
              if (confirm('Deseja realmente limpar todos os dados lançados?')) {
                setMonthlyResults([]);
                localStorage.removeItem('mesquita_dashboard_results');
                
                setIsSyncing(true);
                try {
                  const { error } = await supabase
                    .from('monthly_results')
                    .delete()
                    .neq('goal_id', ''); // Delete all rows
                  
                  if (error) throw error;
                } catch (error) {
                  console.error('Error clearing Supabase data:', error);
                } finally {
                  setIsSyncing(false);
                }
              }
            }}
            className="text-xs text-red-500 hover:underline flex items-center gap-1"
          >
            <XCircle className="w-3 h-3" />
            Limpar tudo
          </button>
        </div>

        <p className="text-sm text-gray-500 bg-blue-50 p-4 rounded-lg border border-blue-100">
          Insira os resultados alcançados no mês de referência. O farol nas abas de categoria será atualizado automaticamente com base nestes valores em relação às metas de {targetYear}.
        </p>
        
        <div className="space-y-12">
          {categories.map(cat => {
            const groupedGoals = cat.goals.reduce((acc, goal) => {
              const axis = goal.axis || 'Geral';
              if (!acc[axis]) acc[axis] = [];
              acc[axis].push(goal);
              return acc;
            }, {} as Record<string, typeof cat.goals>);
            
            const axisList = Object.keys(groupedGoals);

            return (
              <div key={cat.id} className="space-y-6">
                <h3 className="font-bold text-xl text-[#2D2A70] flex items-center gap-3 border-b pb-2">
                  <div className="w-3 h-3 rounded-full bg-[#C5A059]" />
                  {cat.title}
                </h3>
                
                <div className="space-y-8 pl-4">
                  {axisList.map(axis => (
                    <div key={axis} className="space-y-3">
                      {axis !== 'Geral' && (
                        <h4 className="text-sm font-bold text-[#C5A059] uppercase tracking-widest flex items-center gap-2">
                          <ChevronRight className="w-4 h-4" />
                          {axis}
                        </h4>
                      )}
                      <div className="grid grid-cols-1 gap-3">
                        {groupedGoals[axis].map(goal => {
                          const currentResult = monthlyResults.find(r => r.goalId === goal.id && r.year === targetYear && r.month === targetMonth);
                          return (
                            <div key={goal.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                              <div className="space-y-1 flex-1">
                                <span className="text-sm font-medium text-gray-800">{goal.meta}</span>
                                <div className="text-[10px] text-gray-400 uppercase tracking-wider">{goal.formula}</div>
                              </div>
                              <div className="flex items-center gap-4 shrink-0">
                                <div className="text-right">
                                  <div className="text-[10px] text-gray-400 uppercase">Meta {targetYear}</div>
                                  <div className="text-sm font-bold text-[#2D2A70]">{goal.indicators[targetYear] || goal.indicators[2025]}</div>
                                </div>
                                <div className="relative">
                                  <input
                                    type="text"
                                    placeholder="0"
                                    className="w-24 p-2 pl-3 border rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#C5A059] outline-none bg-white shadow-sm"
                                    value={currentResult?.value || ''}
                                    onChange={(e) => {
                                      const val = e.target.value.replace(',', '.');
                                      if (val === '' || !isNaN(Number(val))) {
                                        handleAddResult(goal.id, val === '' ? 0 : Number(val));
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Sidebar / Navigation */}
      <nav className="fixed left-0 top-0 h-full w-64 bg-[#2D2A70] text-white p-6 hidden lg:flex flex-col shadow-xl z-50">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <LayoutDashboard className="text-[#2D2A70] w-6 h-6" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider text-[#C5A059]">Setor de Otimização de Serviços</span>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <button 
            onClick={() => setActiveTab('home')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'home' ? 'bg-white/10 text-[#C5A059]' : 'hover:bg-white/5 text-gray-300'}`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Início</span>
          </button>

          <div className="pt-4 pb-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-3">Categorias</span>
          </div>

          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-sm ${activeTab === cat.id ? 'bg-white/10 text-[#C5A059]' : 'hover:bg-white/5 text-gray-300'}`}
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === cat.id ? 'rotate-90' : ''}`} />
              <span className="truncate">{cat.title}</span>
            </button>
          ))}

          {user && (
            <div className="pt-6">
              <button 
                onClick={() => setActiveTab('data-entry')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${activeTab === 'data-entry' ? 'bg-white/10 text-[#C5A059]' : 'hover:bg-white/5 text-gray-300'}`}
              >
                <PlusCircle className="w-5 h-5" />
                <span className="font-medium">Lançar Dados</span>
              </button>
              <a 
                href="https://meusetor.vercel.app" 
                className="w-full flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-white/5 text-gray-300"
              >
                <Info className="w-5 h-5" />
                <span className="font-medium">Setor</span>
              </a>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-white/10 space-y-2">
          {user ? (
            <div className="space-y-2">
              <div className="px-3 py-2 bg-white/5 rounded-lg">
                <p className="text-[10px] text-gray-400 uppercase">Logado como</p>
                <p className="text-xs font-medium truncate text-[#C5A059]">{user.email}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 p-2 text-xs text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
              >
                <Settings className="w-3 h-3" />
                Sair do Painel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowLoginModal(true)}
              className="w-full flex items-center justify-center gap-2 p-3 bg-[#C5A059] hover:bg-[#b08e4d] text-[#2D2A70] font-bold rounded-lg transition-all text-sm"
            >
              <Users className="w-4 h-4" />
              Acesso Restrito
            </button>
          )}
        </div>

        <div className="pt-6 text-[10px] text-gray-500 text-center">
          © 2025-2028 Prefeitura de Mesquita<br/>Setor de Otimização de Serviços
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="lg:hidden bg-[#2D2A70] text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <span className="font-bold">Setor de Otimização de Serviços</span>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-72 bg-[#2D2A70] text-white z-[70] lg:hidden shadow-2xl flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-lg">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                <button 
                  onClick={() => {
                    setActiveTab('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'home' ? 'bg-white/10 text-[#C5A059]' : 'hover:bg-white/5 text-gray-300'}`}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Início</span>
                </button>

                <div className="pt-4 pb-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-3">Categorias</span>
                </div>

                {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => {
                      setActiveTab(cat.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all text-sm ${activeTab === cat.id ? 'bg-white/10 text-[#C5A059]' : 'hover:bg-white/5 text-gray-300'}`}
                  >
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === cat.id ? 'rotate-90' : ''}`} />
                    <span className="truncate">{cat.title}</span>
                  </button>
                ))}

                <div className="pt-6">
                  <button 
                    onClick={() => {
                      setActiveTab('data-entry');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'data-entry' ? 'bg-white/10 text-[#C5A059]' : 'hover:bg-white/5 text-gray-300'}`}
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span className="font-medium">Lançar Dados</span>
                  </button>
                  <a 
                    href="https://meusetor.vercel.app" 
                    className="w-full flex items-center gap-3 p-4 rounded-xl transition-all hover:bg-white/5 text-gray-300"
                  >
                    <Info className="w-5 h-5" />
                    <span className="font-medium">Setor</span>
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 text-[10px] text-gray-500 text-center">
                © 2025-2028 Prefeitura de Mesquita
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64 p-8 min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && renderHome()}
          {categories.find(c => c.id === activeTab) && renderCategory(categories.find(c => c.id === activeTab)!)}
          {activeTab === 'data-entry' && renderDataEntry()}
        </AnimatePresence>
      </main>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10"
            >
              <div className="bg-[#2D2A70] p-6 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold">{isSignUp ? 'Criar Nova Conta' : 'Acesso ao Painel'}</h3>
                <button onClick={() => setShowLoginModal(false)}><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleAuth} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">E-mail</label>
                  <input 
                    type="email" 
                    required
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#C5A059] outline-none"
                    placeholder="seu@email.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Senha</label>
                  <input 
                    type="password" 
                    required
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#C5A059] outline-none"
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                  />
                </div>
                <button 
                  disabled={isAuthLoading}
                  className="w-full py-4 bg-[#2D2A70] text-white font-bold rounded-xl hover:bg-[#1e1c4a] transition-all disabled:opacity-50"
                >
                  {isAuthLoading ? 'Processando...' : (isSignUp ? 'Cadastrar' : 'Entrar no Sistema')}
                </button>
                
                <div className="text-center">
                  <button 
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-[#2D2A70] hover:underline font-medium"
                  >
                    {isSignUp ? 'Já tem uma conta? Entre aqui' : 'Não tem conta? Cadastre-se'}
                  </button>
                </div>

                <p className="text-[10px] text-gray-400 text-center">
                  Acesso exclusivo para administradores do Setor de Otimização de Serviços.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
