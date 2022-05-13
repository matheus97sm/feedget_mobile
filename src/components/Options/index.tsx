import React from 'react';
import { Text, View } from 'react-native';

import { Copyrights } from '../Copyrights';
import { Option } from '../Option';

import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';
import { FeedbackType } from '../Widget';

interface OptionsProps {
  // eslint-disable-next-line no-unused-vars
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export function Options({ onFeedbackTypeChanged }: OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
          />
        ))}
      </View>

      <Copyrights />
    </View>
  );
}
