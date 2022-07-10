import { useEffect } from "react"
import { View, StyleSheet } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring,withRepeat } from "react-native-reanimated"

const SIZE = 100.0



const Opacity = () => {

    const progress = useSharedValue(1)
    const scale = useSharedValue(2)

    const handleRotation = (progress) => {
        // 'worklet' indica que esta función se debe ejecutar en el UI Thread
        // en caso de usar la instrucción 'worklet' intentará ejecutarse en el JS Thread
        // dando error ya que fue invocada dentro del hook useAnimatedStyle que se ejecuta en el UI Thread
        'worklet';
        return `${progress.value * 2 * Math.PI}rad`
    }

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            borderRadius: (progress.value * SIZE) / 2,
            transform: [
                {scale:scale.value},
                {rotate:handleRotation(progress)}
            ]
        }
    }, [])

    useEffect(() => {
        //progress.value = withRepeat(withSpring(0.5, {duration:5000}),3,true)
        //progress.value = withTiming(0.5, {duration:5000})
        //scale.value = withRepeat(withSpring(1, {duration:5000}),3,true)
        //scale.value = withTiming(2, {duration:5000})

        // -1 repite infinitamente
        progress.value = withRepeat(withSpring(0.5),-1,true)
        scale.value = withRepeat(withSpring(1),-1,true)

    },[])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box,reanimatedStyle]} />
        </View>
    )
}

export default Opacity

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    box:{
        backgroundColor:'blue',
        height:SIZE,
        width:SIZE
    }
})