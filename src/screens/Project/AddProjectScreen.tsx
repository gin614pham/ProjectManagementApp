import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import MultiSelectDropdown from '../../components/MultiSelectDropdown';

const AddProjectScreen = () => {
  const [selectUser, setSelectUser] = useState<string[]>([]);
  const optionUsers = [
    {label: 'User 1', value: 'user1'},
    {label: 'User 2', value: 'user2'},
    {label: 'User 3', value: 'user3'},
  ];

  const onItemSelect = (selectItem: string[]) => {
    setSelectUser(selectItem);
  };
  return (
    <View>
      <TextInput placeholder="Name" />
      <TextInput placeholder="Description" />
      <MultiSelectDropdown
        items={optionUsers}
        selectItem={selectUser}
        onItemSelect={onItemSelect}
      />
    </View>
  );
};

export default AddProjectScreen;
