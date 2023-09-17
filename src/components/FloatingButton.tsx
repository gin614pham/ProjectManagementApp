import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorPalette} from '../constants/styles/ColorPalette';

type Props = {
  onPress: () => void;
  icon: string;
  size: number;
  color: string;
};

const FloatingButton = ({onPress, icon, size, color}: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress}>
        <Icon name={icon} size={size} color={color} />
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
    backgroundColor: ColorPalette.BLUE_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 4,
    shadowColor: ColorPalette.DARK_TEXT,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default FloatingButton;
