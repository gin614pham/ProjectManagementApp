import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ProjectList from '../../components/ProjectList';
import FloatingButton from '../../components/FloatingButton';
import {Project} from '../../types';
import tokenSession from '../../utils/EncryptedStorage/tokenSession';
import project from '../../api/project';
import userSession from '../../utils/EncryptedStorage/userSession';

const ProjectScreen = ({navigation}: any) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [role, setRole] = useState('');

  const getRole = async () => {
    const res = await userSession.getUser();
    res ? setRole(res.role) : setRole('');
  };

  useEffect(() => {
    getRole();
  }, []);

  const fetchProjects = async () => {
    const token = await tokenSession.getToken();
    const res = await project.getListProject(token);
    res.success ? setProjects(res.data) : console.log(res.error);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProjects();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ProjectList navigation={navigation} projects={projects} />
      {role === 'admin' && (
        <FloatingButton
          onPress={() => navigation.navigate('AddProjectScreen')}
          icon="briefcase-plus-outline"
          size={30}
          color="white"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProjectScreen;
