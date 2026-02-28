import { Doc } from '@/convex';
import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import {
  Button,
  Input,
  SizableText,
  styled,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { TAGS, TYPES } from './TransactionForm.constant';

const SelectOption = styled(XStack, {
  borderWidth: 1,
  borderColor: '$borderColor',
  rounded: '$4',
  p: '$3',
  bg: '$gray2',
  pressStyle: { opacity: 0.7 },
  cursor: 'pointer',

  variants: {
    active: {
      true: {
        bg: '$blue10',
        borderColor: '$blue10',
      },
    },
  } as const,
});

type Props = {
  initialValues?: Partial<Doc<'transactions'>>;
  onSubmit: (values: Partial<Doc<'transactions'>>) => void;
  onCancel: () => void;
};

export function TransactionForm({
  initialValues = {},
  onSubmit,
  onCancel,
}: Props) {
  const [title, setTitle] = useState(initialValues.title || '');
  const [tags, setTags] = useState<Doc<'transactions'>['tags']>(
    initialValues.tags || 'Besoin'
  );
  const [amount, setAmount] = useState(initialValues.amount || '');
  const [type, setType] = useState<Doc<'transactions'>['type']>(
    initialValues.type || 'IN'
  );

  const handleSubmit = () => {
    const formData: Partial<Doc<'transactions'>> = {
      title,
      tags,
      amount,
      type,
    };

    onSubmit(formData);
  };

  return (
    <YStack width="100%" p="$5" onPress={Keyboard.dismiss}>
      <SizableText fontWeight="bold" mb="$2" mt="$4">
        Titre
      </SizableText>
      <Input
        testID="title-input"
        value={title}
        onChangeText={setTitle}
        placeholder="Entrez le titre"
      />

      <SizableText fontWeight="bold" mb="$2" mt="$4">
        Tags
      </SizableText>
      <XStack flexWrap="wrap" gap="$2">
        {TAGS.map((tag) => (
          <SelectOption
            key={tag}
            testID={`tag-${tag.toLowerCase()}`}
            active={tags === tag}
            onPress={() => setTags(tag)}
          >
            <Text
              color={tags === tag ? 'white' : '$gray11'}
              fontWeight={tags === tag ? 'bold' : 'normal'}
            >
              {tag}
            </Text>
          </SelectOption>
        ))}
      </XStack>

      <SizableText fontWeight="bold" mb="$2" mt="$4">
        Montant (€/$)
      </SizableText>
      <Input
        testID="amount-input"
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        keyboardType="numeric"
      />

      <SizableText fontWeight="bold" mb="$2" mt="$4">
        Type
      </SizableText>
      <XStack flexWrap="wrap" gap="$2">
        {TYPES.map((typeOption) => (
          <SelectOption
            key={typeOption}
            testID={`type-${typeOption.toLowerCase()}`}
            active={type === typeOption}
            onPress={() => setType(typeOption)}
          >
            <Text
              color={type === typeOption ? 'white' : '$gray11'}
              fontWeight={type === typeOption ? 'bold' : 'normal'}
            >
              {typeOption}
            </Text>
          </SelectOption>
        ))}
      </XStack>

      <XStack justify="space-around" mt="$8">
        <Button testID="cancel-button" onPress={onCancel}>
          Annuler
        </Button>
        <Button testID="submit-button" onPress={handleSubmit}>
          Valider
        </Button>
      </XStack>
    </YStack>
  );
}
