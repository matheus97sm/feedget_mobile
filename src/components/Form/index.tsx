import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { SubmitButton } from '../SubmitButton';
import { api } from '../../libs/api';

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: FormProps) {
  const [comment, setComment] = useState<string>('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeeback, setIsSendingFeedback] = useState<boolean>(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSubmit() {
    if (isSendingFeeback) return;

    setIsSendingFeedback(true);

    // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line operator-linebreak
    const screenshotBase64 =
      // eslint-disable-next-line operator-linebreak
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' }));

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment,
      });

      onFeedbackSent();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onFeedbackCanceled()}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={() => handleScreenshot()}
          onRemoveShot={() => handleScreenshotRemove()}
          screenshot={screenshot}
        />

        <SubmitButton
          onPress={() => handleSubmit()}
          isLoading={isSendingFeeback}
        />
      </View>
    </View>
  );
}
