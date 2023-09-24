import React, {useState} from 'react';
import {ItemDropDown} from '../types';
import {StyleSheet, View} from 'react-native';
import {ColorPalette} from '../constants/styles/ColorPalette';
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
  name: string;
  items: ItemDropDown[];
  selectItem: string[];
  enabled: boolean;
  zIndex: number;
  zIndexInverse: number;
  onItemSelect: (value: React.SetStateAction<string[]>) => void;
}

const MultiSelectDropdown = ({
  name,
  items,
  selectItem,
  enabled,
  zIndex,
  zIndexInverse,
  onItemSelect,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <DropDownPicker
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        items={items}
        value={selectItem}
        setValue={value => onItemSelect(value)}
        multiple={true}
        min={1}
        mode="BADGE"
        badgeColors={[
          'red',
          'green',
          'blue',
          'yellow',
          'purple',
          'orange',
          'pink',
          'gray',
          'brown',
          'teal',
        ]}
        autoScroll
        placeholder={`${name} : `}
        disabled={enabled}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: ColorPalette.LIGHT_GRAY,
    borderRadius: 5,
    maxHeight: 150,
    overflow: 'scroll',
  },
  dropdownSubsection: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: ColorPalette.LIGHT_GRAY,
    borderRadius: 5,
    height: 50,
  },
  searchInput: {
    color: ColorPalette.DARK_TEXT,
  },
  test: {
    backgroundColor: 'red',
  },
});

export default MultiSelectDropdown;
