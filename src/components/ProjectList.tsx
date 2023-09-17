import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import project from '../api/project';
import {Project} from '../types';
import tokenSession from '../utils/EncryptedStorage/tokenSession';
import ItemProject from './ItemProject';

const ProjectList = ({navigation}: any) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const token = await tokenSession.getToken();
    const res = await project.getListProject(token);
    res.success ? setProjects(res.data) : console.log(res.error);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onPress = (id: string) => {
    navigation.navigate('DetailProjectScreen', {key: id});
    console.log('onPress:', id);
  };

  const renderItem = ({item}: {item: Project}) => {
    return <ItemProject item={item} onPress={() => onPress(item._id)} />;
  };

  return (
    <FlatList
      data={projects}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 5,
  },
});

export default ProjectList;
