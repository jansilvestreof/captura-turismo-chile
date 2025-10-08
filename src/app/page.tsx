"use client";
import { useState } from 'react';
import { TrendingUp, Target, Calendar, FileText, BarChart3, RefreshCw, Download, Plus, Users, MapPin, Clock, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function DirectoDoChileManager() {
  const [activeTab, setActiveTab] = useState('tendencias');
  const [isUpdating, setIsUpdating] = useState(false);

  // Dados de exemplo para demonstração
  const trendData = [
    { month: 'Jan', chile: 65, patagonia: 45, atacama: 35, santiago: 75 },
    { month: 'Fev', chile: 72, patagonia: 52, atacama: 41, santiago: 82 },
    { month: 'Mar', chile: 68, patagonia: 48, atacama: 38, santiago: 78 },
    { month: 'Abr', chile: 85, patagonia: 65, atacama: 55, santiago: 95 },
    { month: 'Mai', chile: 91, patagonia: 71, atacama: 61, santiago: 101 }
  ];

  const regionData = [
    { estado: 'São Paulo', buscas: 2850, conversoes: 45 },
    { estado: 'Rio de Janeiro', buscas: 1920, conversoes: 32 },
    { estado: 'Minas Gerais', buscas: 1450, conversoes: 28 },
    { estado: 'Paraná', buscas: 980, conversoes: 18 },
    { estado: 'Santa Catarina', buscas: 750, conversoes: 15 }
  ];

  const campaignData = [
    { plataforma: 'Google Ads', custo: 1250, cliques: 890, conversoes: 23, roi: 2.8 },
    { plataforma: 'Facebook/Instagram', custo: 980, cliques: 1240, conversoes: 31, roi: 3.2 },
    { plataforma: 'TikTok Ads', custo: 650, cliques: 2100, conversoes: 18, roi: 2.1 }
  ];

  const ageData = [
    { faixa: '18-24', value: 15 },
    { faixa: '25-34', value: 35 },
    { faixa: '35-44', value: 28 },
    { faixa: '45-54', value: 15 },
    { faixa: '55+', value: 7 }
  ];

  const COLORS = ['#0A2540', '#E50914', '#FF6B6B', '#4ECDC4', '#45B7D1'];

  const handleUpdateData = async () => {
    setIsUpdating(true);
    // Simular atualização de dados
    setTimeout(() => {
      setIsUpdating(false);
    }, 2000);
  };

  const renderTendenciasTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0A2540]">Painel de Tendências</h2>
        <button 
          onClick={handleUpdateData}
          disabled={isUpdating}
          className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-lg hover:bg-[#B8070F] transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
          {isUpdating ? 'Atualizando...' : 'Atualizar Dados'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-[#E50914]" />
            <h3 className="font-semibold text-[#0A2540]">Buscas Totais</h3>
          </div>
          <p className="text-3xl font-bold text-[#0A2540]">12.4K</p>
          <p className="text-sm text-green-600">+15% vs mês anterior</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-8 h-8 text-[#E50914]" />
            <h3 className="font-semibold text-[#0A2540]">Top Estado</h3>
          </div>
          <p className="text-2xl font-bold text-[#0A2540]">São Paulo</p>
          <p className="text-sm text-gray-600">2.850 buscas</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-[#E50914]" />
            <h3 className="font-semibold text-[#0A2540]">Faixa Etária</h3>
          </div>
          <p className="text-2xl font-bold text-[#0A2540]">25-34</p>
          <p className="text-sm text-gray-600">35% do público</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-[#E50914]" />
            <h3 className="font-semibold text-[#0A2540]">Melhor Horário</h3>
          </div>
          <p className="text-2xl font-bold text-[#0A2540]">19h-21h</p>
          <p className="text-sm text-gray-600">Pico de engajamento</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Tendências de Busca</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="chile" stroke="#0A2540" strokeWidth={2} />
              <Line type="monotone" dataKey="patagonia" stroke="#E50914" strokeWidth={2} />
              <Line type="monotone" dataKey="atacama" stroke="#FF6B6B" strokeWidth={2} />
              <Line type="monotone" dataKey="santiago" stroke="#4ECDC4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Distribuição por Faixa Etária</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ faixa, percent }) => `${faixa}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Volume de Buscas por Estado</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="estado" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="buscas" fill="#0A2540" />
            <Bar dataKey="conversoes" fill="#E50914" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Palavras-chave em Alta</h3>
          <div className="space-y-3">
            {['patagonia chile', 'torres del paine', 'atacama desert', 'santiago turismo', 'valparaiso'].map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-[#0A2540]">{keyword}</span>
                <span className="text-[#E50914] font-semibold">+{Math.floor(Math.random() * 50 + 10)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Recomendações</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800">Oportunidade Detectada</h4>
              <p className="text-sm text-green-700 mt-1">Aumento de 25% nas buscas por "patagonia" em SP</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800">Melhor Horário</h4>
              <p className="text-sm text-blue-700 mt-1">Publique entre 19h-21h para máximo engajamento</p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800">Público-alvo</h4>
              <p className="text-sm text-yellow-700 mt-1">Foque em adultos de 25-34 anos em SP e RJ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCampanhasTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0A2540]">Gestão de Campanhas</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[#0A2540] text-white px-4 py-2 rounded-lg hover:bg-[#0A2540]/90 transition-colors">
            <Plus className="w-4 h-4" />
            Nova Campanha
          </button>
          <button className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-lg hover:bg-[#B8070F] transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-green-600" />
            <h3 className="font-semibold text-[#0A2540]">Investimento Total</h3>
          </div>
          <p className="text-3xl font-bold text-[#0A2540]">R$ 2.880</p>
          <p className="text-sm text-gray-600">Últimos 30 dias</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-[#0A2540]">Conversões</h3>
          </div>
          <p className="text-3xl font-bold text-[#0A2540]">72</p>
          <p className="text-sm text-green-600">+18% vs mês anterior</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            <h3 className="font-semibold text-[#0A2540]">ROI Médio</h3>
          </div>
          <p className="text-3xl font-bold text-[#0A2540]">2.7x</p>
          <p className="text-sm text-gray-600">Retorno sobre investimento</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Performance por Plataforma</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Plataforma</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Custo</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Cliques</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Conversões</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">ROI</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((campaign, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-[#0A2540]">{campaign.plataforma}</td>
                  <td className="py-3 px-4">R$ {campaign.custo.toLocaleString()}</td>
                  <td className="py-3 px-4">{campaign.cliques.toLocaleString()}</td>
                  <td className="py-3 px-4">{campaign.conversoes}</td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${campaign.roi >= 2.5 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {campaign.roi}x
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Ativa
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Performance ao Longo do Tempo</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="chile" stroke="#0A2540" strokeWidth={2} name="Conversões" />
            <Line type="monotone" dataKey="patagonia" stroke="#E50914" strokeWidth={2} name="Cliques" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderConteudoTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0A2540]">Planejamento de Conteúdo</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[#0A2540] text-white px-4 py-2 rounded-lg hover:bg-[#0A2540]/90 transition-colors">
            <Plus className="w-4 h-4" />
            Nova Postagem
          </button>
          <button className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-lg hover:bg-[#B8070F] transition-colors">
            <Download className="w-4 h-4" />
            Exportar Calendário
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Calendário de Postagens</h3>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="text-center font-semibold text-[#0A2540] py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="aspect-square border border-gray-200 rounded-lg p-2 hover:bg-gray-50 cursor-pointer">
                <div className="text-sm text-gray-600">{((i % 31) + 1)}</div>
                {i % 7 === 1 && (
                  <div className="mt-1">
                    <div className="w-2 h-2 bg-[#E50914] rounded-full mb-1"></div>
                    <div className="text-xs text-[#0A2540] truncate">Post Patagonia</div>
                  </div>
                )}
                {i % 7 === 3 && (
                  <div className="mt-1">
                    <div className="w-2 h-2 bg-[#0A2540] rounded-full mb-1"></div>
                    <div className="text-xs text-[#0A2540] truncate">Story Atacama</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-[#0A2540] mb-4">Ideias de Conteúdo</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800">Torres del Paine</h4>
                <p className="text-sm text-blue-600 mt-1">Trending: +45% buscas</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800">Atacama Sunset</h4>
                <p className="text-sm text-green-600 mt-1">Alto engajamento</p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800">Santiago Food</h4>
                <p className="text-sm text-purple-600 mt-1">Público jovem</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-[#0A2540] mb-4">Hashtags Sugeridas</h3>
            <div className="flex flex-wrap gap-2">
              {['#Chile', '#Patagonia', '#Atacama', '#Santiago', '#TorresDelPaine', '#Valparaiso'].map(tag => (
                <span key={tag} className="bg-[#0A2540] text-white px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Postagens Agendadas</h3>
        <div className="space-y-4">
          {[
            { titulo: 'Patagonia: O Paraíso dos Aventureiros', data: '15/01/2024', hora: '19:00', tipo: 'Post', status: 'Agendado' },
            { titulo: 'Atacama: Deserto Mais Árido do Mundo', data: '16/01/2024', hora: '20:30', tipo: 'Story', status: 'Agendado' },
            { titulo: 'Santiago: Modernidade e Tradição', data: '17/01/2024', hora: '18:00', tipo: 'Reel', status: 'Rascunho' }
          ].map((post, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div>
                <h4 className="font-medium text-[#0A2540]">{post.titulo}</h4>
                <p className="text-sm text-gray-600">{post.data} às {post.hora} • {post.tipo}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                post.status === 'Agendado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {post.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVouchersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0A2540]">Criação de Vouchers</h2>
        <button className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-lg hover:bg-[#B8070F] transition-colors">
          <Plus className="w-4 h-4" />
          Adicionar Passeio
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Novo Voucher</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0A2540] mb-1">Nome do Cliente</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E50914] focus:border-transparent"
                placeholder="Digite o nome completo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#0A2540] mb-1">Data do Passeio</label>
              <input 
                type="date" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E50914] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#0A2540] mb-1">Passeio</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E50914] focus:border-transparent">
                <option>Selecione o passeio</option>
                <option>Torres del Paine - 3 dias</option>
                <option>Atacama Desert - 4 dias</option>
                <option>Santiago City Tour - 1 dia</option>
                <option>Valparaíso e Viña del Mar - 2 dias</option>
                <option>Patagonia Completa - 7 dias</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0A2540] mb-1">Quantidade de Pessoas</label>
                <input 
                  type="number" 
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E50914] focus:border-transparent"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A2540] mb-1">Valor Total</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E50914] focus:border-transparent"
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0A2540] mb-1">Valor com Desconto</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E50914] focus:border-transparent"
                  placeholder="R$ 0,00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A2540] mb-1">Valor para Operadora</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E50914] focus:border-transparent"
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-green-800">Lucro Calculado:</span>
                <span className="text-2xl font-bold text-green-800">R$ 450,00</span>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-[#E50914] text-white py-3 rounded-lg hover:bg-[#B8070F] transition-colors font-medium"
            >
              Gerar Voucher em PDF
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Preview do Voucher</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="bg-[#0A2540] text-white p-4 rounded-lg mb-4">
              <h2 className="text-2xl font-bold">DIRETO DO CHILE</h2>
              <p className="text-sm opacity-90">Sua aventura começa aqui</p>
            </div>
            
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="font-medium">Cliente:</span>
                <span>João Silva</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Passeio:</span>
                <span>Torres del Paine - 3 dias</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Data:</span>
                <span>15/02/2024</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Pessoas:</span>
                <span>2</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold">Valor Pago:</span>
                <span className="font-bold text-[#E50914]">R$ 2.800,00</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">WhatsApp: (11) 99999-9999</p>
              <p className="text-sm text-gray-600">www.diretodochile.com.br</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Vouchers Recentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Cliente</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Passeio</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Data</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Valor Pago</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Lucro</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cliente: 'Maria Santos', passeio: 'Atacama Desert - 4 dias', data: '20/01/2024', valor: 'R$ 3.200,00', lucro: 'R$ 580,00' },
                { cliente: 'Carlos Lima', passeio: 'Santiago City Tour', data: '18/01/2024', valor: 'R$ 450,00', lucro: 'R$ 120,00' },
                { cliente: 'Ana Costa', passeio: 'Patagonia Completa - 7 dias', data: '15/01/2024', valor: 'R$ 5.800,00', lucro: 'R$ 1.200,00' }
              ].map((voucher, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-[#0A2540]">{voucher.cliente}</td>
                  <td className="py-3 px-4">{voucher.passeio}</td>
                  <td className="py-3 px-4">{voucher.data}</td>
                  <td className="py-3 px-4 font-semibold">{voucher.valor}</td>
                  <td className="py-3 px-4 font-semibold text-green-600">{voucher.lucro}</td>
                  <td className="py-3 px-4">
                    <button className="text-[#E50914] hover:text-[#B8070F] font-medium">
                      Baixar PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRelatoriosTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0A2540]">Relatórios e Exportações</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[#0A2540] text-white px-4 py-2 rounded-lg hover:bg-[#0A2540]/90 transition-colors">
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
          <button className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-lg hover:bg-[#B8070F] transition-colors">
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-blue-600" />
            <h3 className="font-semibold text-[#0A2540]">Total de Leads</h3>
          </div>
          <p className="text-3xl font-bold text-[#0A2540]">1.247</p>
          <p className="text-sm text-green-600">+22% vs mês anterior</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-green-600" />
            <h3 className="font-semibold text-[#0A2540]">Vendas</h3>
          </div>
          <p className="text-3xl font-bold text-[#0A2540]">89</p>
          <p className="text-sm text-green-600">+15% vs mês anterior</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-purple-600" />
            <h3 className="font-semibold text-[#0A2540]">Receita</h3>
          </div>
          <p className="text-3xl font-bold text-[#0A2540]">R$ 245K</p>
          <p className="text-sm text-green-600">+28% vs mês anterior</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-orange-600" />
            <h3 className="font-semibold text-[#0A2540]">Lucro Total</h3>
          </div>
          <p className="text-3xl font-bold text-[#0A2540]">R$ 58K</p>
          <p className="text-sm text-green-600">+31% vs mês anterior</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Performance por Canal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plataforma" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="conversoes" fill="#0A2540" name="Conversões" />
              <Bar dataKey="roi" fill="#E50914" name="ROI" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Evolução de Vendas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="chile" stroke="#0A2540" strokeWidth={3} name="Vendas" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Relatório Detalhado por Período</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-[#0A2540] mb-1">Data Inicial</label>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E50914] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0A2540] mb-1">Data Final</label>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E50914] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0A2540] mb-1">Canal</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E50914] focus:border-transparent">
              <option>Todos os canais</option>
              <option>Google Ads</option>
              <option>Facebook/Instagram</option>
              <option>TikTok Ads</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Data</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Canal</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Leads</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Vendas</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Receita</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">Lucro</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0A2540]">ROI</th>
              </tr>
            </thead>
            <tbody>
              {[
                { data: '15/01/2024', canal: 'Google Ads', leads: 45, vendas: 8, receita: 'R$ 18.400', lucro: 'R$ 4.200', roi: '2.8x' },
                { data: '14/01/2024', canal: 'Facebook/Instagram', leads: 62, vendas: 12, receita: 'R$ 28.800', lucro: 'R$ 7.200', roi: '3.2x' },
                { data: '13/01/2024', canal: 'TikTok Ads', leads: 38, vendas: 5, receita: 'R$ 12.500', lucro: 'R$ 2.800', roi: '2.1x' }
              ].map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{item.data}</td>
                  <td className="py-3 px-4 font-medium">{item.canal}</td>
                  <td className="py-3 px-4">{item.leads}</td>
                  <td className="py-3 px-4">{item.vendas}</td>
                  <td className="py-3 px-4 font-semibold">{item.receita}</td>
                  <td className="py-3 px-4 font-semibold text-green-600">{item.lucro}</td>
                  <td className="py-3 px-4 font-semibold text-blue-600">{item.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-[#0A2540] mb-4">Configurações de Relatório Automático</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-[#0A2540] mb-3">Frequência de Envio</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="frequency" className="mr-2" />
                <span>Diário</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="frequency" className="mr-2" defaultChecked />
                <span>Semanal</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="frequency" className="mr-2" />
                <span>Mensal</span>
              </label>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-[#0A2540] mb-3">E-mail para Envio</h4>
            <input 
              type="email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E50914] focus:border-transparent"
              placeholder="seu@email.com"
            />
            <button className="mt-3 bg-[#E50914] text-white px-4 py-2 rounded-lg hover:bg-[#B8070F] transition-colors">
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'tendencias', label: 'Painel de Tendências', icon: TrendingUp },
    { id: 'campanhas', label: 'Gestão de Campanhas', icon: Target },
    { id: 'conteudo', label: 'Planejamento de Conteúdo', icon: Calendar },
    { id: 'vouchers', label: 'Criação de Vouchers', icon: FileText },
    { id: 'relatorios', label: 'Relatórios e Exportações', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0A2540] text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Direto do Chile Manager</h1>
          <p className="text-blue-200 mt-1">Central de controle para captação e gestão de clientes</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#E50914] border-b-2 border-[#E50914] bg-red-50'
                      : 'text-gray-600 hover:text-[#0A2540] hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {activeTab === 'tendencias' && renderTendenciasTab()}
        {activeTab === 'campanhas' && renderCampanhasTab()}
        {activeTab === 'conteudo' && renderConteudoTab()}
        {activeTab === 'vouchers' && renderVouchersTab()}
        {activeTab === 'relatorios' && renderRelatoriosTab()}
      </main>
    </div>
  );
}