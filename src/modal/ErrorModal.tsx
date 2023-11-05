import React from 'react';
import {Modal, Text, View, Pressable, StyleSheet} from 'react-native';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  message: string;
}

const ErrorModal = ({isModalVisible, setIsModalVisible, message}: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(!isModalVisible)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Error</Text>
          <Text style={styles.modalText}> {message}</Text>
          <Pressable
            style={[styles.button]}
            onPress={() => setIsModalVisible(!isModalVisible)}>
            <Text style={{color: 'white'}}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
  modalHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'red',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    backgroundColor: '#2196F3',
    width: 100,
    alignItems: 'center',
  },
});

export default ErrorModal;
