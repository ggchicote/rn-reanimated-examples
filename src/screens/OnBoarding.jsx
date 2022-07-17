import { View, StyleSheet } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { cancelAnimation, useAnimatedGestureHandler, useDerivedValue, useSharedValue, withDecay } from 'react-native-reanimated'
import Page, { PAGE_WIDTH } from '../components/PageV2'

const titles = ["What's", 'up', 'mobile', 'devs?']
const MAX_TRANSLATE_X = - PAGE_WIDTH * (titles.length - 1)

const OnBoarding = () => {

    const translateX = useSharedValue(0)
    const clampedTranslateX = useDerivedValue(() => {
        return Math.max(Math.min(translateX.value, 0),MAX_TRANSLATE_X)
    })

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (_,context) => {
            context.translateX = clampedTranslateX.value
            cancelAnimation(translateX)
        },
        onActive: (event,context) => {
            translateX.value = event.translationX + context.translateX
        },
        onEnd: (event) => {
            // para frenar con efecto de desaceleración
            translateX.value = withDecay({velocity: event.velocityX})
        }
    })

    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={{flex:1, flexDirection:'row'}}>
                    {titles.map((title,index) => {
                        return (
                            <Page 
                                key={index} 
                                title={title} 
                                index={index} 
                                translateX={clampedTranslateX}
                            />
                        )
                    })}
                </Animated.View>
            </PanGestureHandler>
        </View>
    )

}

export default OnBoarding

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
})