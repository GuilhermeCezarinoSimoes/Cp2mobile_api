import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../types/user';

interface UserCardProps {
  user: User;
  onPress?: (user: User) => void;
}


export default function UserCard({ user, onPress }: UserCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(user)}
      activeOpacity={0.75}
    >
      {/* Avatar inicial */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>✉️ {user.email}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>

      {onPress && <Text style={styles.chevron}>›</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    gap: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '700',
  },
  email: {
    color: '#94a3b8',
    fontSize: 12,
  },
  username: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '500',
  },
  chevron: {
    color: '#475569',
    fontSize: 24,
    fontWeight: '300',
  },
});
