import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import CoverFlow from 'react-native-coverflow';
import Slider from '@react-native-community/slider';
import Circular from "./components/circularCarosual";
import CustomCard from "./components/CustomCard";
const CARDS = {
    '1C': { imageSource: require('./images/images.jpeg'), text: 'Card 1' },
    '1S': { imageSource: require('./images/images1.jpeg'), text: 'Card 2' },
    '3S': { imageSource: require('./images/images2.jpeg'), text: 'Card 3' },
    '8H': { imageSource: require('./images/images3.jpeg'), text: 'Card 4' },
    '9C': { imageSource: require('./images/images4.jpeg'), text: 'Card 5' },
    'JH': { imageSource: require('./images/images1.jpeg'), text: 'Card 6' },
    'KH': { imageSource: require('./images/images6.jpeg'), text: 'Card 7' },
    'QS': { imageSource: require('./images/images8.jpeg'), text: 'Card 8' },
    'TS': { imageSource: require('./images/images3.jpeg'), text: 'Card 9' },
};

export default class CoverFlowDemo extends Component {
    constructor(props) {
        super(props);

        const values = {
            spacing: 80,
            wingSpan: 10,
            rotation: 50,
            midRotation: 150,
            scaleDown: 0.8,
            scaleFurther: 0.75,
            perspective: 800,
            cards: 11,
            deceleration: 0.100
        };

        this.V = ({ name, caption, min, max, step, value }) => (
            <View style={{ flex: 1 }}>
                <Text>{caption}:{value}</Text>
                <Slider
                    minimumValue={min}
                    maximumValue={max}
                    step={step}
                    value={value}
                    onValueChange={v => this.setState({ [name]: v })}
                />
            </View>
        );

        this.state = values;
    }

    onChange = (item) => {
        console.log(`'Current Item', ${item}`);
    }

    onPress = (item) => {
        Alert.alert(`Pressed on current item ${item}`);
    }

    getCards(count) {
        const res = [];
        const keys = Object.keys(CARDS);
        for (let i = 0; i < count && i < keys.length; i += 1) {
            const card = keys[i];
            console.log('Rendering Card', card, i);
            res.push(
                <View key={card} style={styles.cardContainer}>
                    <Image
                        source={CARDS[card].imageSource}
                        resizeMode="contain"
                        style={{
                            width: 230
                        }}
                    />
                </View>
            );
        }
        return res;
    }

    render() {
        const { spacing, wingSpan, rotation, perspective, scaleDown, scaleFurther, midRotation, cards, deceleration } = this.state;

        return (
            <View style={styles.container}>
                <CoverFlow
                    style={styles.coverFlowContainer}
                    onChange={this.onChange}
                    onPress={this.onPress}
                    spacing={spacing}
                    wingSpan={wingSpan}
                    rotation={rotation}
                    midRotation={midRotation}
                    scaleDown={scaleDown}
                    scaleFurther={scaleFurther}
                    perspective={perspective}
                    initialSelection={4}
                    deceleration={deceleration}
                >
                    {this.getCards(cards)}
                </CoverFlow>
                <View style={{ marginTop: 200 }}>
                    <View>
                        <Text style={styles.textStyle}>Pravin, What's on your mind?</Text>
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <Circular />
                    </View>

                </View>
                <View style={{ marginTop: 50 }}>
                    <View style={styles.menuContainer}>
                        <View style={styles.menuItemHeader}>
                            <Text style={styles.menuItemHeaderText}>Check your KYC!</Text>
                            <Text style={styles.subTilteText}>And start investing today</Text>
                            <View style={styles.menuItemHeader1}>
                                <Text style={styles.mutualText}>Mutual funds versus the rest</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.comparisionText}>Returns comparision</Text>
                                    <Text style={styles.comparisionText}>3 yr annualised returns</Text>
                                </View>
                                <View style={styles.menuItemHeader2}>
                                    <Text style={styles.TurboText}>Turbo Charger</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    coverFlowContainer: {
        paddingHorizontal: 50
    },
    cardContainer: {
        alignItems: 'center',
        marginHorizontal: 40,
        // height: '90%',
    },
    textStyle: {
        fontSize: 24,
        color: '#000',
        marginLeft: 20,
        fontWeight: 'bold',
    },
    menuContainer: {
        borderRadius: 10,
        margin: 10,
        marginTop: 2,
        backgroundColor: 'white',
    },
    menuItemHeader: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderWidth: 0.5
    },
    menuItemHeader1: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        //padding: 80,
        borderWidth: 0.5,
        paddingBottom: 30
        //marginHorizontal: -10
    },
    menuItemHeader2: {
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 0.7,
        marginHorizontal: 30,
        height: 80
        //marginHorizontal: -10
    },
    menuItemHeaderText: {
        marginTop: 5,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#97f19e',
        paddingHorizontal: 12,
    },
    menuItemBody: {
        backgroundColor: 'yellow',
        borderWidth: 1,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: 'gray',
        borderTopWidth: 0,
        alignSelf: 'stretch',
        padding: 10,
    },
    subTilteText: {
        fontSize: 15,
        color: '#000',
        padding: 12
    },
    mutualText: {
        fontSize: 18,
        color: '#000',
        padding: 12,
        fontWeight: 'bold'
    },
    comparisionText: {
        fontSize: 12,
        color: '#000',
        padding: 12
    },
    TurboText: {
        fontSize: 18,
        color: '#000',
        padding: 12,
        fontWeight: 'bold',
    }
});
