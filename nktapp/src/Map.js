import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Modal, Touchable, TouchableOpacity } from 'react-native';

import MapView, { Marker, Heatmap, Callout } from 'react-native-maps';

import { useCurrentLocation } from '../providers/CurrentLocationProvider';

import IssueMarker from '../components/IssueMarker';

import { auth, db } from '../firebase/firebase-config';
import { getDocs, collection } from "firebase/firestore";
import { useTheme } from '../theme/ThemeProvider';

export default function Map() {

    const mapRef = useRef();

    const { colors} = useTheme();

    const {currentLocation} = useCurrentLocation();

    const DEFAULT_DELTA = {
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    }

    const [region, setRegion] = useState({
        latitude: currentLocation?.latitude ? currentLocation.latitude : 50,
        longitude: currentLocation?.longitude ? currentLocation.longitude : 18,
        latitudeDelta: DEFAULT_DELTA.latitudeDelta,
        longitudeDelta: DEFAULT_DELTA.longitudeDelta,
    });

    const [issues, setIssues] = useState([])
    const [ item, setItem] = useState();
    const [modalVisible, setModalVisible] = useState(false);

  const getIssues = async () => {
    const temp = [];
    const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "issues"));
    querySnapshot.forEach((doc) => {      
        // doc.data() is never undefined for query doc snapshots
        const data = {
            ...doc.data(),
            id: doc.id,
        }
        temp.push(data);
        console.log(data);
    });
    setIssues(temp)
}

    const renderIssues = () => {
        return(
            issues.map((issue) => (
                <Marker
                    key={issue.id}
                    coordinate={{
                        latitude: issue.latitude,
                        longitude: issue.longitude
                    }}
                    onPress={() => [setModalVisible(true), setItem(issue)]}
                >
                    <IssueMarker marker={issue} />
                </Marker> 
            ))
        )
    }


    useEffect(() => {
        getIssues();
    }, [])
  
  return (
    <View style={styles.container}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
            style={{
                flex: 1,
                backgroundColor: colors.background
            }}
        >
            <View style={{
                width: '100%',
                alignItems: 'center',
                //marginLeft: '5%',
                marginTop: 80
            }}>
                <View style={{
                    borderRadius: 10,
                    width: '90%',
                    height: 600,
                }}>
                    <Image 
                        source={{uri: item?.image}}
                        style={{
                            width: '100%',
                            height: 600,
                            borderRadius: 10
                        }}
                        //resizeMode='contain'
                    />
                </View>
            
            <TouchableOpacity
                style={{
                    width: '90%',
                    height: 50,
                    backgroundColor: colors.primary,
                    borderRadius: 10,
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => setModalVisible(false)}
            >
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: colors.background
                }}>Zamknij</Text>
            </TouchableOpacity>
            </View>
            
        </Modal>
      <MapView 
            ref={mapRef}
            style={{width: '100%', height: '100%'}} 
            initialRegion={region}
            onRegionChange={reg => setRegion(reg)}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
        >
            {renderIssues()}
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
