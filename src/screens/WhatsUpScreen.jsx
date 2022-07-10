import { StyleSheet } from "react-native"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import Page from "../components/Page"

const WORDS = ["What's",'up','mobile','devs?']

const WhatsUpScreen = () => {

    const translateX = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x
    })

    return (
        <Animated.ScrollView 
            pagingEnabled
            horizontal 
            onScroll={scrollHandler} 
            style={styles.container}
            scrollEventThrottle={16}
        >
            {WORDS.map((title,index) => {
                return <Page key={index.toString()} title={title} index={index} translateX={translateX}/>
            })}
        </Animated.ScrollView>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,

    }
})

export default WhatsUpScreen