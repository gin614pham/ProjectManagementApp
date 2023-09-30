import React, {useEffect, useState} from 'react';
import {
  Button,
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
import Modal from 'react-native-modal';
import SIZE from '../../constants/styles/Font';

const AddProjectScreen = () => {
  const [selectAssignees, setSelectAssignees] = useState<string[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [selectSkill, setSelectSkill] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [customer, setCustomer] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    const token = await tokenSession.getToken();
    const res = await userRouter.getListUser(token);
    if (res.success) {
      setUser(res.data);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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
    } else {
      setIsModalVisible(true);
      setError(res);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const optionAssignees = user.map(user => {
    return {label: `${user.name}    `, value: user._id};
  });

  const submitHandler = () => {
    fetchProjects();
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>{error}</Text>
          <Button title="OK" onPress={toggleModal} />
        </View>
      </Modal>
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
        onItemSelect={setSelectAssignees}
        enabled={false}
        zIndexInverse={1000}
        zIndex={3000}
      />
      <MultiSelectDropdown
        name="Skills"
        items={SKILL_DATA}
        selectItem={selectSkill}
        onItemSelect={setSelectSkill}
        enabled={false}
        zIndexInverse={2000}
        zIndex={2000}
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
  modal: {
    backgroundColor: ColorPalette.RED,
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: '100%',
    margin: 0,
  },
  modalText: {
    color: ColorPalette.WHITE,
    fontSize: SIZE.MEDIUM,
  },
});

export default AddProjectScreen;
