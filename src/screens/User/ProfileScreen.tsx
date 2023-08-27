import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../contexts/AuthContext';
import {ColorPalette} from '../../constants/styles/ColorPalette';
import SIZE from '../../constants/styles/Font';
import userSession from '../../utils/EncryptedStorage/userSession';
import {User} from '../../types';
const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>();

  const GetUser = async () => {
    const res = await userSession.getUser();
    res ? setUser(res) : setUser(null);
  };

  useEffect(() => {
    GetUser();
  }, []);

  const authContext = useContext(AuthContext);

  const handleSignOut = () => {
    if (authContext) authContext.signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user?.name}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Role:</Text>
        <Text style={styles.value}>{user?.role}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.BACKGROUND_CONTAINER,
    padding: 20,
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
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    fontSize: SIZE.MEDIUM,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: SIZE.MEDIUM,
    marginBottom: 5,
    padding: 5,
  },
  logoutButton: {
    backgroundColor: ColorPalette.BACKGROUND_LOGOUT_BUTTON,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: ColorPalette.LIGHT_TEXT,
    fontSize: SIZE.MEDIUM,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
