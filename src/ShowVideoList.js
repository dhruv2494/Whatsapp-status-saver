import {
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';

const ShowVideoList = () => {
  const [videoList, setVideoList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const getVideoList = async () => {
    const folderPath = `${RNFS.ExternalStorageDirectoryPath}/Android/media/com.whatsapp/WhatsApp/Media/.Statuses`;
    const files = await RNFS.readDir(folderPath);
    setFileList(files);
    const videoFiles = files.filter(
      file =>
        file.isFile() &&
        (file.name.endsWith('.mp4') ||
          file.name.endsWith('.mkv') ||
          file.name.endsWith('.avi')),
    );
    setVideoList(videoFiles);

    const imageFiles = files.filter(
      file =>
        file.isFile() &&
        (file.name.endsWith('.jpg') ||
          file.name.endsWith('.jpeg') ||
          file.name.endsWith('.png') ||
          file.name.endsWith('.gif')),
    );
    setImageList(imageFiles);
  };

  const RenderVideoItem = ({item}) => {

    return (
      <View style={styles.videoContainer}>
        <Video
          source={{uri: 'file://' + item.path}}
          style={styles.video}
          controls={true}
          resizeMode="cover"
        />
      </View>
    );
  };

  const RenderImageItem = ({item}) => {

    return (
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: 'file://' + item.path,
          }}
        />
      </View>
    );
  };
  return (
    <View>
      <Button onPress={getVideoList} title="Referesh List" />
      <FlatList
        numColumns={2}
        data={fileList}
        scrollEnabled={true}
        renderItem={({item}) => {
          if (
            item.name.endsWith('.mp4') ||
            item.name.endsWith('.mkv') ||
            item.name.endsWith('.avi')
          ) {
            return <RenderVideoItem item={item} />;
          } else if (
            item.name.endsWith('.jpg') ||
            item.name.endsWith('.jpeg') ||
            item.name.endsWith('.png') ||
            item.name.endsWith('.gif')
          ) {
            return <RenderImageItem item={item} />;
          }
        }}
      />
      {/* <FlatList
        data={videoList}
        renderItem={renderVideoItem}
        keyExtractor={(item, index) => index.toString()}
      /> */}
    </View>
  );
};

export default ShowVideoList;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  videoContainer: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    marginBottom: 10,
  },
  video: {
    flex: 1,
  },
});
