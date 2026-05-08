import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface MenuItemProps {
  icon: string;
  label: string;
  description: string;
  badge?: string;
  onPress: () => void;
}

function MenuItem({ icon, label, description, badge, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.75}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <View style={styles.menuInfo}>
        <View style={styles.menuRow}>
          <Text style={styles.menuLabel}>{label}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.menuDescription}>{description}</Text>
      </View>
      <Text style={styles.menuChevron}>›</Text>
    </TouchableOpacity>
  );
}

/**
 * Tela inicial com menu de navegação para todos os exercícios.
 */
export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>API Explorer</Text>
        <Text style={styles.headerSubtitle}>Fiap • CP2 Mobile</Text>
      </View>

      {/* Seção de Exercícios */}
      <Text style={styles.sectionTitle}>Exercícios</Text>

      <MenuItem
        icon="🔗"
        label="Fetch API"
        description="Buscar usuários com Fetch nativo"
        badge="Ex. 1"
        onPress={() => navigation.navigate('UsersFetch')}
      />

      <MenuItem
        icon="✏️"
        label="Criar Post"
        description="Enviar POST com validação de campos"
        badge="Ex. 2"
        onPress={() => navigation.navigate('CreatePost')}
      />

      <MenuItem
        icon="⚠️"
        label="Teste de Erro"
        description="Rota inexistente com retry"
        badge="Ex. 4"
        onPress={() => navigation.navigate('ErrorTest')}
      />

      {/* Seção Principal */}
      <Text style={styles.sectionTitle}>Projeto Principal</Text>

      <MenuItem
        icon="👤"
        label="Usuários (Axios)"
        description="Lista com service layer e hooks"
        onPress={() => navigation.navigate('Users')}
      />

      <MenuItem
        icon="📝"
        label="Posts"
        description="Top 20 posts com TanStack Query"
        onPress={() => navigation.navigate('Posts')}
      />

      {/* Rodapé com stack de tecnologias */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Stack utilizada</Text>
        {[
          'React Native + Expo',
          'TypeScript (sem any)',
          'Axios + Interceptors',
          'TanStack Query',
          'React Navigation',
          'AsyncStorage (Offline First)',
        ].map((tech) => (
          <Text key={tech} style={styles.footerItem}>
            • {tech}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    paddingTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    marginBottom: 8,
  },
  headerTitle: {
    color: '#f1f5f9',
    fontSize: 28,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#6366f1',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 14,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  menuIcon: {
    fontSize: 24,
  },
  menuInfo: {
    flex: 1,
    gap: 3,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuLabel: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#312e81',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#a5b4fc',
    fontSize: 10,
    fontWeight: '700',
  },
  menuDescription: {
    color: '#64748b',
    fontSize: 12,
    lineHeight: 16,
  },
  menuChevron: {
    color: '#475569',
    fontSize: 24,
  },
  footer: {
    margin: 16,
    marginTop: 32,
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 4,
  },
  footerTitle: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footerItem: {
    color: '#64748b',
    fontSize: 12,
    lineHeight: 20,
  },
});
