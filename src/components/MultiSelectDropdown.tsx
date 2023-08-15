import React from 'react';
import {ItemDropDown} from '../types';
import MultiSelect from 'react-native-multiple-select';
import {Text, View} from 'react-native';

interface Props {
  items: ItemDropDown[];
  selectItem: string[];
  onItemSelect: (selectItem: string[]) => void;
}

const MultiSelectDropdown = ({items, selectItem, onItemSelect}: Props) => {
  return (
    <View>
      <MultiSelect
        hideTags
        items={items}
        uniqueKey="value"
        onSelectedItemsChange={onItemSelect}
        selectedItems={selectItem}
        selectText="Select options..."
        searchInputPlaceholderText="Search"
        onChangeInput={text => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="label"
        searchInputStyle={{color: '#CCC'}}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
      <View>
        {selectItem.map(item => (
          <Text key={item}>{item}</Text>
        ))}
      </View>
    </View>
  );
};

export default MultiSelectDropdown;
