import React, {useEffect, useState} from 'react';
import {View, Text, Button, Alert, SafeAreaView} from 'react-native';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import ShowVideoList from './src/ShowVideoList';

const App = () => {
  const [isGranted, setIsGranted] = useState(false);
  const requestStoragePermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    handlePermissionResult(result);
  };

  const handlePermissionResult = result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Permission Unavailable',
          'This feature is not available on this device.',
        );
        break;
      case RESULTS.DENIED:
        Alert.alert(
          'Permission Denied',
          'You have denied the storage permission.',
        );
        break;
      case RESULTS.LIMITED:
        Alert.alert(
          'Permission Limited',
          'Your access to the storage is limited.',
        );
        break;
      case RESULTS.GRANTED:
        setIsGranted(true);
        Alert.alert(
          'Permission Granted',
          'You have granted the storage permission.',
        );
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Permission Blocked',
          'You have blocked the storage permission.',
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
      handlePermissionResult(result);
    });
  }, []);

  return (
    <SafeAreaView>
      {isGranted ? (
        <ShowVideoList />
      ) : (
        <View>
          <Text>Storage Permission Example</Text>
          <Button
            title="Request Storage Permission"
            onPress={requestStoragePermission}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
