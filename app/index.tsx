import { api } from '@/convex/_generated/api';
import { useGoogleAuth } from '@/hooks';
import { useAuth } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { Button, Text, View } from 'react-native';

export default function Index() {
  const { signOut, isSignedIn } = useAuth();
  const { login } = useGoogleAuth();

  const transactionIns = useQuery(api.transactions.get, {
    type: 'IN',
    userId: 'toto',
  });
  const transactionOuts = useQuery(api.transactions.get, {
    type: 'OUT',
    userId: 'toto',
  });

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
        <Button title="Se connecter avec Google" onPress={login} />
      )}
    </View>
  );
}
