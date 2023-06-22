import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import AnimatedTextInput from '@unferna/react-native-animated-text-input'

export default function App() {
  console.log(AnimatedTextInput)

  return (
    <View style={styles.container}>
      <AnimatedTextInput 
        placeholder={'Testing placeholder'} 
        fontSize={18} 
        targetFontSize={14}        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
