import { TransactionCard } from '@/components';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { ScrollView, Text, YStack } from 'tamagui';

export default function Index() {
  const transactionIns = useQuery(api.transactions.get, {
    type: 'IN',
    userId: 'toto',
  });
  const transactionOuts = useQuery(api.transactions.get, {
    type: 'OUT',
    userId: 'toto',
  });

  return (
    <ScrollView flex={1}>
      <YStack gap="$4" items="center" p="$4">
        <Text>Bienvenue sur ton Budget ! 💰</Text>

        <TransactionCard transactions={transactionIns ?? []} type="IN" />
        <TransactionCard transactions={transactionOuts ?? []} type="OUT" />
      </YStack>
    </ScrollView>
  );
}
