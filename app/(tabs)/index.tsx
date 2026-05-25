import { TransactionCard } from '@/components';
import { api } from '@/convex/_generated/api';
import { useDeviceId } from '@/hooks';
import { useQuery } from 'convex/react';
import { ScrollView, Text, YStack } from 'tamagui';

export default function Index() {
  const deviceId = useDeviceId();

  const transactionIns = useQuery(
    api.transactions.get,
    deviceId ? { type: 'IN', deviceId } : 'skip'
  );
  const transactionOuts = useQuery(
    api.transactions.get,
    deviceId ? { type: 'OUT', deviceId } : 'skip'
  );

  return (
    <ScrollView flex={1}>
      <YStack gap="$4" items="center" p="$4">
        <Text>Bienvenue sur ton Budget ! 💰</Text>

        <TransactionCard transactions={transactionIns ?? []} type="IN" />
        <TransactionCard transactions={transactionOuts ?? []} type="OUT" />
        <Text>{deviceId}</Text>
      </YStack>
    </ScrollView>
  );
}
