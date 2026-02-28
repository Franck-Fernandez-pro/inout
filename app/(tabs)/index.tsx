import { api } from '@/convex/_generated/api';
import { useAuth } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { Button, Text, YStack } from 'tamagui';

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
    <YStack flex={1} justify="center" items="center">
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
      <Button onPress={() => signOut()}>Se déconnecter</Button>
    </YStack>
  );
}
