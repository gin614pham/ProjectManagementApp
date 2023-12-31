import React, {useEffect, useState} from 'react';
import {Project} from '../../types';
import tokenSession from '../../utils/EncryptedStorage/tokenSession';
import Projected from '../../api/project';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorPalette} from '../../constants/styles/ColorPalette';
import SIZE from '../../constants/styles/Font';
import Icon from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import {PROJECT_STATUS_DATA} from '../../constants/data/constants';

interface Props {
  navigation: any;
  route: any;
}

const DetailProjectScreen = ({route, navigation}: Props) => {
  const [project, setProject] = useState<Project>();
  const {key} = route.params;
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState('');

  const fetchProject = async () => {
    const token = await tokenSession.getToken();
    const res = await Projected.getProjectById(token, key);
    res.success ? setProject(res.data) : console.log(res.error);
  };

  const fetchDeleteProject = async () => {
    const token = await tokenSession.getToken();
    const res = await Projected.delProject(token, key);
    res.success ? navigation.goBack() : console.log(res.error);
  };

  const fetchStatus = async () => {
    const token = await tokenSession.getToken();
    const res = await Projected.updateProject(token, key, status);
    res.success ? setProject(res.data) : console.log(res.error);
  };

  const setValue = () => {
    setStatus(project?.status || '');
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleDelete = () => {
    fetchDeleteProject();
  };

  const handleSave = () => {
    fetchStatus();
    navigation.goBack();
    setIsEdit(false);
  };

  const handleCancel = () => {
    setValue();
    setIsEdit(false);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    setValue();
  }, [project]);

  return (
    <View style={styles.container}>
      {project ? (
        <View style={styles.content}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Name:</Text>
            <Text style={styles.valueText}>{project.name}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>Description:</Text>
            <Text style={styles.valueText}>{project.description}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>Customer:</Text>
            <Text style={styles.valueText}>{project.customer}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>Skill:</Text>
            <Text style={styles.valueText}>{project.skills.join(', ')}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>Assignees:</Text>
            <Text style={styles.valueText}>
              {project.assignees.map(item => item.name).join(', ')}
            </Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>Status:</Text>
            <Picker
              selectedValue={status}
              onValueChange={itemValue => setStatus(itemValue)}
              enabled={isEdit}>
              {PROJECT_STATUS_DATA.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={isEdit ? handleSave : handleEdit}
              style={styles.button}>
              <Text style={styles.buttonText}>{isEdit ? 'Save' : 'Edit'}</Text>
              <Icon
                name={isEdit ? 'save' : 'edit'}
                size={22}
                color={ColorPalette.BLUE}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={isEdit ? handleCancel : handleDelete}
              style={[styles.button, {borderColor: ColorPalette.RED}]}>
              <Text style={[styles.buttonText, {color: ColorPalette.RED}]}>
                {isEdit ? 'Cancel' : 'Delete'}
              </Text>
              <Icon
                name={isEdit ? 'close' : 'delete'}
                size={22}
                color={ColorPalette.RED}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.WHITE,
    padding: 15,
    borderRadius: 10,
    shadowColor: ColorPalette.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  label: {
    borderWidth: 1,
    borderColor: ColorPalette.LIGHT_GRAY,
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
  },
  labelText: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: SIZE.MEDIUM,
  },
  valueText: {
    color: '#555',
    fontSize: SIZE.MEDIUM,
  },
  loadingText: {
    fontStyle: 'italic',
    fontSize: SIZE.LARGE,
  },
  buttonContainer: {
    flexDirection: 'row',

    backgroundColor: ColorPalette.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: ColorPalette.LIGHT_GRAY,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: ColorPalette.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: ColorPalette.BLUE_BACKGROUND,
    borderWidth: 1,
    marginHorizontal: 3,
  },
  buttonText: {
    color: ColorPalette.BLUE_BACKGROUND,
    fontSize: SIZE.MEDIUM,
    fontWeight: 'bold',
  },
});

export default DetailProjectScreen;
