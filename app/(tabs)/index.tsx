import { Button } from '@/components';
import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { Text, View } from 'react-native';

export default function Index() {
  const { signOut } = useAuth();
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

      <Text>Bienvenue sur ton Budget ! 💰</Text>
      <Button title="Se déconnecter" onPress={() => signOut()} />
    </View>
  );
}
