import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';



const initialNumberData = [
    { num: 1, cat: 0, on: 0 },
    { num: 16, cat: 1, on: 0 },
    { num: 31, cat: 2, on: 0 },
    { num: 46, cat: 3, on: 0 },
    { num: 61, cat: 4, on: 0 },
    { num: 2, cat: 0, on: 0 },
    { num: 17, cat: 1, on: 0 },
    { num: 32, cat: 2, on: 0 },
    { num: 47, cat: 3, on: 0 },
    { num: 62, cat: 4, on: 0 },
    { num: 3, cat: 0, on: 0 },
    { num: 18, cat: 1, on: 0 },
    { num: 33, cat: 2, on: 0 },
    { num: 48, cat: 3, on: 0 },
    { num: 63, cat: 4, on: 0 },
    { num: 4, cat: 0, on: 0 },
    { num: 19, cat: 1, on: 0 },
    { num: 34, cat: 2, on: 0 },
    { num: 49, cat: 3, on: 0 },
    { num: 64, cat: 4, on: 0 },
    { num: 5, cat: 0, on: 0 },
    { num: 20, cat: 1, on: 0 },
    { num: 35, cat: 2, on: 0 },
    { num: 50, cat: 3, on: 0 },
    { num: 65, cat: 4, on: 0 },
    { num: 6, cat: 0, on: 0 },
    { num: 21, cat: 1, on: 0 },
    { num: 36, cat: 2, on: 0 },
    { num: 51, cat: 3, on: 0 },
    { num: 66, cat: 4, on: 0 },
    { num: 7, cat: 0, on: 0 },
    { num: 22, cat: 1, on: 0 },
    { num: 37, cat: 2, on: 0 },
    { num: 52, cat: 3, on: 0 },
    { num: 67, cat: 4, on: 0 },
    { num: 8, cat: 0, on: 0 },
    { num: 23, cat: 1, on: 0 },
    { num: 38, cat: 2, on: 0 },
    { num: 53, cat: 3, on: 0 },
    { num: 68, cat: 4, on: 0 },
    { num: 9, cat: 0, on: 0 },
    { num: 24, cat: 1, on: 0 },
    { num: 39, cat: 2, on: 0 },
    { num: 54, cat: 3, on: 0 },
    { num: 69, cat: 4, on: 0 },
    { num: 10, cat: 0, on: 0 },
    { num: 25, cat: 1, on: 0 },
    { num: 40, cat: 2, on: 0 },
    { num: 55, cat: 3, on: 0 },
    { num: 70, cat: 4, on: 0 },
    { num: 11, cat: 0, on: 0 },
    { num: 26, cat: 1, on: 0 },
    { num: 41, cat: 2, on: 0 },
    { num: 56, cat: 3, on: 0 },
    { num: 71, cat: 4, on: 0 },
    { num: 12, cat: 0, on: 0 },
    { num: 27, cat: 1, on: 0 },
    { num: 42, cat: 2, on: 0 },
    { num: 57, cat: 3, on: 0 },
    { num: 72, cat: 4, on: 0 },
    { num: 13, cat: 0, on: 0 },
    { num: 28, cat: 1, on: 0 },
    { num: 43, cat: 2, on: 0 },
    { num: 58, cat: 3, on: 0 },
    { num: 73, cat: 4, on: 0 },
    { num: 14, cat: 0, on: 0 },
    { num: 29, cat: 1, on: 0 },
    { num: 44, cat: 2, on: 0 },
    { num: 59, cat: 3, on: 0 },
    { num: 74, cat: 4, on: 0 },
    { num: 15, cat: 0, on: 0 },
    { num: 30, cat: 1, on: 0 },
    { num: 45, cat: 2, on: 0 },
    { num: 60, cat: 3, on: 0 },
    { num: 75, cat: 4, on: 0 },
];

