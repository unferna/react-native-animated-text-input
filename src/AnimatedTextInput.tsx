import React from "react"
import { Animated, TextInput, View } from "react-native"
import { type Origin, type AnimatedTextInputProps } from "./typings"

const AnimatedTextInput = ({
    placeholder,
    fontSize,
    animationDuration = 150,
}: AnimatedTextInputProps): JSX.Element => {
    const { useState, useRef } = React

    const [text, setText] = useState("")

    const placeholderContainerTranslationAnim = useRef(
        new Animated.Value(0)
    ).current
    const placeholderTextScaleAnim = useRef(new Animated.Value(1)).current
    const placeholderTextColorAnim = useRef(new Animated.Value(0)).current

    const [placeholderDimensions, setPlaceholderDimensions] = useState({
        width: 0,
        height: 0,
    })

    const focusedPlaceholderAnimation = () => {
        Animated.parallel([
            Animated.timing(placeholderContainerTranslationAnim, {
                toValue: -10,
                duration: animationDuration,
                useNativeDriver: false,
            }),
            Animated.timing(placeholderTextScaleAnim, {
                toValue: 0.75,
                duration: animationDuration,
                useNativeDriver: false,
            }),
            Animated.timing(placeholderTextColorAnim, {
                toValue: 1,
                duration: animationDuration,
                useNativeDriver: false,
            }),
        ]).start()
    }

    const blurredPlaceholderAnimation = () => {
        if (text !== "") return

        Animated.parallel([
            Animated.timing(placeholderContainerTranslationAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false,
            }),
            Animated.timing(placeholderTextScaleAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: false,
            }),
            Animated.timing(placeholderTextColorAnim, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: false,
            }),
        ]).start()
    }

    const anchorPoint: Origin = { x: 0, y: 0 }
    const originalCenterPoint: Origin = {
        x: placeholderDimensions.width / 2,
        y: 0,
    }

    return (
        <View
            style={{
                alignItems: "flex-start",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 4,
                minHeight: 66,
            }}
        >
            <TextInput
                style={{
                    flex: 1,
                    fontSize: 16,
                    marginTop: 12,
                    padding: 12,
                    width: "100%",
                }}
                onFocus={focusedPlaceholderAnimation}
                onBlur={blurredPlaceholderAnimation}
                onChangeText={setText}
            />

            <Animated.View
                style={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    position: "absolute",
                    left: 12,
                    transform: [
                        { translateY: placeholderContainerTranslationAnim },
                    ],
                }}
                pointerEvents="none"
            >
                <Animated.Text
                    accessible={false}
                    onLayout={({ nativeEvent: { layout } }) => {
                        setPlaceholderDimensions(layout)
                    }}
                    style={{
                        alignSelf: "flex-start",
                        color: placeholderTextColorAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["#000", "#666"],
                        }),
                        fontSize,
                        transform: [
                            {
                                translateX:
                                    anchorPoint.x - originalCenterPoint.x,
                            },
                            {
                                translateY:
                                    anchorPoint.y - originalCenterPoint.y,
                            },
                            { scale: placeholderTextScaleAnim },
                            {
                                translateX: -(
                                    anchorPoint.x - originalCenterPoint.x
                                ),
                            },
                            {
                                translateY: -(
                                    anchorPoint.y - originalCenterPoint.y
                                ),
                            },
                        ],
                    }}
                >
                    {placeholder}
                </Animated.Text>
            </Animated.View>
        </View>
    )
}

export default AnimatedTextInput
