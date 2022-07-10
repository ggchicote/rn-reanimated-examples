import { Image, View, Text, StyleSheet, Dimensions } from "react-native"
import { PinchGestureHandler } from "react-native-gesture-handler"
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

const imageUri =
    'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'

// crea un componente animado
const AnimatedImage = Animated.createAnimatedComponent(Image)

const { width, height} = Dimensions.get('window')

const ZoomMattersScreen = () => {

    const scale = useSharedValue(1)
    const focalX = useSharedValue(0)
    const focalY = useSharedValue(0)

    const pinchHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            scale.value = event.scale
            focalX.value = event.focalX
            focalY.value = event.focalY
        },
        onEnd: () => {
            // scale.value = withSping(1)
            scale.value = withTiming(1)
        }
    })

    const rStyle = useAnimatedStyle(()=>{
        return {
            transform: [
                {translateX:focalX.value},
                {translateY:focalY.value},
                {translateX:-width /2},
                {translateY:-height /2},
                {scale: scale.value},
                {translateX: -focalX.value},
                {translateY: -focalY.value},
                {translateX: width /2},
                {translateY: height /2},                
            ]
        }
    }) 

    const rFocalPoint = useAnimatedStyle(() => {
        return {
            transform: [{translateX:focalX.value},{translateY:focalY.value}]
        }
    })

    return (
        <PinchGestureHandler onGestureEvent={pinchHandler}>
            <Animated.View style={{flex:1}}>
                <AnimatedImage style={[{flex:1}, rStyle]} source={{uri:imageUri}} />
                <Animated.View style={[styles.focalPoint,rFocalPoint]} />
            </Animated.View>
        </PinchGestureHandler>

    )

}


export default ZoomMattersScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    focalPoint: {
        ...StyleSheet.absoluteFillObject,
        width:20,
        height:20,
        backgroundColor:'transparent',
        borderRadius:10
    }
})