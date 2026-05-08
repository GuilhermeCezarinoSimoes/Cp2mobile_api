import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { usePosts } from '../hooks/usePosts';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import PostCard from '../components/PostCard';

/**
 * Exercício 6 — PostsScreen
 * Lista os 20 primeiros posts usando TanStack Query + postService (Axios).
 */
export default function PostsScreen() {
  const { data: posts, isLoading, isError, error, refetch, isRefetching } = usePosts();

  if (isLoading) return <Loading message="Carregando posts..." />;

  if (isError) {
    return (
      <ErrorMessage
        message={error?.message ?? 'Erro ao carregar os posts.'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PostCard post={item} />}
      contentContainerStyle={!posts?.length ? { flex: 1 } : styles.list}
      ListEmptyComponent={<EmptyState message="Nenhum post encontrado." />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📝 Posts</Text>
          <Text style={styles.headerSub}>
            Top {posts?.length ?? 0} posts • Axios + TanStack Query
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
