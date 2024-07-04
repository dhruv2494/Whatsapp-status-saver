import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';
import React, { useEffect } from 'react';

const RequestForPermissiom = () => {
  useEffect(() => {
    requestPermission();
  }, []);

  async function requestPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Required',
          message: 'App needs read access to external storage.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Read external storage permission granted');
        // You can now access external storage
      } else {
        console.log('Read external storage permission denied');
        // Handle permission denial
      }
    } catch (err) {
      console.warn(err);
    }
  }
  return (
    <View>
      <Text>RequestForPermissiom</Text>
      <Button onClick={requestPermission} title='Request for permission'/>
    </View>
  );
};

export default RequestForPermissiom;

const styles = StyleSheet.create({});
