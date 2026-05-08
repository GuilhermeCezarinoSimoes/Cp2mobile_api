import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useUsers } from '../hooks/useUsers';
import { User } from '../types/user';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import UserCard from '../components/UserCard';

type UsersNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Users'>;

export default function UsersScreen() {
  const navigation = useNavigation<UsersNavigationProp>();

  const { data: users, isLoading, isError, error, refetch, isRefetching } = useUsers();

  const handleUserPress = (user: User) => {
    navigation.navigate('UserDetails', { userId: user.id });
  };

  if (isLoading) return <Loading message="Carregando usuários..." />;

  if (isError) {
    return (
      <ErrorMessage
        message={error?.message ?? 'Erro ao carregar usuários.'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <UserCard user={item} onPress={handleUserPress} />
      )}
      contentContainerStyle={!users?.length ? { flex: 1 } : styles.list}
      ListEmptyComponent={<EmptyState message="Nenhum usuário encontrado." />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>👤 Usuários</Text>
          <Text style={styles.headerSub}>
            {users?.length ?? 0} usuários • Axios + TanStack Query
          </Text>
        </View>
      }
      ListFooterComponent={
        <TouchableOpacity style={styles.reloadButton} onPress={() => refetch()}>
          <Text style={styles.reloadText}>↻ Recarregar</Text>
        </TouchableOpacity>
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={() => refetch()}
          tintColor="#6366f1"
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 24 },
  header: { padding: 16, paddingBottom: 8 },
  headerTitle: { color: '#f1f5f9', fontSize: 18, fontWeight: '700' },
  headerSub: { color: '#64748b', fontSize: 12, marginTop: 2 },
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
  reloadText: { color: '#6366f1', fontWeight: '700', fontSize: 14 },
});
