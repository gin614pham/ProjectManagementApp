import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

type Props = {
  onPress: () => void;
};

const FloatingButton = ({onPress}: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="plus" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default FloatingButton;
