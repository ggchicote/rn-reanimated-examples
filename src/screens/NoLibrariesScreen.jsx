import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const NoLibrariesScreen = () =>  {

  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {

      setOpacity((opacity) => {
        if (opacity >= 1) {
          clearInterval(interval)
          return opacity
        }

        return opacity + 0.1

      })
    },1000)
  

  }, [])
  

  return (
    <View style={styles.container}>
      <View style={[styles.circle, {opacity}]} />
    </View>
  );
}

export default NoLibrariesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width:50,
    height: 50,
    borderRadius:50,
    backgroundColor:'blue'
  }
});
