import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import HomeScreen from '../screens/HomeScreen';
import UsersFetchScreen from '../screens/UsersFetchScreen';
import UsersScreen from '../screens/UsersScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import UserPostsScreen from '../screens/UserPostsScreen';
import PostsScreen from '../screens/PostsScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ErrorTestScreen from '../screens/ErrorTestScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#f8fafc',
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: '#0f172a' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: '🌐 API Explorer' }} />
      <Stack.Screen name="UsersFetch" component={UsersFetchScreen} options={{ title: 'Fetch API' }} />
      <Stack.Screen name="Users" component={UsersScreen} options={{ title: 'Usuários (Axios)' }} />
      <Stack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{ title: 'Detalhes do Usuário' }}
      />
      <Stack.Screen
        name="UserPosts"
        component={UserPostsScreen}
        options={({ route }) => ({ title: `Posts de ${route.params.userName}` })}
      />
      <Stack.Screen name="Posts" component={PostsScreen} options={{ title: 'Posts' }} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Criar Post' }} />
      <Stack.Screen name="ErrorTest" component={ErrorTestScreen} options={{ title: 'Teste de Erro' }} />
    </Stack.Navigator>
  );
}
