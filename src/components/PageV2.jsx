import { StyleSheet, Text, View, Dimensions } from 'react-native'
import Animated,{ useAnimatedStyle } from 'react-native-reanimated'

const {width: PAGE_WIDTH} = Dimensions.get('window')
 
const PageV2 = ({index, title, translateX}) => {

    const pageOffset = PAGE_WIDTH * index

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value + pageOffset }],
        }
    })

  return (
    <Animated.View 
        style={[
            {
                ...StyleSheet.absoluteFillObject, 
                backgroundColor: `rgba(0,0,256,0.${index+2})`,
                justifyContent:'center',
                alignItems:'center'
            }, 
            rStyle
        ]}>
        <Text style={{fontSize:70, fontWeight:'700', textTransform:'uppercase', letterSpacing:1.5}}>{title}</Text>

    </Animated.View>
  )
}

export { PAGE_WIDTH }
export default PageV2

const styles = StyleSheet.create({

})