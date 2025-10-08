import { createClient } from '@supabase/supabase-js';

// Função para validar se uma URL é válida
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Configuração segura do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Verificar se as variáveis são válidas
const hasValidConfig = supabaseUrl && 
                      supabaseKey && 
                      isValidUrl(supabaseUrl) && 
                      !supabaseUrl.includes('your_supabase_url_here') &&
                      !supabaseKey.includes('your_supabase_anon_key_here');

// Criar cliente apenas se a configuração for válida
export const supabase = hasValidConfig 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Função para verificar se o Supabase está configurado
export const isSupabaseConfigured = () => hasValidConfig;

// Função para obter mensagem de erro de configuração
export const getConfigurationMessage = () => {
  if (!supabaseUrl || supabaseUrl.includes('your_supabase_url_here')) {
    return 'URL do Supabase não configurada';
  }
  if (!supabaseKey || supabaseKey.includes('your_supabase_anon_key_here')) {
    return 'Chave do Supabase não configurada';
  }
  if (!isValidUrl(supabaseUrl)) {
    return 'URL do Supabase inválida';
  }
  return 'Configuração do Supabase válida';
};