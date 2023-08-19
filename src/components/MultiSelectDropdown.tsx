import React from 'react';
import {ItemDropDown} from '../types';
import MultiSelect from 'react-native-multiple-select';
import {StyleSheet, View} from 'react-native';
import {ColorPalette} from '../constants/styles/ColorPalette';
import SIZE from '../constants/styles/Font';

interface Props {
  name: string;
  items: ItemDropDown[];
  selectItem: string[];
  onItemSelect: (selectItem: string[]) => void;
}

const MultiSelectDropdown = ({
  name,
  items,
  selectItem,
  onItemSelect,
}: Props) => {
  return (
    <View>
      <MultiSelect
        items={items}
        uniqueKey="value"
        onSelectedItemsChange={onItemSelect}
        selectedItems={selectItem}
        selectText={`${name} : `}
        searchInputPlaceholderText="Search"
        tagRemoveIconColor={ColorPalette.DARK_TEXT}
        tagBorderColor={ColorPalette.LIGHT_GRAY}
        tagTextColor={ColorPalette.DARK_TEXT}
        selectedItemTextColor={ColorPalette.DARK_TEXT}
        selectedItemIconColor={ColorPalette.DARK_TEXT}
        itemTextColor={ColorPalette.DARK_TEXT}
        displayKey="label"
        searchInputStyle={{color: ColorPalette.DARK_TEXT}}
        submitButtonColor={ColorPalette.DARK_TEXT}
        styleListContainer={styles.sectionDropdown}
        styleDropdownMenuSubsection={styles.sectionBoxDropdown}
        fontSize={SIZE.MEDIUM}
        hideSubmitButton
        hideDropdown
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionDropdown: {
    maxHeight: 150,
    overflow: 'scroll',
  },
  sectionBoxDropdown: {
    height: 50,
  },
});

export default MultiSelectDropdown;
