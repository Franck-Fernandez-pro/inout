import { Doc } from '@/convex';
import { Button } from 'tamagui';
import React, { useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TAGS, TYPES } from './TransactionForm.constant';
import { styles } from './TransactionForm.styles';

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Titre</Text>
        <TextInput
          testID="title-input"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Entrez le titre"
        />

        <Text style={styles.label}>Tags</Text>
        <View style={styles.selectContainer}>
          {TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              testID={`tag-${tag.toLowerCase()}`}
              style={[
                styles.selectOption,
                tags === tag && styles.selectOptionActive,
              ]}
              onPress={() => setTags(tag)}
            >
              <Text
                style={[
                  styles.selectOptionText,
                  tags === tag && styles.selectOptionTextActive,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Montant (€/$)</Text>
        <TextInput
          testID="amount-input"
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Type</Text>
        <View style={styles.selectContainer}>
          {TYPES.map((typeOption) => (
            <TouchableOpacity
              key={typeOption}
              testID={`type-${typeOption.toLowerCase()}`}
              style={[
                styles.selectOption,
                type === typeOption && styles.selectOptionActive,
              ]}
              onPress={() => setType(typeOption)}
            >
              <Text
                style={[
                  styles.selectOptionText,
                  type === typeOption && styles.selectOptionTextActive,
                ]}
              >
                {typeOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button testID="cancel-button" onPress={onCancel}>Annuler</Button>
          <Button testID="submit-button" onPress={handleSubmit}>Valider</Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
