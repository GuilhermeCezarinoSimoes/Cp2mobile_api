import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyStateProps {
  message?: string;
  icon?: string;
}


export default function EmptyState({
  message = 'Nenhum item encontrado.',
  icon = '📭',
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0f172a',
    gap: 8,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  message: {
    color: '#94a3b8',
    fontSize: 15,
    textAlign: 'center',
  },
});
