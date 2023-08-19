import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import MultiSelectDropdown from '../../components/MultiSelectDropdown';
import userRouter from '../../api/user';
// import {useToken} from '../../tokens/TokenContext';
import {User} from '../../types';
import tokenSession from '../../utils/EncryptedStorage/tokenSession';

const AddProjectScreen = () => {
  const [selectUser, setSelectUser] = useState<string[]>([]);
  const [user, setUser] = useState<User[]>([]);
  // const {token} = useToken();

  const fetchUsers = async () => {
    const token = await tokenSession.getToken();
    const res = await userRouter.getListUser(token);
    if (res.success) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const optionUsers = user.map(user => {
    return {label: user.name, value: user._id};
  });

  const onItemSelect = (selectItem: string[]) => {
    setSelectUser(selectItem);
  };
  return (
    <View>
      <TextInput placeholder="Name" />
      <TextInput placeholder="Description" />
      <TextInput placeholder="Customer" />
      <MultiSelectDropdown
        name="Skills"
        items={optionUsers}
        selectItem={selectUser}
        onItemSelect={onItemSelect}
      />
    </View>
  );
};

export default AddProjectScreen;
