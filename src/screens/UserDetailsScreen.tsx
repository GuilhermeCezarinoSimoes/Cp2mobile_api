import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useUser } from '../hooks/useUsers';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

type UserDetailsRouteProp = RouteProp<RootStackParamList, 'UserDetails'>;
type UserDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserDetails'>;

/** Linha de detalhe reutilizável */
function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}


export default function UserDetailsScreen() {
  const route = useRoute<UserDetailsRouteProp>();
  const navigation = useNavigation<UserDetailsNavigationProp>();
  const { userId } = route.params;

  const { data: user, isLoading, isError, error, refetch } = useUser(userId);

  if (isLoading) return <Loading message="Carregando detalhes..." />;

  if (isError || !user) {
    return (
      <ErrorMessage
        message={error?.message ?? 'Não foi possível carregar este usuário.'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar e nome */}
      <View style={styles.heroSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>

      {/* Detalhes do usuário */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações</Text>
        <DetailRow icon="✉️" label="Email" value={user.email} />
        <DetailRow icon="📞" label="Telefone" value={user.phone} />
        <DetailRow icon="🌐" label="Website" value={user.website} />
        <DetailRow icon="🏢" label="Empresa" value={user.company.name} />
        <DetailRow icon="📍" label="Cidade" value={`${user.address.city}, ${user.address.street}`} />
      </View>

      {/* Botão para ver posts deste usuário (UserPostsScreen) */}
      <TouchableOpacity
        style={styles.postsButton}
        onPress={() =>
          navigation.navigate('UserPosts', { userId: user.id, userName: user.name })
        }
      >
        <Text style={styles.postsButtonText}>📝 Ver posts de {user.name.split(' ')[0]}</Text>
        <Text style={styles.postsButtonChevron}>›</Text>
      </TouchableOpacity>

      {/* Informação da empresa */}
      <View style={styles.companyCard}>
        <Text style={styles.companyLabel}>Empresa</Text>
        <Text style={styles.companyName}>{user.company.name}</Text>
        <Text style={styles.companyCatchPhrase}>"{user.company.catchPhrase}"</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 16, paddingBottom: 40 },
  heroSection: { alignItems: 'center', paddingVertical: 24, gap: 6 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: '800' },
  name: { color: '#f1f5f9', fontSize: 22, fontWeight: '800' },
  username: { color: '#6366f1', fontSize: 13, fontWeight: '500' },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  cardTitle: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailIcon: { fontSize: 16, marginTop: 2 },
  detailContent: { flex: 1 },
  detailLabel: { color: '#475569', fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  detailValue: { color: '#e2e8f0', fontSize: 14, marginTop: 1 },
  postsButton: {
    backgroundColor: '#312e81',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4338ca',
  },
  postsButtonText: { color: '#a5b4fc', fontWeight: '700', fontSize: 14 },
  postsButtonChevron: { color: '#6366f1', fontSize: 24 },
  companyCard: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 4,
  },
  companyLabel: { color: '#475569', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  companyName: { color: '#f1f5f9', fontSize: 16, fontWeight: '700' },
  companyCatchPhrase: { color: '#64748b', fontSize: 12, fontStyle: 'italic' },
});
