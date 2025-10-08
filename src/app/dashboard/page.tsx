"use client";
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setError('Configuração do Supabase necessária. Clique em "Configurar" no banner laranja acima para adicionar suas credenciais.');
      setLoading(false);
      return;
    }
    fetchLatestData();
  }, []);

  const fetchLatestData = async () => {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('tourism_data')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching data:', error);
        setError('Erro ao buscar dados: ' + error.message);
      } else if (data && data.length > 0) {
        setData(data[0]);
      } else {
        setError('Nenhum dado encontrado na base de dados.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Erro inesperado ao conectar com o banco de dados.');
    }
    setLoading(false);
  };

  // Mostrar estado de carregamento
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Carregando dados...</div>
        </div>
      </div>
    );
  }

  // Mostrar erro se houver problema de configuração ou dados
  if (error) {
    return (
      <div className="container mx-auto p-4">
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
              <p className="mt-2 text-sm text-yellow-600">
                Status: Supabase não configurado
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mostrar dados de exemplo se não houver dados reais
  if (!data) {
    const mockData = {
      trends: {
        "chile turismo": {
          interest_over_time: [75],
          regional_interest: [
            { region: "Santiago", value: 85 },
            { region: "Valparaíso", value: 70 },
            { region: "Atacama", value: 60 }
          ]
        },
        "patagonia chile": {
          interest_over_time: [65],
          regional_interest: []
        }
      },
      social: {
        instagram: { posts: 1250 },
        tiktok: { videos: 890 },
        facebook: { posts: 650 }
      },
      personas: [
        { name: "Aventureiro", interests: ["trekking", "montanhismo"] },
        { name: "Família", interests: ["praias", "cultura"] },
        { name: "Fotógrafo", interests: ["paisagens", "natureza"] }
      ],
      recommendations: {
        keywords: ["patagonia", "atacama", "valparaiso"],
        regions: ["Santiago", "Valparaíso", "Atacama"],
        times: ["09:00-11:00", "19:00-21:00"]
      }
    };
    setData(mockData);
  }

  const trendsData = data.trends;
  const socialData = data.social;

  // Prepare chart data
  const chartData = Object.keys(trendsData).map(keyword => ({
    keyword,
    interest: trendsData[keyword].interest_over_time.slice(-1)[0]
  }));

  const regionalData = trendsData[Object.keys(trendsData)[0]].regional_interest;

  const socialChartData = [
    { name: 'Instagram', value: socialData.instagram.posts },
    { name: 'TikTok', value: socialData.tiktok.videos },
    { name: 'Facebook', value: socialData.facebook.posts }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Chile Tourism Tracker Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Top Keywords Interest</h2>
          <BarChart width={300} height={200} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="keyword" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="interest" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Regional Interest</h2>
          <BarChart width={300} height={200} data={regionalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Social Media Activity</h2>
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

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Personas Identificadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.personas.map((persona, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold">{persona.name}</h3>
              <p>Interesses: {persona.interests.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recomendações para Campanhas</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <p><strong>Keywords quentes:</strong> {data.recommendations.keywords.join(', ')}</p>
          <p><strong>Regiões prioritárias:</strong> {data.recommendations.regions.join(', ')}</p>
          <p><strong>Melhores horários:</strong> {data.recommendations.times.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}