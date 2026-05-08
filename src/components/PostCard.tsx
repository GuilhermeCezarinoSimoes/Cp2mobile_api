import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Post } from '../types/post';

interface PostCardProps {
  post: Post;
}


export default function PostCard({ post }: PostCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.idBadge}>
        <Text style={styles.idText}>#{post.id}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {post.title}
      </Text>
      <Text style={styles.body} numberOfLines={3}>
        {post.body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 6,
  },
  idBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#312e81',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  idText: {
    color: '#a5b4fc',
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textTransform: 'capitalize',
  },
  body: {
    color: '#64748b',
    fontSize: 12,
    lineHeight: 18,
  },
});
