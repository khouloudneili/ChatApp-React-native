import React from 'react';
import { View, Image, StyleSheet } from 'react-native';



const DisplayAnImage = () => {
  return (
    <View style={styles.container}>
      
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://www.tunisiemploi.com.tn/wp-content/uploads/2018/09/vneuron-300x300.jpg',
        }}
      />

    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      paddingTop: 0,
    },
    tinyLogo: {
      width: 120,
      height: 120,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });
export default DisplayAnImage;
