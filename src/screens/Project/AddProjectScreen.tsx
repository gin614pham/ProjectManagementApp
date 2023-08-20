import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MultiSelectDropdown from '../../components/MultiSelectDropdown';
import userRouter from '../../api/user';
import {User} from '../../types';
import tokenSession from '../../utils/EncryptedStorage/tokenSession';
import {SKILL_DATA} from '../../constants/data/constants';
import {ColorPalette} from '../../constants/styles/ColorPalette';
import project from '../../api/project';

const AddProjectScreen = () => {
  const [selectAssignees, setSelectAssignees] = useState<string[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [selectSkill, setSelectSkill] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [customer, setCustomer] = useState('');

  const fetchUsers = async () => {
    const token = await tokenSession.getToken();
    const res = await userRouter.getListUser(token);
    if (res.success) {
      setUser(res.data);
    }
  };

  const fetchProjects = async () => {
    const token = await tokenSession.getToken();
    const res = await project.addProject(
      token,
      name,
      description,
      customer,
      selectSkill,
      selectAssignees,
    );
    if (res.success) {
      setName('');
      setDescription('');
      setCustomer('');
      setSelectAssignees([]);
      setSelectSkill([]);
      console.log(res.success);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const optionAssignees = user.map(user => {
    return {label: user.name, value: user._id};
  });

  const onAssigneesSelect = (selectItem: string[]) => {
    setSelectAssignees(selectItem);
  };

  const onSkillSelect = (selectItem: string[]) => {
    setSelectSkill(selectItem);
  };

  const submitHandler = () => {
    console.log(
      `submit: name: ${name}, description: ${description}, customer: ${customer}, user: ${selectAssignees}, skills: ${selectSkill}`,
    );
    fetchProjects();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setName(text)}
        value={name}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Description"
        onChangeText={text => setDescription(text)}
        value={description}
      />
      <TextInput
        style={styles.input}
        placeholder="Customer"
        onChangeText={text => setCustomer(text)}
        value={customer}
      />
      <MultiSelectDropdown
        name="Assignees"
        items={optionAssignees}
        selectItem={selectAssignees}
        onItemSelect={onAssigneesSelect}
      />
      <MultiSelectDropdown
        name="Skills"
        items={SKILL_DATA}
        selectItem={selectSkill}
        onItemSelect={onSkillSelect}
      />
      <TouchableOpacity style={styles.button} onPress={() => submitHandler()}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: ColorPalette.WHITE,
    height: '100%',
    width: '100%',
    overflow: 'scroll',
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: ColorPalette.LIGHT_GRAY,
    borderRadius: 5,
    backgroundColor: ColorPalette.WHITE,
    color: ColorPalette.DARK_TEXT,
  },
  button: {
    backgroundColor: ColorPalette.BLUE_BACKGROUND,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: ColorPalette.WHITE,
    fontSize: 16,
  },
});

export default AddProjectScreen;
