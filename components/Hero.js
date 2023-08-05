import React, { useState,useEffect } from 'react'

import styled from 'styled-components/native'

import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { getUserByID } from '../redux/actions/userActions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector} from 'react-redux';
const Container = styled.View`
	position: absolute;
	width: 100%;
	align-items: center;
	bottom: 8px;
`

const Banner = styled.Image`
	height: 135px;
	width: 100%;
`

const Tags = styled.View`
	justify-content: center;
	margin-top: 20px;
	flex-direction: row;
	align-items: center;
`

const MenuTag = styled.Text`
	color: #fff;
	padding: 0 8px;
	font-size: 13px;
`

const Separator = styled.View`
	width: 3px;
	height: 3px;
	background-color: #e8e8e8;
	margin: 6px 0;
	border-radius: 3px;
`

const MenuHero = styled.View`
	width: 90%;
	margin-top: 15px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const Button = styled.TouchableOpacity`
	align-items: center;
`

const TextButton = styled.Text`
	color: #fff;
	font-size: 13px;
	margin-top: 3px;
`

const Play = styled.TouchableOpacity`
	flex-direction: row;
	background-color: #fff;
	width: 142px;
	height: 32px;
	border-radius: 2px;
	align-items: center;
	justify-content: center;
`

const TextButtonPlay = styled.Text`
	font-size: 15px;
	font-weight: bold;
	padding-left: 5px;
`

const Hero = ({myList,user}) => {
	const navigation = useNavigation();
	
	return (
		<Container>
			<Banner resizeMode='contain' source={{ uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABTAytd1vigKbOPjqKU6DxgabgZoLrjdBz7MaLNmekog0p0h-U7ABf1ccTeNoJ_46ZcPREXOwn06cFBDW5lBu46AeS1jdks0wfIhi_GzIJ4Sc34WhOdNdXJ_7bNaXYAvnMwuDL6d0GZbB0J46IhYI8tMtaNnbkqReYevcWG-LyWFI.webp' }} />
			<Tags>
				<MenuTag>Sci-Fi TV</MenuTag>
				<Separator />
				<MenuTag>Teen TV Shows</MenuTag>
				<Separator />
				<MenuTag>TV Horror</MenuTag>
			</Tags>
			<MenuHero>
							<Button activeOpacity={0.5}>
								<Ionicons name="add-outline" size={28} color="#fff" />
								<TextButton>My List</TextButton>
							</Button>
						
				
				<Play activeOpacity={0.5} onPress={() => {
					navigation.navigate("ViewMovie", {
						id: "qTdr9XETQZ11EO6lFJKY"
					})
				}}>
					<Ionicons name='ios-play' size={26} />
					<TextButtonPlay>Play</TextButtonPlay>
				</Play>

				<Button activeOpacity={0.5}>
					<Feather name='info' size={22} color='#FFF' />
					<TextButton>Info</TextButton>
				</Button>
				</MenuHero>
		</Container>
	)
}

export default Hero
