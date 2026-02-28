import { useGoogleAuth } from '@/hooks';
import { useAuth } from '@clerk/clerk-expo';
import { Button, Text, YStack } from 'tamagui';

export default function Index() {
  const { isSignedIn } = useAuth();
  const { login } = useGoogleAuth();

  return (
    <YStack flex={1} justify="center" items="center">
      {isSignedIn ? (
        <Text>Tu es déjà connecté !</Text>
      ) : (
        <Button onPress={login}>Se connecter avec Google</Button>
      )}
    </YStack>
  );
}