export default function Game() {
    const [numberData, setNumberData] = useState(initialNumberData);
    const [playPause, setPlayPause] = useState(require("./assets/pause.png"));
    const [stopImg, setStopImg] = useState(require("./assets/stop.png"));
    const gameBallRef = useRef(require('./assets/r_y.png'));
    const [isVisible, setIsVisible] = useState(false);
    const [ballNum, setBallNum] = useState(0);
    const [CR, setCR] = useState(75);

    const [gameStatus, setGameStatus] = useState(0);
    const [numbers, setNumbers] = useState(Array.from({ length: 75 }, (_, i) => i + 1));
    const [resultNumbers, setResultNumbers] = useState([1, 2, 3, 4, 5]);

    const view1StartingPos = -37;
    const view2StartingPos = -37 * 2;
    const view3StartingPos = -37 * 3;
    const view4StartingPos = -37 * 4;
    const view5StartingPos = -37 * 5;
    const view1EndPos = 185;
    const view2EndPos = 185;
    const view3EndPos = 185;
    const view4EndPos = 185;
    const view5EndPos = 185;

    // Individual animated values for each view
    const view1Animation = useRef(new Animated.Value(view1StartingPos)).current;
    const view2Animation = useRef(new Animated.Value(view2StartingPos)).current;
    const view3Animation = useRef(new Animated.Value(view3StartingPos)).current;
    const view4Animation = useRef(new Animated.Value(view4StartingPos)).current;
    const view5Animation = useRef(new Animated.Value(view5StartingPos)).current;





    let interval;


    const playSound = async (soundUri) => {
        const { sound } = await Audio.Sound.createAsync(
            soundUri
        );
        await sound.playAsync();
    };

    const togglePlayPause = async () => {
        if (playPause === require("./assets/pause.png")) {
            setPlayPause((prev) => require("./assets/play.png"))
        } else {
            setPlayPause((prev) => require("./assets/pause.png"))
        }

        await playSound(require("./assets/touch.mp3"));
        setGameStatus((prevStatus) => (prevStatus === 0 ? 1 : 0));

    };

    useEffect(() => {
        if (gameStatus === 1) {
            interval = setInterval(() => {
                animateImage(); // Trigger animation every 2 seconds
            }, 1500);

            // Clear the interval when the component unmounts
            return () => clearInterval(interval);
        } else {
            clearInterval(interval);
        }
    }, [gameStatus]);

    const handleStop = () => {

    };


    const renderImageBasedOnState = (item) => {
        let imageSource;
        switch (item.cat) {
            case 0:
                imageSource = require("./assets/gb.png");
                break;
            case 1:
                imageSource = require("./assets/gr.png");
                break;
            case 2:
                imageSource = require("./assets/ggr.png"); // Add the path for the third image
                break;
            case 3:
                imageSource = require("./assets/gg.png"); // Add the path for the fourth image
                break;
            default:
                imageSource = require("./assets/gy.png");
        }
        return <Image source={imageSource} style={styles.singleNumImg} />
    };


    const renderImageBasedOnResult = (item) => {
        let imageSource;

        if (item < 16) {
            imageSource = require("./assets/gb.png");
        } else if (item < 31) {
            imageSource = require("./assets/gr.png");
        }
        else if (item < 46) {
            imageSource = require("./assets/ggr.png");
        }
        else if (item < 61) {
            imageSource = require("./assets/gg.png");
        }
        else {
            imageSource = require("./assets/gy.png");


        }
        return <Image source={imageSource} style={styles.singleResultImg} />
    };

    const openModal = () => setIsVisible(true);
    const closeModal = () => setIsVisible(false);
    const size = useRef(new Animated.Value(0)).current; // Animated value for size

    const animateImage = () => {
        // getRandomNumber()
        const resultNum = getRandomNumber();
        gameBallRef.current = getImageSource(resultNum);
        // setResultNumbers((prev) => [...prev, resultNum]);




        size.setValue(0); // Reset the size to 0 before starting the animation
        Animated.timing(size, {
            toValue: 100, // Final size
            duration: 500, // Duration of animation in milliseconds
            useNativeDriver: false, // Animating styles
        }).start();


        animateView1();
        animateView2();
        animateView3();
        animateView4();
        animateView5();
        setCR(resultNum);

    };


    const getImageSource = (num) => {
        switch (true) {
            case num < 16:
                return require('./assets/r_b.png');
            case num < 31:
                return require('./assets/r_r.png');
            case num < 46:
                return require('./assets/r_gr.png');
            case num < 61:
                return require('./assets/r_g.png');
            default:
                return require('./assets/r_y.png');
        }
    };

    const getRandomNumber = () => {
        if (numbers.length === 0) {
            return null; // No numbers left
        }
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const randomNumber = numbers[randomIndex];
        setNumbers((prev) => prev.filter((_, index) => index !== randomIndex));
        return randomNumber;
    };




    const animateView1 = () => {
        let nextValue = view1Animation._value + 37;

        if (nextValue >= view1EndPos) {
            // Reset to starting position
            view1Animation.setValue(view1StartingPos);
            nextValue = view1Animation._value + 37;
            Animated.timing(view1Animation, {
                toValue: nextValue,
                duration: 500,
                useNativeDriver: true,
            }).start()
        } else {
            Animated.timing(view1Animation, {
                toValue: nextValue,
                duration: 500,
                useNativeDriver: true,
            }).start()
        }
    };

    const animateView2 = () => {
        let nextValue = view2Animation._value + 37;

        if (nextValue >= view2EndPos) {
            // Reset to starting position
            view2Animation.setValue(view2StartingPos + 37);
            nextValue = view2Animation._value + 37;
            Animated.timing(view2Animation, {
                toValue: nextValue,
                duration: 500,
                useNativeDriver: true,
            }).start()
        } else {
            Animated.timing(view2Animation, {
                toValue: nextValue,
                duration: 500,
                useNativeDriver: true,
            }).start()
        }
    };
    const animateView3 = () => {
        let nextValue = view3Animation._value + 37;

        if (nextValue >= view3EndPos) {
            // Reset to starting position
            view3Animation.setValue(view2StartingPos + 37);
            nextValue = view3Animation._value + 37;
            Animated.timing(view3Animation, {
                toValue: nextValue,
                duration: 500,
                useNativeDriver: true,
            }).start()


        } else {
            Animated.timing(view3Animation, {
                toValue: nextValue,
                duration: 500,
                useNativeDriver: true,
            }).start()
        }
    };
    const animateView4 = () => {
        let nextValue = view4Animation._value + 37;

        if (nextValue >= view4EndPos) {
            // Reset to starting position
            view4Animation.setValue(view2StartingPos + 37);
            nextValue = view4Animation._value + 37;

            Animated.timing(view4Animation, {
                toValue: nextValue,
                duration: 500,
                useNativeDriver: true,
            }).start()

        } else {
            Animated.timing(view4Animation, {
                toValue: nextValue,
                duration: 500,
                useNativeDriver: true,
            }).start()
        }
    };
    const animateView5 = () => {
        let nextValue = view5Animation._value + 37;

        if (nextValue >= view5EndPos) {
            // Reset to starting position
            view5Animation.setValue(view2StartingPos + 37);
            nextValue = view5Animation._value + 37;
            Animated.timing(view5Animation, {
                toValue: nextValue,
                duration: 500,
                useNativeDriver: true,
            }).start()
        } else {
            Animated.timing(view5Animation, {
                toValue: nextValue,
                duration: 500,
                useNativeDriver: true,
            }).start()
        }
    };



    return (
        <View style={styles.container}>

            <Modal
                visible={isVisible}
                animationType="none"
                transparent={true}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContent}>
                        {/* Dialog Title */}
                        <Text style={styles.modalTitle}>End game?</Text>

                        {/* Buttons */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.customButton, { backgroundColor: "#00A200" }]}
                                onPress={() => alert("Action 1")}
                            >
                                <Text style={styles.buttonText}>Yes</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={closeModal}
                            >
                                <Text style={styles.buttonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            <StatusBar hidden={true} />
            <View style={styles.sectionOne}>
                <View style={styles.secOne}>
                    <View style={[styles.animationCon, styles.commn]}>
                        <View style={styles.animCon}>
                            <View style={styles.gameBall}>

                                <Animated.Text
                                    style={[
                                        styles.crText,
                                        {
                                            fontSize: size.interpolate({
                                                inputRange: [0, 70], // Range of `size`
                                                outputRange: [1, 25], // Desired font size range
                                            }),
                                        },
                                    ]}
                                >
                                    {CR}
                                </Animated.Text>

                                <Animated.Image
                                    key={CR}
                                    source={gameBallRef.current}
                                    style={[
                                        styles.gameBallImgg,
                                        {
                                            width: size,
                                            height: size,
                                        },
                                    ]}
                                />
                            </View>

                            <Text style={styles.outOfText}>BALL: {ballNum} / 75</Text>
                        </View>
                    </View>
                    <View style={[styles.resultCon, styles.commn]}>
                        <View style={styles.resultConCon}>
                            <View style={[styles.movingResults,]}>
                                <Animated.View
                                    style={[
                                        styles.singleResultCon,
                                        { transform: [{ translateX: view1Animation }] },
                                    ]}
                                >
                                    <Text style={styles.numberText}>{resultNumbers[0]}</Text>
                                    {renderImageBasedOnResult(resultNumbers[0])}
                                </Animated.View>
                            </View>
                            <View style={[styles.movingResults,]}>
                                <Animated.View
                                    style={[
                                        styles.singleResultCon,
                                        { transform: [{ translateX: view2Animation }] },
                                    ]}
                                >
                                    <Text style={styles.numberText}>{resultNumbers[1]}</Text>
                                    {renderImageBasedOnResult(resultNumbers[1])}
                                </Animated.View>
                            </View>

                            <View style={[styles.movingResults,]}>
                                <Animated.View
                                    style={[
                                        styles.singleResultCon,
                                        { transform: [{ translateX: view3Animation }] },
                                    ]}
                                >
                                    <Text style={styles.numberText}>{resultNumbers[2]}</Text>
                                    {renderImageBasedOnResult(resultNumbers[2])}
                                </Animated.View>
                            </View>
                            <View style={[styles.movingResults,]}>
                                <Animated.View
                                    style={[
                                        styles.singleResultCon,
                                        { transform: [{ translateX: view4Animation }] },
                                    ]}
                                >
                                    <Text style={styles.numberText}>{resultNumbers[3]}</Text>
                                    {renderImageBasedOnResult(resultNumbers[3])}
                                </Animated.View>
                            </View>
                            <View style={[styles.movingResults,]}>
                                <Animated.View
                                    style={[
                                        styles.singleResultCon,
                                        { transform: [{ translateX: view5Animation }] },
                                    ]}
                                >
                                    <Text style={styles.numberText}>{resultNumbers[4]}</Text>
                                    {renderImageBasedOnResult(resultNumbers[4])}
                                </Animated.View>
                            </View>


                        </View>
                    </View>
                    <View style={[styles.playPauseCon, styles.commn]}>

                        <TouchableOpacity style={styles.pausePlayBtn} onPress={togglePlayPause}>
                            <Image source={playPause} style={styles.playPauseImg} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.pausePlayBtn} onPress={openModal}>
                            <Image source={stopImg} style={styles.playPauseImg} />
                        </TouchableOpacity>


                    </View>

                </View>
                <View style={styles.secTwo}>
                    <View style={styles.patternCon}>

                    </View>

                    <View style={styles.bingoCon}>

                    </View>

                </View>

            </View>
            <View style={styles.sectionTwo}>
                <View style={styles.bingoTextCon}>

                    <View style={styles.singleBingoLetterCon}>
                        <Image source={require("./assets/rb.png")} style={styles.singleLetterImg} />
                        <Text style={[styles.bingoTextB, styles.bingoText]}>B</Text>
                    </View>
                    <View style={styles.singleBingoLetterCon}>
                        <Image source={require("./assets/rr.png")} style={styles.singleLetterImg} />
                        <Text style={[styles.bingoTextI, styles.bingoText]}>I</Text>
                    </View>
                    <View style={styles.singleBingoLetterCon}>
                        <Image source={require("./assets/rgr.png")} style={styles.singleLetterImg} />
                        <Text style={[styles.bingoTextN, styles.bingoText]}>N</Text>
                    </View>
                    <View style={styles.singleBingoLetterCon}>
                        <Image source={require("./assets/rg.png")} style={styles.singleLetterImg} />
                        <Text style={[styles.bingoTextB, styles.bingoText]}>G</Text>
                    </View>
                    <View style={styles.singleBingoLetterCon}>
                        <Image source={require("./assets/ry.png")} style={styles.singleLetterImg} />
                        <Text style={[styles.bingoTextB, styles.bingoText]}>O</Text>
                    </View>

                </View>
                <View style={styles.numbersGridCon}>
                    {numberData.map((item, index) => {
                        return (
                            <View style={styles.singleNumCon} key={index}>
                                <Text style={styles.numberText}>{item.num}</Text>
                                {renderImageBasedOnState(item)}
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEA7D',
        flexDirection: 'row',
        borderWidth: 10,
        borderColor: "#A20000",
        overflow: "hidden",
    },
    sectionOne: {
        flex: 1,
        backgroundColor: 'green',
    },
    sectionTwo: {
        flex: 1,
        // backgroundColor: 'black',
    },

    bingoTextCon: {
        // flex: 0.2,
        flexDirection: "row",
        gap: 1,
        height: 35,
        padding: 2,
        paddingBottom: 0,
    },
    numbersGridCon: {
        marginTop: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',  // Allow wrapping to new rows
        justifyContent: 'space-between',
        height: '100%', // Occupy full available height
        alignItems: 'flex-start',  // Align items to the top

        backgroundColor: "#E3BE4C",
        borderWidth: 5,
        borderColor: "#896C05",
        position: "relative"

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%', // Ensure each row takes full width
    },
    singleNumCon: {
        width: '20%', // 5 columns means each item takes 20% width
        height: 44, // Fixed height
        justifyContent: 'center',
        alignItems: 'center',
    },
    singleNumImg: {
        width: 28, // Adjust image size
        height: 28, // Fixed height for the image
    },
    numberText: {
        zIndex: 2,
        position: 'absolute',
        fontSize: 14,
        fontWeight: "700",
        top: 11,
    },
    singleBingoLetterCon: {
        flex: 0.4,
        height: "100%",
        width: 10,
        position: "relative"
    },
    singleLetterImg: {
        width: "auto",
        height: "100%"
    },
    bingoText: {
        position: "absolute",
        fontSize: 25,
        fontWeight: "700",
    },
    bingoTextB: {
        left: 8,
        color: "white"
    },
    bingoTextI: {
        color: "white",
        left: 12.7,
    },
    bingoTextN: {
        color: "gray",
        left: 8,
    },

    // ------------------ first sec part
    secOne: {
        flex: 1,
        height: "100%",
        backgroundColor: "#FFEA7D",
        gap: 5,
    },
    secTwo: {
        flex: 1,
        height: "100%",
        backgroundColor: "#FFEA7D",
        gap: 5,
    },

    animationCon: {
        width: "100%",
        flex: 2,
        // backgroundColor: "lightblue",
        position: 'relative'
    },
    resultCon: {
        width: "100%",
        flex: 1,
        // backgroundColor: "lightblue"
    },
    playPauseCon: {
        width: "100%",
        flex: 1.5,
        // backgroundColor: "lightblue",
        gap: 10,
        flexDirection: "row",
        paddingHorizontal: 5,
    },


    pausePlayBtn: {
        flex: 1,
        backgroundColor: "#A00000",
        height: "65%",
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 5,
    },
    stopBtn: {
        flex: 1,
        backgroundColor: "#A00000",
        height: "65%",
        borderRadius: 5,
    },
    playPauseImg: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },


    // ------------------ modal related

    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent backdrop
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#FFEB98",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 5,
        borderColor: "#E1BF58"
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#8C0000",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    customButton: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    closeButton: {
        flex: 1,
        backgroundColor: "#BA0100",
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    animCon: {
        position: 'absolute',
        right: 0,
        width: "100%",
    },
    gameBall: {
        position: 'relative',
        // backgroundColor: "green",
        height: 100,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameBallImgg: {
        // width: 120,
        // height: 120,
        position: 'absolute',
        zIndex: 0,

    },
    outOfText: {
        fontSize: 15,
        fontWeight: "900",
        letterSpacing: 0.7,
        // red color
        color: "#A00000",
        textAlign: 'center',
        marginTop: 8,
    },
    crText: {
        fontSize: 25,
        color: "black",
        fontWeight: 'heavy',
        zIndex: 2,
        marginBottom: 4,
        marginRight: 2
    },

    // result
    resultConCon: {
        margin: 'auto',
        maxWidth: "100%",
        width: "90%",
        height: "60%",
        borderRadius: 5,
        backgroundColor: "#A00000",
        // overflow: 'hidden',
        // alignItems: 'center'
        position: 'relative',

    },
    movingResults: {
        position: 'absolute',
        // left: "0%",
        height: "90%",
        maxWidth: "100%",
        // backgroundColor: "blue",
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
        gap: 1

    },
    singleResultCon: {
        width: 37,
        height: 37,
        // backgroundColor: "green",

        justifyContent: 'center',
        alignItems: 'center'
    },
    singleResultImg: {
        width: 30,
        height: 30,
    },


    // secTwo Details
    patternCon: {
        flex: 1,
        backgroundColor: "#A00000",
        marginHorizontal: 5,
        borderRadius: 5,
    },

    bingoCon: {
        flex: 0.5,
        backgroundColor: "#E3BE4C",
        marginHorizontal: 5,
        borderRadius: 5,
    }

});


