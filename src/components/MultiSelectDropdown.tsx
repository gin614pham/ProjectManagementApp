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
    <View style={styles.container}>
      <MultiSelect
        items={items}
        uniqueKey="value"
        onSelectedItemsChange={onItemSelect}
        selectedItems={selectItem}
        selectText={`${name} : `}
        searchInputPlaceholderText="Search"
        tagRemoveIconColor={ColorPalette.RED}
        tagBorderColor={ColorPalette.TEAL}
        tagTextColor={ColorPalette.DARK_TEXT}
        selectedItemTextColor={ColorPalette.DARK_TEXT}
        selectedItemIconColor={ColorPalette.DARK_TEXT}
        itemTextColor={ColorPalette.DARK_TEXT}
        displayKey="label"
        submitButtonColor={ColorPalette.DARK_TEXT}
        fontSize={SIZE.MEDIUM}
        hideSubmitButton
        hideDropdown
        // style custom
        searchInputStyle={styles.searchInput}
        styleDropdownMenuSubsection={styles.dropdownSubsection}
        styleListContainer={styles.dropdownContainer}
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
