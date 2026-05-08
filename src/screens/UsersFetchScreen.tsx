import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { User } from '../types/user';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import UserCard from '../components/UserCard';


export default function UsersFetchScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  /** Busca usuários usando Fetch API nativa */
  const fetchUsers = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      // Trata erros HTTP (ex: 404, 500)
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = (await response.json()) as User[];
      setUsers(data);
    } catch (err) {
      if (err instanceof TypeError) {
        setError('Sem conexão com a internet. Verifique sua rede.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <Loading message="Buscando usuários via Fetch..." />;

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => fetchUsers()}
      />
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <UserCard user={item} />}
      contentContainerStyle={users.length === 0 ? { flex: 1 } : styles.list}
      ListEmptyComponent={<EmptyState message="Nenhum usuário encontrado." />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerText}>🔗 Fetch API</Text>
          <Text style={styles.headerSub}>{users.length} usuários carregados</Text>
        </View>
      }
      ListFooterComponent={
        <TouchableOpacity style={styles.reloadButton} onPress={() => fetchUsers()}>
          <Text style={styles.reloadText}>↻ Recarregar</Text>
        </TouchableOpacity>
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => fetchUsers(true)}
          tintColor="#6366f1"
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 24,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerText: {
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: '700',
  },
  headerSub: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  reloadButton: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#1e293b',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  reloadText: {
    color: '#6366f1',
    fontWeight: '700',
    fontSize: 14,
  },
});
