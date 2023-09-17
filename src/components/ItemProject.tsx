import React from 'react';
import {ItemProjectProps} from '../types';
import {StyleSheet, Text, View} from 'react-native';
import {ColorPalette} from '../constants/styles/ColorPalette';
import SIZE from '../constants/styles/Font';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ItemProject = ({item, onPress}: ItemProjectProps) => {
  return (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={() => onPress()}>
        <View>
          <Text>
            <Text style={styles.labelText}>Name: </Text>
            <Text style={styles.valueText}>{item.name}</Text>
          </Text>
        </View>
        <View>
          <Text>
            <Text style={styles.labelText}>Customer: </Text>
            <Text style={styles.valueText}>{item.customer}</Text>
          </Text>
        </View>
        <View>
          <Text>
            <Text style={styles.labelText}>Assignees: </Text>
            {item.assignees.map((assignee, index) => (
              <Text key={index} style={styles.valueText}>
                {assignee.name} {index !== item.assignees.length - 1 && ', '}
              </Text>
            ))}
          </Text>
        </View>
        <View>
          <Text>
            <Text style={styles.labelText}>Status: </Text>
            <Text style={styles.valueText}>{item.status}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 5,
  },
  listItem: {
    backgroundColor: ColorPalette.WHITE,
    padding: 5,
    borderRadius: 10,
    marginBottom: 5,
    shadowColor: ColorPalette.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelText: {
    fontWeight: 'bold',
    color: ColorPalette.BROWN,
    fontSize: SIZE.MEDIUM,
  },
  valueText: {
    marginLeft: 5,
    color: ColorPalette.DARK_TEXT,
    fontSize: SIZE.MEDIUM,
  },
});

export default ItemProject;
