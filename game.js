import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
    const [numbers, setNumbers] = useState(() => {
        const arr = Array.from({ length: 5 }, (_, i) => i + 1);
        // Fisher-Yates shuffle
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        console.log(arr, "<--")
        return arr; // Initial shuffled array
    });



    const [resultNumbers, setResultNumbers] = useState([1, 2, 3, 4, 5]);
    const currentIndex = useRef(-1);

    const startingPos = -37;
    const endPos = 185;
    // const animations = Array(5)
    //     .fill(null)
    //     .map((_, i) => useRef(new Animated.Value(startingPos * (i + 1))).current);

    const animations = useMemo(() =>
        Array(5)
            .fill(null)
            .map((_, i) => new Animated.Value(startingPos * (i + 1))),
        [startingPos] // Only re-calculate if `startingPos` changes
    );



    const intervalRef = useRef();


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
            intervalRef.current = setInterval(() => {
                animateImage();
            }, 1500);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current); // Ensure cleanup
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

    const openModal = async () => {
        setPlayPause((prev) => require("./assets/pause.png"))
        setIsVisible(true);
        await playSound(require("./assets/touch.mp3"));
        setGameStatus((prevStatus) => (prevStatus === 0 ? 1 : 0));
    }
    const closeModal = async () => {
        setIsVisible(false);
        setPlayPause((prev) => require("./assets/play.png"))
        await playSound(require("./assets/touch.mp3"));
        setGameStatus((prevStatus) => (prevStatus === 0 ? 1 : 0));
    }
    const size = useRef(new Animated.Value(0)).current; // Animated value for size

    const animateImage = () => {
        // getRandomNumber()
        const resultNum = getRandomNumber();
        gameBallRef.current = getImageSource(resultNum);

        // setResultNumbers((prev) => {
        //     // Remove the first number and add the new resultNum at the end
        //     if (prev.length >= 5) {
        //         return [...prev.slice(1), resultNum]; // Remove first element and add new resultNum
        //     } else {
        //         return [...prev, resultNum]; // Add new resultNum without removing
        //     }
        // });

        setResultNumbers(prev => {
            const updatedResult = [...prev];
            updatedResult[currentIndex.current] = resultNum;
            return updatedResult;
        });
        currentIndex.current = (currentIndex.current + 1) % 5;



        size.setValue(0); // Reset the size to 0 before starting the animation
        Animated.timing(size, {
            toValue: 100, // Final size
            duration: 500, // Duration of animation in milliseconds
            useNativeDriver: false, // Animating styles
        }).start();


        animations.forEach((_, i) => animateView(i));


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
    function resetEverything() {
        setNumberData(initialNumberData); // Reset number data to its initial value
        setIsVisible(false);
        setBallNum(0);
        setCR(0);
        setGameStatus(0);
        setNumbers(() => {
            const arr = Array.from({ length: 75 }, (_, i) => i + 1);
            // Fisher-Yates shuffle
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr; // Reset shuffled numbers
        });
        setResultNumbers([1, 2, 3, 4, 5]);
        currentIndex.current = -1;
        // If you have animations, reset their values as well
        animations.forEach((anim, i) => anim.setValue(startingPos * (i + 1)));
    }

    const getRandomNumber = () => {
        if (numbers.length === 0) {
            resetEverything();
            return; // No numbers left
        }
        const randomIndex = Math.floor(Math.random() * numbers.length); // Get a random index
        const randomNumber = numbers[randomIndex]; // Get the number at that index

        // Remove the selected number from the array to avoid repetition
        const newNumbers = [...numbers];
        newNumbers.splice(randomIndex, 1); // Remove the number at randomIndex
        setNumbers(newNumbers); // Update the state with the new array
        setBallNum(prevBallNum => prevBallNum + 1);
        return randomNumber; // Return the random number
    };

    const animateView = (index) => {
        let nextValue = animations[index]._value + 37;

        if (nextValue >= endPos) {
            animations[index].setValue(startingPos); // Reset position
            nextValue = animations[index]._value + 37;
        }

        Animated.timing(animations[index], {
            toValue: nextValue,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };


    const NumberItem = React.memo(({ item }) => (
        <View style={styles.singleNumCon}>
            <Text style={styles.numberText}>{item.num}</Text>
            {renderImageBasedOnState(item)}
        </View>
    ));

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
                                onPress={() => {

                                    resetEverything();

                                }}
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
                            {animations.map((animation, index) => (
                                <View key={index} style={styles.movingResults}>
                                    <Animated.View
                                        style={[
                                            styles.singleResultCon,
                                            { transform: [{ translateX: animation }] },
                                        ]}
                                    >
                                        <Text style={styles.numberText}>{resultNumbers[index]}</Text>
                                        {renderImageBasedOnResult(resultNumbers[index])}
                                    </Animated.View>
                                </View>
                            ))}
                        </View>
                    </View>
                    {/* <View style={[styles.resultCon, styles.commn]}>
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
                    </View> */}
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
                    {/* {numberData.map((item, index) => {
                        return (
                            <View style={styles.singleNumCon} key={index}>
                                <Text style={styles.numberText}>{item.num}</Text>
                                {renderImageBasedOnState(item)}
                            </View>
                        );
                    })} */}

                    {numberData.map((item, index) => (
                        <NumberItem key={index} item={item} />
                    ))}
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
        overflow: 'hidden',
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


