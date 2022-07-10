import { useState } from "react"
import { StyleSheet, View, Switch, Dimensions, Text } from "react-native"
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated"

const Colors = {
    dark:{
        background:"#1E1E1E",
        circle:'#252525',
        text:'#F8F8F8'
    },    
    light:{
        background:'#F8F8F8',
        circle:'#FFF',
        text:'#1E1E1E'
    }
}

const SWITCH_TRACK_COLOR = {
    true:'rbga(256,0,256,0.2)',
    false:'rgba(0,0,0,0.1)'
}

const SIZE = Dimensions.get('window').width * 0.7

const ThemeAnimationScreen = () => {

    const [theme, setTheme] = useState('light')

    // const progress = useSharedValue(0)
    const progress = useDerivedValue(() => {
        return theme === 'dark' ? withTiming(1) : withTiming(0) 
    }, [theme])

    const rStyle = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.light.background, Colors.dark.background]    
        )

        return {backgroundColor}
    })


    const rCircle = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.light.circle, Colors.dark.circle]    
        )

        return {backgroundColor}

    })

    const rText = useAnimatedStyle(() => {

        const color = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.light.text, Colors.dark.text]    
        )

        return {color}

    })    

    return (
        <Animated.View style={[styles.container,rStyle]}>
            <Animated.Text style={[styles.text,rText]}>Theme</Animated.Text>
            <Animated.View style={[styles.circle,rCircle]}>
                <Switch 
                    value={theme === 'dark'}
                    onValueChange={(toggled) => {
                        setTheme(toggled ? 'dark' : 'light')
                    }}
                    trackColor={SWITCH_TRACK_COLOR}
                    thumbColor='violet'
                />
            </Animated.View>
        </Animated.View>
    )

}

export default ThemeAnimationScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    circle: {
        width: SIZE,
        height: SIZE,
        backgroundColor:'#FFF',
        borderRadius: SIZE / 2,
        justifyContent:'center',
        alignItems:'center',
        shadowOffset:{
            width:0,
            height:20,
        },
        shadowOpacity:0.1,
        shadowRadius:10,  
        // elevation es la propiedad que reemplaza a shadow<> en android
        elevation:8,
    },
    text: {
        marginBottom:35,
        letterSpacing:14,
        fontSize:70,
        fontWeight:'600',
        textTransform:'uppercase'
    }
})