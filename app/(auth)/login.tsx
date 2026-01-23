import { useGoogleAuth } from '@/hooks';
import { useAuth } from '@clerk/clerk-expo';
import { Button, Text, View } from 'react-native';

export default function Index() {
  const { isSignedIn } = useAuth();
  const { login } = useGoogleAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isSignedIn ? (
        <>
          <Text>Tu es déjà connecté !</Text>
        </>
      ) : (
        <Button title="Se connecter avec Google" onPress={login} />
      )}
    </View>
  );
}
