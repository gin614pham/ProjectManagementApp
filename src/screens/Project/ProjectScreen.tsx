import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProjectList from '../../components/ProjectList';
import FloatingButton from '../../components/FloatingButton';

const ProjectScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <ProjectList />
      <FloatingButton onPress={() => navigation.navigate('AddProjectScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProjectScreen;
