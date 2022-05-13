import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import successImg from '../../assets/success.png';
import { Copyrights } from '../Copyrights';

import { styles } from './styles';

interface SuccessProps {
  onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: SuccessProps) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>Agradecemos o feedback</Text>

      <TouchableOpacity onPress={onSendAnotherFeedback} style={styles.button}>
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyrights />
    </View>
  );
}
