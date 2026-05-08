import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useUserPosts } from '../hooks/usePosts';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import PostCard from '../components/PostCard';

type UserPostsRouteProp = RouteProp<RootStackParamList, 'UserPosts'>;


export default function UserPostsScreen() {
  const route = useRoute<UserPostsRouteProp>();
  const { userId, userName } = route.params;

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useUserPosts(userId);

  if (isLoading) return <Loading message={`Buscando posts de ${userName}...`} />;

  if (isError) {
    return (
      <ErrorMessage
        message={error?.message ?? 'Erro ao carregar os posts deste usuário.'}
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
      ListEmptyComponent={
        <EmptyState
          message={`${userName} ainda não tem posts.`}
          icon="📭"
        />
      }
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Posts de {userName.split(' ')[0]}</Text>
          <Text style={styles.headerSub}>
            {posts?.length ?? 0} posts • GET /posts?userId={userId}
          </Text>
        </View>
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
});
