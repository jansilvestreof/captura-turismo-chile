const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Keywords to monitor
const keywords = [
  "passeios no Chile",
  "roteiro Santiago",
  "Valle Nevado",
  "Farellones",
  "Embalse El Yeso",
  "Termas de Colina",
  "Vinícolas no Chile",
  "Viña del Mar e Valparaíso",
  "o que fazer no Chile",
  "melhores passeios em Santiago",
  "quanto custa viajar para o Chile",
  "agência de turismo no Chile"
];

// Mock data generator for Google Trends (since real API requires authentication)
function generateMockTrendsData() {
  const regions = ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Recife', 'Fortaleza', 'Brasília', 'Salvador', 'Natal'];
  const data = {};

  keywords.forEach(keyword => {
    data[keyword] = {
      interest_over_time: Array.from({length: 30}, () => Math.floor(Math.random() * 100)),
      regional_interest: regions.map(region => ({
        region,
        value: Math.floor(Math.random() * 100)
      })),
      related_queries: [
        {query: keyword + ' dicas', value: Math.floor(Math.random() * 100)},
        {query: keyword + ' preço', value: Math.floor(Math.random() * 100)}
      ]
    };
  });

  return data;
}

// Mock social media data
function generateMockSocialData() {
  return {
    instagram: {
      posts: Math.floor(Math.random() * 1000),
      engagement: Math.floor(Math.random() * 500)
    },
    tiktok: {
      videos: Math.floor(Math.random() * 500),
      views: Math.floor(Math.random() * 10000)
    },
    facebook: {
      posts: Math.floor(Math.random() * 200),
      likes: Math.floor(Math.random() * 1000)
    }
  };
}

// Check for spikes and send alerts
async function checkForSpikes(currentData, previousData) {
  if (!previousData) return;

  const spikeThreshold = 50; // 50% increase

  for (const keyword of keywords) {
    const currentInterest = currentData[keyword].interest_over_time.slice(-1)[0];
    const previousInterest = previousData.trends[keyword].interest_over_time.slice(-1)[0];

    if (currentInterest > previousInterest * (1 + spikeThreshold / 100)) {
      await sendAlert(`Pico de interesse detectado para "${keyword}": ${currentInterest} (anterior: ${previousInterest})`);
    }
  }
}

// Send alert via API
async function sendAlert(message) {
  try {
    await axios.post('http://localhost:3000/api/alerts', {
      message,
      type: 'Spike'
    });
  } catch (error) {
    console.error('Error sending alert:', error);
  }
}

// Collect and store data
async function collectData() {
  try {
    const trendsData = generateMockTrendsData();
    const socialData = generateMockSocialData();

    // Get previous data for spike detection
    const { data: previousData } = await supabase
      .from('tourism_data')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1);

    await checkForSpikes({ ...trendsData }, previousData[0]);

    const dataToInsert = {
      timestamp: new Date().toISOString(),
      trends: trendsData,
      social: socialData,
      personas: [
        {name: 'Casal classe média alta', interests: ['viagem romântica', 'vinho', 'fotografia']},
        {name: 'Família com crianças', interests: ['atividades no Chile', 'turismo familiar']},
        {name: 'Influenciadores', interests: ['conteúdo', 'paisagens', 'experiência cinematográfica']}
      ],
      recommendations: {
        keywords: keywords.slice(0, 5),
        regions: ['São Paulo', 'Rio de Janeiro'],
        times: ['Sábados e domingos, 10h-14h']
      }
    };

    const { data, error } = await supabase
      .from('tourism_data')
      .insert([dataToInsert]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data collected and stored successfully');
    }
  } catch (error) {
    console.error('Error collecting data:', error);
  }
}

collectData();