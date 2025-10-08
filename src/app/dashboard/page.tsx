"use client";
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Plus, Download, FileText, TrendingUp, Target, Instagram, DollarSign, Users, MapPin } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('tendencias');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Estados para funcionalidades
  const [passeios, setPasseios] = useState([
    'City Tour Santiago',
    'Vinícolas Casablanca',
    'Valparaíso e Viña del Mar',
    'Cajón del Maipo',
    'Atacama Desert 3 dias',
    'Torres del Paine 4 dias',
    'Ilha de Páscoa 5 dias'
  ]);
  const [novoPasseio, setNovoPasseio] = useState('');
  
  // Estados para voucher
  const [voucherData, setVoucherData] = useState({
    nomeCliente: '',
    dataPasseio: '',
    passeio: '',
    quantidadePessoas: 1,
    valorTotal: 0,
    valorComDesconto: 0,
    valorParaOperadora: 0
  });

  // Estados para campanhas
  const [campanhas, setCampanhas] = useState([
    { id: 1, plataforma: 'Google Ads', nome: 'Chile Turismo - Verão', custo: 450, cliques: 1250, conversoes: 23, roi: 2.8 },
    { id: 2, plataforma: 'Facebook Ads', nome: 'Patagônia Adventure', custo: 320, cliques: 890, conversoes: 18, roi: 3.2 },
    { id: 3, plataforma: 'Instagram Ads', nome: 'Atacama Stories', custo: 280, cliques: 650, conversoes: 15, roi: 2.5 }
  ]);

  // Estados para conteúdo
  const [postagens, setPostagens] = useState([
    { id: 1, titulo: 'Pôr do sol no Atacama', data: '2024-01-15', tipo: 'Foto', status: 'Agendado' },
    { id: 2, titulo: 'Vinícolas imperdíveis', data: '2024-01-16', tipo: 'Carrossel', status: 'Rascunho' },
    { id: 3, titulo: 'Torres del Paine', data: '2024-01-17', tipo: 'Vídeo', status: 'Publicado' }
  ]);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setError('Configuração do Supabase necessária. Clique em "Configurar" no banner laranja acima para adicionar suas credenciais.');
      setLoading(false);
      return;
    }
    fetchLatestData();
  }, []);

  const getMockData = () => ({
    trends: {
      "chile turismo": {
        interest_over_time: [75, 82, 68, 91, 77],
        regional_interest: [
          { region: "São Paulo", value: 85 },
          { region: "Rio de Janeiro", value: 70 },
          { region: "Minas Gerais", value: 60 },
          { region: "Paraná", value: 55 }
        ]
      },
      "patagonia chile": {
        interest_over_time: [65, 71, 58, 79, 83],
        regional_interest: [
          { region: "Rio Grande do Sul", value: 95 },
          { region: "Santa Catarina", value: 88 },
          { region: "Paraná", value: 45 }
        ]
      },
      "atacama desert": {
        interest_over_time: [45, 52, 48, 67, 71],
        regional_interest: [
          { region: "São Paulo", value: 92 },
          { region: "Rio de Janeiro", value: 78 },
          { region: "Brasília", value: 35 }
        ]
      }
    },
    social: {
      instagram: { posts: 1250, engagement: 4.2 },
      tiktok: { videos: 890, views: 125000 },
      facebook: { posts: 650, shares: 320 }
    },
    personas: [
      { name: "Aventureiro", interests: ["trekking", "montanhismo", "patagonia"] },
      { name: "Família", interests: ["praias", "cultura", "gastronomia"] },
      { name: "Fotógrafo", interests: ["paisagens", "natureza", "aurora austral"] },
      { name: "Mochileiro", interests: ["hostels", "transporte público", "trilhas"] }
    ],
    recommendations: {
      keywords: ["patagonia", "atacama", "valparaiso", "santiago", "torres del paine"],
      regions: ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Paraná"],
      times: ["09:00-11:00", "19:00-21:00", "14:00-16:00"],
      best_months: ["dezembro", "janeiro", "fevereiro", "março"]
    }
  });

  const fetchLatestData = async () => {
    if (!supabase) {
      setData(getMockData());
      setUsingMockData(true);
      setLoading(false);
      return;
    }

    try {
      const { data: fetchedData, error } = await supabase
        .from('tourism_data')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching data:', error);
        
        if (error.code === 'PGRST205' || error.message.includes('table') || error.message.includes('schema cache')) {
          console.log('Tabela não encontrada, usando dados de demonstração');
          setData(getMockData());
          setUsingMockData(true);
          setError(null);
        } else {
          setError('Erro ao buscar dados: ' + error.message);
        }
      } else if (fetchedData && fetchedData.length > 0) {
        setData(fetchedData[0]);
        setUsingMockData(false);
        setError(null);
      } else {
        console.log('Nenhum dado encontrado, usando dados de demonstração');
        setData(getMockData());
        setUsingMockData(true);
        setError(null);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setData(getMockData());
      setUsingMockData(true);
      setError(null);
    }
    setLoading(false);
  };

  // Função para adicionar passeio
  const adicionarPasseio = () => {
    if (novoPasseio.trim()) {
      setPasseios([...passeios, novoPasseio.trim()]);
      setNovoPasseio('');
      alert('Passeio adicionado com sucesso!');
    }
  };

  // Função para calcular lucro
  const calcularLucro = () => {
    return voucherData.valorComDesconto - voucherData.valorParaOperadora;
  };

  // Função para gerar voucher PDF
  const gerarVoucherPDF = () => {
    if (!voucherData.nomeCliente || !voucherData.passeio || !voucherData.dataPasseio) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const voucherContent = `
DIRETO DO CHILE
Você vive o Chile. Dos seus passeios a gente cuida.

VOUCHER DE VIAGEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cliente: ${voucherData.nomeCliente}
Passeio: ${voucherData.passeio}
Data da Viagem: ${new Date(voucherData.dataPasseio).toLocaleDateString('pt-BR')}
Quantidade de Pessoas: ${voucherData.quantidadePessoas}
Valor Pago: R$ ${voucherData.valorComDesconto.toFixed(2)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTATOS:
WhatsApp: (85) 98208-6946
Site: www.diretodochile.com

Este voucher é válido para a data especificada.
Apresente este documento no local do passeio.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Direto do Chile - Sua aventura começa aqui!
    `;

    // Criar e baixar o arquivo
    const blob = new Blob([voucherContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `voucher-${voucherData.nomeCliente.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    alert('Voucher gerado e baixado com sucesso!');
  };

  // Função para exportar relatórios
  const exportarRelatorio = (tipo) => {
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    let conteudo = '';

    if (tipo === 'campanhas') {
      conteudo = `RELATÓRIO DE CAMPANHAS - ${dataAtual}\n\n`;
      campanhas.forEach(campanha => {
        conteudo += `Plataforma: ${campanha.plataforma}\n`;
        conteudo += `Nome: ${campanha.nome}\n`;
        conteudo += `Custo: R$ ${campanha.custo}\n`;
        conteudo += `Cliques: ${campanha.cliques}\n`;
        conteudo += `Conversões: ${campanha.conversoes}\n`;
        conteudo += `ROI: ${campanha.roi}x\n\n`;
      });
    } else if (tipo === 'vouchers') {
      conteudo = `RELATÓRIO DE VOUCHERS - ${dataAtual}\n\n`;
      conteudo += `Total de vouchers gerados: 1\n`;
      conteudo += `Receita total: R$ ${voucherData.valorComDesconto}\n`;
      conteudo += `Lucro total: R$ ${calcularLucro()}\n`;
    }

    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-${tipo}-${dataAtual.replace(/\//g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    alert('Relatório exportado com sucesso!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-[#0A2540]">Carregando Direto do Chile Manager...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Erro de Configuração</h2>
            <p className="text-red-700">{error}</p>
            {!isSupabaseConfigured() && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-yellow-800">
                  <strong>Como resolver:</strong>
                </p>
                <ol className="list-decimal list-inside mt-2 text-yellow-700">
                  <li>Vá em Configurações do Projeto → Integrações</li>
                  <li>Conecte sua conta Supabase</li>
                  <li>Ou clique em "Configurar" no banner laranja se aparecer</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p>Nenhum dado disponível</p>
        </div>
      </div>
    );
  }

  const trendsData = data.trends;
  const socialData = data.social;

  const chartData = Object.keys(trendsData).map(keyword => ({
    keyword: keyword.replace(' ', '\n'),
    interest: trendsData[keyword].interest_over_time.slice(-1)[0]
  }));

  const regionalData = trendsData[Object.keys(trendsData)[0]].regional_interest;

  const socialChartData = [
    { name: 'Instagram', value: socialData.instagram.posts },
    { name: 'TikTok', value: socialData.tiktok.videos },
    { name: 'Facebook', value: socialData.facebook.posts }
  ];

  const COLORS = ['#E50914', '#0A2540', '#FFFFFF'];

  const tabs = [
    { id: 'tendencias', name: 'Painel de Tendências', icon: TrendingUp },
    { id: 'campanhas', name: 'Gestão de Campanhas', icon: Target },
    { id: 'conteudo', name: 'Planejamento de Conteúdo', icon: Instagram },
    { id: 'vouchers', name: 'Criação de Vouchers', icon: FileText },
    { id: 'relatorios', name: 'Relatórios e Exportações', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0A2540] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Direto do Chile Manager</h1>
          <p className="text-gray-300 mt-2">Você vive o Chile. Dos seus passeios a gente cuida.</p>
          {usingMockData && (
            <div className="mt-4 bg-yellow-600 text-yellow-100 px-4 py-2 rounded inline-block">
              📊 Dados de demonstração
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#E50914] text-[#E50914]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'tendencias' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-[#0A2540]">Interesse por Palavras-chave</h2>
                <BarChart width={300} height={200} data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="keyword" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="interest" fill="#E50914" />
                </BarChart>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-[#0A2540]">Interesse Regional (Brasil)</h2>
                <BarChart width={300} height={200} data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0A2540" />
                </BarChart>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-[#0A2540]">Atividade nas Redes Sociais</h2>
                <PieChart width={300} height={200}>
                  <Pie
                    data={socialChartData}
                    cx={150}
                    cy={100}
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {socialChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-[#0A2540]">Personas Identificadas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.personas.map((persona, index) => (
                    <div key={index} className="border border-gray-200 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2 text-[#E50914]">{persona.name}</h3>
                      <p className="text-sm text-gray-600">
                        <strong>Interesses:</strong> {persona.interests.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-[#0A2540]">Recomendações para Campanhas</h2>
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong className="text-[#E50914]">Keywords quentes:</strong> {data.recommendations.keywords.join(', ')}
                  </p>
                  <p className="text-sm">
                    <strong className="text-[#E50914]">Regiões prioritárias:</strong> {data.recommendations.regions.join(', ')}
                  </p>
                  <p className="text-sm">
                    <strong className="text-[#E50914]">Melhores horários:</strong> {data.recommendations.times.join(', ')}
                  </p>
                  <p className="text-sm">
                    <strong className="text-[#E50914]">Melhores meses:</strong> {data.recommendations.best_months.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campanhas' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-[#0A2540]">Campanhas Ativas</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plataforma</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliques</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversões</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {campanhas.map((campanha) => (
                      <tr key={campanha.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campanha.plataforma}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campanha.nome}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {campanha.custo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campanha.cliques}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campanha.conversoes}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campanha.roi}x</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'conteudo' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-[#0A2540]">Calendário de Postagens</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {postagens.map((post) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.titulo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(post.data).toLocaleDateString('pt-BR')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.tipo}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            post.status === 'Publicado' ? 'bg-green-100 text-green-800' :
                            post.status === 'Agendado' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vouchers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-[#0A2540]">Criar Voucher</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Cliente</label>
                    <input
                      type="text"
                      value={voucherData.nomeCliente}
                      onChange={(e) => setVoucherData({...voucherData, nomeCliente: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                      placeholder="Digite o nome do cliente"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data do Passeio</label>
                    <input
                      type="date"
                      value={voucherData.dataPasseio}
                      onChange={(e) => setVoucherData({...voucherData, dataPasseio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passeio</label>
                    <select
                      value={voucherData.passeio}
                      onChange={(e) => setVoucherData({...voucherData, passeio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                    >
                      <option value="">Selecione um passeio</option>
                      {passeios.map((passeio, index) => (
                        <option key={index} value={passeio}>{passeio}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade de Pessoas</label>
                    <input
                      type="number"
                      min="1"
                      value={voucherData.quantidadePessoas}
                      onChange={(e) => setVoucherData({...voucherData, quantidadePessoas: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor Total</label>
                    <input
                      type="number"
                      step="0.01"
                      value={voucherData.valorTotal}
                      onChange={(e) => setVoucherData({...voucherData, valorTotal: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor com Desconto</label>
                    <input
                      type="number"
                      step="0.01"
                      value={voucherData.valorComDesconto}
                      onChange={(e) => setVoucherData({...voucherData, valorComDesconto: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor para Operadora</label>
                    <input
                      type="number"
                      step="0.01"
                      value={voucherData.valorParaOperadora}
                      onChange={(e) => setVoucherData({...voucherData, valorParaOperadora: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-700">
                      Lucro: <span className="text-[#E50914] font-bold">R$ {calcularLucro().toFixed(2)}</span>
                    </p>
                  </div>
                  
                  <button
                    onClick={gerarVoucherPDF}
                    className="w-full bg-[#E50914] text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Gerar Voucher PDF</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-[#0A2540]">Gerenciar Passeios</h2>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={novoPasseio}
                      onChange={(e) => setNovoPasseio(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                      placeholder="Nome do novo passeio"
                    />
                    <button
                      onClick={adicionarPasseio}
                      className="bg-[#0A2540] text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Passeios Disponíveis:</h3>
                    <div className="max-h-60 overflow-y-auto">
                      {passeios.map((passeio, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{passeio}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-2">Preview do Voucher</h3>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p><strong>DIRETO DO CHILE</strong></p>
                    <p><em>Você vive o Chile. Dos seus passeios a gente cuida.</em></p>
                    <p>Cliente: {voucherData.nomeCliente || '[Nome do Cliente]'}</p>
                    <p>Passeio: {voucherData.passeio || '[Passeio]'}</p>
                    <p>Data: {voucherData.dataPasseio ? new Date(voucherData.dataPasseio).toLocaleDateString('pt-BR') : '[Data]'}</p>
                    <p>Pessoas: {voucherData.quantidadePessoas}</p>
                    <p>Valor: R$ {voucherData.valorComDesconto.toFixed(2)}</p>
                    <p className="mt-2"><strong>WhatsApp: (85) 98208-6946</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'relatorios' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-[#0A2540]">Relatórios de Campanhas</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Investido</p>
                      <p className="text-2xl font-bold text-[#E50914]">R$ {campanhas.reduce((acc, c) => acc + c.custo, 0)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Cliques</p>
                      <p className="text-2xl font-bold text-[#0A2540]">{campanhas.reduce((acc, c) => acc + c.cliques, 0)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => exportarRelatorio('campanhas')}
                    className="w-full bg-[#0A2540] text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Exportar Relatório de Campanhas</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-[#0A2540]">Relatórios de Vouchers</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Receita Total</p>
                      <p className="text-2xl font-bold text-[#E50914]">R$ {voucherData.valorComDesconto.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Lucro Total</p>
                      <p className="text-2xl font-bold text-green-600">R$ {calcularLucro().toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => exportarRelatorio('vouchers')}
                    className="w-full bg-[#E50914] text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Exportar Relatório de Vouchers</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}