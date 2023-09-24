import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Project} from '../types';
import ItemProject from './ItemProject';

interface Props {
  navigation: any;
  projects: Project[];
}

const ProjectList = ({navigation, projects}: Props) => {
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
