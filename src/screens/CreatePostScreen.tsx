import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { postService } from '../services/postService';
import { CreatedPost } from '../types/post';
import Loading from '../components/Loading';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdPost, setCreatedPost] = useState<CreatedPost | null>(null);

  const validate = (): string | null => {
    if (!title.trim()) return 'O título é obrigatório.';
    if (title.trim().length < 3) return 'O título deve ter pelo menos 3 caracteres.';
    if (!body.trim()) return 'O conteúdo é obrigatório.';
    if (body.trim().length < 10) return 'O conteúdo deve ter pelo menos 10 caracteres.';
    return null;
  };

  const handleCreate = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setCreatedPost(null);

    try {
      const result = await postService.create({
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      });

      setCreatedPost(result);

      setTitle('');
      setBody('');
    } catch (err) {
      if (err instanceof Error) {
        setError(`Falha ao criar post: ${err.message}`);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Enviando post..." />;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Novo Post</Text>
        <Text style={styles.subheading}>Usando Axios + postService</Text>

        {/* Sucesso: exibe o ID retornado */}
        {createdPost && (
          <View style={styles.successCard}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successTitle}>Post criado com sucesso!</Text>
            <Text style={styles.successId}>ID retornado: #{createdPost.id}</Text>
            <Text style={styles.successField}>Título: {createdPost.title}</Text>
          </View>
        )}

        {/* Erro de validação ou HTTP */}
        {error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {/* Campo: Título */}
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={[styles.input, !title && error ? styles.inputError : null]}
          placeholder="Digite o título do post..."
          placeholderTextColor="#475569"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setError(null);
          }}
          maxLength={100}
        />
        <Text style={styles.charCount}>{title.length}/100</Text>

        {/* Campo: Conteúdo */}
        <Text style={styles.label}>Conteúdo *</Text>
        <TextInput
          style={[styles.input, styles.textArea, !body && error ? styles.inputError : null]}
          placeholder="Digite o conteúdo do post..."
          placeholderTextColor="#475569"
          value={body}
          onChangeText={(text) => {
            setBody(text);
            setError(null);
          }}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          maxLength={500}
        />
        <Text style={styles.charCount}>{body.length}/500</Text>

        {/* Botão Criar */}
        <TouchableOpacity
          style={[styles.button, (!title || !body) && styles.buttonDisabled]}
          onPress={handleCreate}
          disabled={!title || !body}
        >
          <Text style={styles.buttonText}>Criar Post</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>
          * A API JSONPlaceholder simula a criação e retorna um ID fictício.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#0f172a' },
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 20, paddingBottom: 40 },
  heading: { color: '#f1f5f9', fontSize: 22, fontWeight: '800', marginBottom: 2 },
  subheading: { color: '#6366f1', fontSize: 12, fontWeight: '500', marginBottom: 20 },
  successCard: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: '#16a34a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 4,
  },
  successIcon: { fontSize: 24, marginBottom: 4 },
  successTitle: { color: '#4ade80', fontSize: 15, fontWeight: '700' },
  successId: { color: '#86efac', fontSize: 14, fontWeight: '700', marginTop: 4 },
  successField: { color: '#4ade80', fontSize: 12 },
  errorCard: {
    backgroundColor: '#1f0707',
    borderWidth: 1,
    borderColor: '#dc2626',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  errorText: { color: '#fca5a5', fontSize: 13, lineHeight: 20 },
  label: { color: '#94a3b8', fontSize: 12, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    padding: 14,
    color: '#f1f5f9',
    fontSize: 14,
    marginBottom: 4,
  },
  inputError: { borderColor: '#dc2626' },
  textArea: { height: 120, paddingTop: 14 },
  charCount: { color: '#475569', fontSize: 11, textAlign: 'right', marginBottom: 16 },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { backgroundColor: '#312e81', opacity: 0.5 },
  buttonText: { color: '#ffffff', fontWeight: '800', fontSize: 15 },
  hint: { color: '#475569', fontSize: 11, textAlign: 'center', marginTop: 16, lineHeight: 16 },
});
