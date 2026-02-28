import { Doc } from '@/convex';
import {
  Card,
  H3,
  Separator,
  SizableText,
  styled,
  XStack,
  YStack,
} from 'tamagui';

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
});

const TAG_COLORS: Record<string, '$blue5' | '$orange5' | '$purple5'> = {
  Besoin: '$blue5',
  Plaisir: '$orange5',
  Investissement: '$purple5',
};

const Badge = styled(XStack, {
  px: '$2',
  py: '$1',
  rounded: '$2',
  bg: '$gray5',
  self: 'flex-start',
});

type TransactionCardProps = {
  transactions: Doc<'transactions'>[];
  type: 'IN' | 'OUT';
};

const CONFIG = {
  IN: { title: 'Revenus', color: '$green9' as const },
  OUT: { title: 'Dépenses', color: '$red9' as const },
};

export function TransactionCard({ transactions, type }: TransactionCardProps) {
  const { title, color } = CONFIG[type];

  return (
    <Card
      borderWidth={1}
      borderColor="$borderColor"
      elevation="$2"
      size="$4"
      width="100%"
    >
      <Card.Header p="$4" pb="$2">
        <H3 color={color}>{title}</H3>
      </Card.Header>

      <YStack p="$4" pt="$2" gap="$2">
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <YStack key={transaction._id}>
              {index > 0 ? <Separator my="$2" /> : null}
              <XStack justify="space-between" items="center">
                <YStack gap="$1" flex={1} mr="$2">
                  <SizableText fontWeight="600">
                    {transaction.title}
                  </SizableText>
                  {transaction.tags ? (
                    <Badge bg={TAG_COLORS[transaction.tags] ?? '$gray5'}>
                      <SizableText size="$2">{transaction.tags}</SizableText>
                    </Badge>
                  ) : null}
                </YStack>
                <SizableText fontWeight="bold" color={color}>
                  {type === 'IN' ? '+' : '-'}
                  {currencyFormatter.format(Number(transaction.amount))}
                </SizableText>
              </XStack>
            </YStack>
          ))
        ) : (
          <YStack items="center" py="$4">
            <SizableText color="$gray9">Aucune transaction</SizableText>
          </YStack>
        )}
      </YStack>
    </Card>
  );
}
