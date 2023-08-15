import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useToken} from '../tokens/TokenContext';
import project from '../api/project';
import {Project} from '../types';

const ProjectList = () => {
  const {token} = useToken();
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    console.log(token);
    const res = await project.getListProject(token);
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <FlatList
      data={projects}
      renderItem={({item}) => {
        return (
          <View style={styles.sectionRow}>
            <Text style={styles.sectionCell}>{item.name}</Text>
            <Text style={styles.sectionLastCell}>{item.status}</Text>
          </View>
        );
      }}
      ListHeaderComponent={() => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderTitle}>Projects</Text>
          <Text style={styles.sectionLastHeaderTitle}>Status</Text>
        </View>
      )}
      keyExtractor={item => item._id}
    />
  );
};

const styles = StyleSheet.create({
  sectionRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  sectionHeaderTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionLastHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingStart: 4,
  },
  sectionCell: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
  },
  sectionLastCell: {
    textAlign: 'right',
    fontSize: 16,
    paddingVertical: 4,
  },
});

export default ProjectList;
