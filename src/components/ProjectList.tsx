import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
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
          <View>
            <Text>{item.name}</Text>
            <Text>{item.status}</Text>
          </View>
        );
      }}
      keyExtractor={item => item._id}
    />
  );
};

export default ProjectList;
