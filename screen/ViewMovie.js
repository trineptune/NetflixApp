import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import { Video, Audio } from 'expo-av';
import { Feather, Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";
//redux
import { useDispatch, useSelector } from 'react-redux';
const Container = styled.ScrollView`
	flex: 1;
	background-color: #000;
`

const HeaderIcons = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const Title = styled.Text`
    color: white;
    font-size: 24px;
    margin: 10px;
    font-family: "Montserrat_700Bold"
`

const MovieBadge = styled.Text`
    color: #a2a2a2;
    background-color: #373737;
    padding: 2px;
    border-radius: 5px;
    width: 38px;
    text-align: center;
    margin: 15px;
`

const Subtitle = styled.Text`
    color: #a2a2a2;
    margin: 5px;
`

const MovieSubDetails = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: -17px;
`

const Play = styled.TouchableOpacity`
	flex-direction: row;
	background-color: #fff;
	width: 95%;
	height: 32px;
	border-radius: 2px;
	align-items: center;
    justify-content: center;
    margin: 10px;
`

const TextButtonPlay = styled.Text`
	font-size: 15px;
	font-weight: bold;
	padding-left: 5px;
`

const Download = styled.TouchableOpacity`
	flex-direction: row;
	background-color: #262626;
	width: 95%;
	height: 32px;
	border-radius: 2px;
	align-items: center;
	justify-content: center;
`

const TextButtonDownload = styled.Text`
	font-size: 15px;
    font-weight: 700;
    color: white;
    padding-left: 5px;
`

const ActionButtons = styled.View`
    flex-direction: column;
    width: 100%;
    align-items: center;
`

const MovieDescription = styled.Text`
    color: white;
    width: 98%;
    margin-left: 10px;
    margin: 10px;
    font-weight: 100;
    font-family: "Montserrat_300Light";
    line-height: 20px;
    margin-top: 25px;
`

const Tag = styled.Text`
    color: #fff;
    font-family: "Montserrat_400Regular";
`

const TagDot = styled.View`
    margin: 10px;
    background-color: white;
    height: 2px;
    width: 2px;
`

const Tags = styled.View`
flex-direction: row;
justify-content: center;
margin: 10px 0 5px 3px;
align-items: center;
flex-wrap: wrap;
width: 99%;
`

const TagWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`

const ActionButtons2 = styled.View`
    flex-direction :row;
    justify-content: center;
    margin: 20px;
    align-items: center;
`

const ActionButton = styled.TouchableOpacity`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px;
    margin-top: 20px;
`

const ActionButtonLabel = styled.Text`
    color: white;
    font-family: "Montserrat_300Light";
    font-size: 15px;
`

const ViewMovie = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
	const db = useSelector((store) => store.movies)
    const ref = React.useRef(null);
    const [status, setStatus] = useState({});
    useEffect(() => {
        const findMovie = db.movies.find(movie => movie.id === route.params.id)
        setMovie(findMovie)
        console.log(movie)
        setLoading(false);
    }, [route])

    useEffect(() => {
        if (status.isPlaying) triggerAudio(ref);
      }, [ref, status.isPlaying]);

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold
    });

    const triggerAudio = async (ref) => {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        ref.current.playAsync();
      };

    return fontsLoaded && !loading ? (
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />  

            <Container>
                <Header login={true} goBack={navigation.goBack} />
                <Video
                    ref={ref}
                    onPlaybackStatusUpdate={(status) => setStatus(status)}
                    source={{
                        uri: movie?.linkVideo
                    }}
                    
                    isMuted={false}
                    useNativeControls
                    shouldPlay={true}
                    style={{ height: 300, marginTop: 15 }}
                    resizeMode="cover"
                    // onFullscreenUpdate={onFullscreenUpdate}
                />

                <Title>{movie.name}</Title>
                <MovieSubDetails>
                    <MovieBadge>13+</MovieBadge>
                    <Subtitle>{movie.time}</Subtitle>
                </MovieSubDetails>
                <ActionButtons>
                    <Play activeOpacity={0.5}>
                        <Ionicons onPress={() => {showVideoInFullscreen()}}
                            name='ios-play' size={26} />
                        <TextButtonPlay>Play</TextButtonPlay>
                    </Play>

                    <Download activeOpacity={0.5}>
                        <Feather name='download' size={24} style={{ color: 'white', margin: 4 }} />
                        <TextButtonDownload>Download</TextButtonDownload>
                    </Download>
                </ActionButtons>
                <MovieDescription>
                    {movie.description}
                </MovieDescription>
                <Tags>
                    {
                        movie?.tags.map((tag, i) => {
                            if (i + 1 == movie?.tags.length) {
                                return (
                                    <TagWrapper key={i}>
                                        <Tag>{tag}</Tag>
                                    </TagWrapper>
                                )
                            } else {
                                return (
                                    (
                                        <TagWrapper key={i}>
                                            <Tag>{tag}</Tag>
                                            <TagDot />
                                        </TagWrapper>
                                    )
                                )
                            }
                        })
                    }
                </Tags>
                <ActionButtons2>
                    <ActionButton activeOpacity={0.5}>
                        <Ionicons name="add-outline" size={35} color="white" />
                        <ActionButtonLabel>My List</ActionButtonLabel>
                    </ActionButton>

                    <ActionButton activeOpacity={0.5}>
                        <AntDesign name="like2" size={30} color="white" style={{ marginBottom: 7 }} />
                        <ActionButtonLabel>Rate</ActionButtonLabel>
                    </ActionButton>
                    <ActionButton activeOpacity={0.5}>
                        <AntDesign name="sharealt" size={27} color="white" style={{ marginBottom: 7 }} />
                        <ActionButtonLabel>Share</ActionButtonLabel>
                    </ActionButton>
                </ActionButtons2>
                
            </Container>
        </>
    ) : (
            <Container />
        )
}

export default ViewMovie
