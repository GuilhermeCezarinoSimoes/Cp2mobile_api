import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import api from '../services/api';

/**
 * Exercício 4 — Tratamento de Erro
 * Faz requisição para uma rota inexistente para demonstrar o fluxo completo de erro:
 * - Exibe loading
 * - Captura o erro HTTP
 * - Mostra mensagem amigável
 * - Permite retry
 */

/** Estado possível da requisição de teste */
type RequestState = 'idle' | 'loading' | 'error' | 'empty';

interface ErrorDetails {
  status?: number;
  message: string;
  url: string;
}

/** URL obrigatória conforme enunciado */
const ERROR_URL = '/rota-inexistente';

export default function ErrorTestScreen() {
  const [state, setState] = useState<RequestState>('idle');
  const [errorDetails, setErrorDetails] = useState<ErrorDetails | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const testError = useCallback(async () => {
    setState('loading');
    setErrorDetails(null);
    setAttemptCount((prev) => prev + 1);

    try {
      // Requisição deliberadamente para rota inexistente
      await api.get(ERROR_URL);

      // Se por algum motivo retornar sucesso, exibe estado vazio
      setState('empty');
    } catch (err: unknown) {
      // Extrai detalhes do erro para exibição amigável
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: unknown }).response === 'object'
      ) {
        const axiosErr = err as {
          response?: { status?: number };
          message: string;
          config?: { url?: string };
        };
        setErrorDetails({
          status: axiosErr.response?.status,
          message: getFriendlyMessage(axiosErr.response?.status),
          url: `https://jsonplaceholder.typicode.com${ERROR_URL}`,
        });
      } else if (err instanceof Error) {
        setErrorDetails({
          message: 'Erro de rede. Verifique sua conexão.',
          url: `https://jsonplaceholder.typicode.com${ERROR_URL}`,
        });
      } else {
        setErrorDetails({
          message: 'Erro desconhecido.',
          url: `https://jsonplaceholder.typicode.com${ERROR_URL}`,
        });
      }
      setState('error');
    }
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>🧪 Teste de Erro HTTP</Text>
      <Text style={styles.subheading}>Exercício 4 — Tratamento de erro com Axios</Text>

      {/* URL que será requisitada */}
      <View style={styles.urlCard}>
        <Text style={styles.urlLabel}>URL da requisição:</Text>
        <Text style={styles.urlText}>
          {'https://jsonplaceholder.typicode.com'}
          {ERROR_URL}
        </Text>
      </View>

      {/* Loading state */}
      {state === 'loading' && (
        <View style={styles.loadingCard}>
          <ActivityIndicator color="#6366f1" size="small" />
          <Text style={styles.loadingText}>Fazendo requisição...</Text>
        </View>
      )}

      {/* Erro HTTP */}
      {state === 'error' && errorDetails && (
        <View style={styles.errorCard}>
          <Text style={styles.errorIcon}>🚫</Text>
          {errorDetails.status && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>HTTP {errorDetails.status}</Text>
            </View>
          )}
          <Text style={styles.errorTitle}>Requisição falhou</Text>
          <Text style={styles.errorMessage}>{errorDetails.message}</Text>
          <Text style={styles.errorUrl}>{errorDetails.url}</Text>
          <Text style={styles.attempts}>Tentativas: {attemptCount}</Text>
        </View>
      )}

      {/* Estado vazio (improvável nesse caso, mas tratado) */}
      {state === 'empty' && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>Resposta vazia.</Text>
        </View>
      )}

      {/* Botão de ação (Testar ou Retry) */}
      <TouchableOpacity
        style={[styles.button, state === 'loading' && styles.buttonDisabled]}
        onPress={testError}
        disabled={state === 'loading'}
      >
        <Text style={styles.buttonText}>
          {state === 'idle' ? '▶ Testar requisição' : '↻ Tentar novamente'}
        </Text>
      </TouchableOpacity>

      {/* Explicação didática */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>O que está acontecendo?</Text>
        <Text style={styles.infoText}>
          O Axios tenta fazer GET em uma rota inexistente da API.{'\n'}
          O servidor retorna HTTP 404 (Not Found).{'\n'}
          O interceptor de resposta captura o erro.{'\n'}
          O componente exibe uma mensagem amigável ao usuário.
        </Text>
      </View>
    </ScrollView>
  );
}

/** Retorna mensagem amigável baseada no status HTTP */
function getFriendlyMessage(status?: number): string {
  switch (status) {
    case 400: return 'A requisição foi mal formatada.';
    case 401: return 'Você não está autenticado.';
    case 403: return 'Acesso negado a este recurso.';
    case 404: return 'Este recurso não foi encontrado no servidor.';
    case 500: return 'Erro interno no servidor. Tente novamente mais tarde.';
    case 503: return 'Serviço indisponível. Tente novamente em breve.';
    default: return status ? `Erro inesperado (HTTP ${status}).` : 'Erro desconhecido.';
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 20, paddingBottom: 40 },
  heading: { color: '#f1f5f9', fontSize: 22, fontWeight: '800', marginBottom: 2 },
  subheading: { color: '#6366f1', fontSize: 12, fontWeight: '500', marginBottom: 20 },
  urlCard: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  urlLabel: { color: '#64748b', fontSize: 11, fontWeight: '700', marginBottom: 4 },
  urlText: { color: '#a5b4fc', fontSize: 12, fontFamily: 'monospace' },
  loadingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  loadingText: { color: '#94a3b8', fontSize: 13 },
  errorCard: {
    backgroundColor: '#1f0707',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dc2626',
    gap: 6,
    alignItems: 'flex-start',
  },
  errorIcon: { fontSize: 32, marginBottom: 4 },
  statusBadge: {
    backgroundColor: '#7f1d1d',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: { color: '#fca5a5', fontWeight: '700', fontSize: 12 },
  errorTitle: { color: '#f87171', fontSize: 16, fontWeight: '700' },
  errorMessage: { color: '#fca5a5', fontSize: 13, lineHeight: 20 },
  errorUrl: { color: '#475569', fontSize: 11, marginTop: 4 },
  attempts: { color: '#64748b', fontSize: 11, marginTop: 4 },
  emptyCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    gap: 8,
  },
  emptyIcon: { fontSize: 32 },
  emptyText: { color: '#64748b', fontSize: 13 },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#ffffff', fontWeight: '800', fontSize: 15 },
  infoCard: {
    backgroundColor: '#0c1a2e',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1e3a5f',
  },
  infoTitle: { color: '#60a5fa', fontWeight: '700', fontSize: 13, marginBottom: 8 },
  infoText: { color: '#475569', fontSize: 12, lineHeight: 20 },
});
