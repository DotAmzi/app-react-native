import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';


const ArrowElement = ({text}) => {

	return (
		<View>
			<View style={{
				flex: 1,
        flexDirection: 'row',
        height: 70        
			}}>
				<View style={{flex: 2, height: 50}}>
					<Text style={styles.labelArrow}>{text}</Text>
				</View>

				<View style={{width: 50, height: 50}}>
					<Image source={require('../assets/next.png')} />
				</View>
				
			</View>
      
		</View>
	);

}

const styles = StyleSheet.create({
  labelArrow: {
    fontSize: 20
  }
});

export {ArrowElement};