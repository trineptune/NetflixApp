import React, { useEffect, useState, useLayoutEffect } from 'react'

import {View,Text, StatusBar, Dimensions } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import styled from 'styled-components/native'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Movies from '../components/Movies'
import HeaderTabs from '../components/HeaderTabs.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector} from 'react-redux';
import {fetchAllMovies} from '../redux/actions/movieActions'
import {getUserByID} from '../redux/actions/userActions'
import {fetchAllMyList} from '../redux/actions/myListActions'
const Container = styled.ScrollView`
	flex: 1;
	background-color: #000;
`

const Poster = styled.ImageBackground`
	width: 100%;
	height: ${(Dimensions.get('window').height * 81) / 100}px;
`

const Gradient = styled(LinearGradient)`
	height: 101%;
`

const Home = ({ navigation }) => {
	
	const dispatch = useDispatch()
	const db = useSelector((store) => store.movies)
	var user = null
	var currentUser = null
	const checkExpired =  (currentUser) =>{
		if(parseInt(currentUser.map(item=>{return item.timeExpired})) <= 0)
		{
			navigation.replace("Bundle")
		}
	}
	const getUser = async() => {
		currentUser = JSON.parse(await AsyncStorage.getItem('user'))
		dispatch(fetchAllMovies())
		console.log(db.movies)
		// dispatch(fetchAllMyList(currentUser.map(item=>{return item.email})))
		console.log(parseInt(currentUser.map(item=>{return item.timeExpired})))
		checkExpired(currentUser)
  }
	useEffect(()=>{
		getUser()	
	},[])

	return (
		<>
			<StatusBar
				translucent
				backgroundColor='transparent'
				barStyle='light-content'
			/>
			<Container showsHorizontalScrollIndicator={false}>
				<Poster source={{ uri: 'https://cdn.vox-cdn.com/thumbor/9PqzVk9RnfW0g22byhIyRSPDBYM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8832449/strangerthings.jpg' }}>
					<Gradient
						locations={[0, 0.2, 0.5, 0.94]}
						colors={[
							'rgba(0,0,0,0.5)',
							'rgba(0,0,0,0.0)',
							'rgba(0,0,0,0.0)',
							'rgba(0,0,0,1)'
						]}>
						<Header login={true} navigation={navigation} />
						<HeaderTabs/>
						<Hero user={user}/>
					</Gradient>
				</Poster>
				{
					db.movies && (
						<React.Fragment>
							<Movies label='Popular on Netflix' item={db.movies} />
							<Movies label='US Movies' item={db.movies} />
							<Movies label='Crime TV Shows' item={db.movies} />
						</React.Fragment>
					)
				}
			</Container>
		</>
	)
}

export default Home