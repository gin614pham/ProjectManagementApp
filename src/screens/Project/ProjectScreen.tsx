import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProjectList from '../../components/ProjectList';
import FloatingButton from '../../components/FloatingButton';

const ProjectScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <ProjectList navigation={navigation} />
      <FloatingButton
        onPress={() => navigation.navigate('AddProjectScreen')}
        icon="briefcase-plus-outline"
        size={30}
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProjectScreen;
