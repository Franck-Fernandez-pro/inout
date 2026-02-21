import { useGoogleAuth } from '@/hooks';
import { useAuth } from '@clerk/clerk-expo';
import { Text, View } from 'react-native';
import { Button } from 'tamagui';

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
        <Button onPress={login}>Se connecter avec Google</Button>
      )}
    </View>
  );
}
