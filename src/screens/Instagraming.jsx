import { useRef, useCallback } from 'react'
import {Text, Image,View, StyleSheet, Dimensions, ImageBackground} from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withDelay, withTiming } from 'react-native-reanimated'

const Instagraming = () => {

    const AnimatedImage = Animated.createAnimatedComponent(Image)
    const scale = useSharedValue(0)
    const opacity = useSharedValue(1)
    const doubleTapRef = useRef({})

    const rTextStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {scale: Math.max(scale.value, 0)}
        ]
    }))

    const onDoubleTap = useCallback(() => {
        scale.value = withSpring(1, undefined, (isFinished) => {
            if (isFinished) {
                scale.value = withDelay(500,withSpring(0))
            }
        })
    },[])

    const onSingleTap = useCallback(() => {
        opacity.value = withTiming(0, undefined, (isFinished) => {
            if (isFinished) {
                opacity.value = withDelay(500,withSpring(1))
            }
        })
    },[])

    return (
        <View style={styles.container}>
            <TapGestureHandler
                waitFor={doubleTapRef}
                onActivated={onSingleTap}
            >
                <TapGestureHandler 
                    ref={doubleTapRef}
                    maxDelayMs={250}
                    numberOfTaps={2}
                    onActivated={onDoubleTap}>
                    <Animated.View>
                        <ImageBackground style={styles.image} source={require('../../assets/image.jpeg')}>
                            <AnimatedImage 
                                style={[styles.image,
                                {
                                    shadowOffset: {width:0, height:20},
                                    shadowOpacity: 0.35,
                                    shadowRadius:35,
                                    // elevation no es una propiedad válida para el componente Image
                                    // debería solucionarse con un contenedor View que tenga los estilos
                                    // de shadow de la imagen
                                    //elevation:8
                                },
                                rStyle,
                                ]} 
                                source={require('../../assets/heart.png')} 
                                resizeMode='center' 
                            />
                        </ImageBackground>
                        <Animated.Text style={[styles.turtles,rTextStyle]}>🐢🐢🐢🐢</Animated.Text>
                    </Animated.View>

                </TapGestureHandler>
            </TapGestureHandler>
        </View>
    )

}

export default Instagraming

const {width:SIZE} = Dimensions.get('window')

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
        width:SIZE,
        height:SIZE
    },
    turtles:{
        fontSize:40,
        textAlign:'center',
        marginTop:30
    }
})