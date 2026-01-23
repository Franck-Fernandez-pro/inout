import { api } from '@/convex/_generated/api';
import { useAuth, useSSO } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { Button, Text, View } from 'react-native';
import * as Linking from 'expo-linking';

export default function Index() {
  const { signOut, isSignedIn } = useAuth();
  const { startSSOFlow } = useSSO();

  const transactionIns = useQuery(api.transactions.get, {
    type: 'IN',
    userId: 'toto',
  });
  const transactionOuts = useQuery(api.transactions.get, {
    type: 'OUT',
    userId: 'toto',
  });

  const handleLogIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'inout' }),
        strategy: 'oauth_google',
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // 2FA
      }
    } catch (err) {
      console.error('Erreur OAuth', err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isSignedIn ? (
        <>
          <Text>Connecté !</Text>
          <Text>
            {transactionIns?.length
              ? transactionIns.map((transaction) => transaction.title)
              : null}
          </Text>
          <Text>
            {transactionOuts?.length
              ? transactionOuts.map((transaction) => transaction.title)
              : null}
          </Text>
          <Button title="Se déconnecter" onPress={() => signOut()} />
        </>
      ) : (
        <Button title="Se connecter avec Google" onPress={handleLogIn} />
      )}
    </View>
  );
}
