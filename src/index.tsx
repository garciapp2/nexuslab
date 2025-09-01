import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
    },
  },
});

// Tratamento de erro global
window.addEventListener('error', (event) => {
  console.error('Erro na aplicação:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise rejeitada:', event.reason);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Elemento root não encontrado!');
} else {
  const root = ReactDOM.createRoot(rootElement);

  try {
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>
    );
    console.log('✅ NexusLab carregado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao renderizar aplicação:', error);
    
    // Fallback em caso de erro
    rootElement.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; background: linear-gradient(135deg, #0a1428 0%, #1e2328 100%); color: #f0e6d2; font-family: Arial, sans-serif;">
        <div style="font-size: 2rem; margin-bottom: 1rem; color: #dc143c;">❌ Erro</div>
        <div>Falha ao carregar NexusLab</div>
        <div style="margin-top: 1rem; font-size: 0.8rem; opacity: 0.7;">Verifique o console para mais detalhes</div>
      </div>
    `;
  }
}
