import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import MapView, { Marker, Heatmap, Callout } from 'react-native-maps';

import { useCurrentLocation } from '../providers/CurrentLocationProvider';

import IssueMarker from '../components/IssueMarker';

import { auth, db } from '../firebase/firebase-config';
import { getDocs, collection } from "firebase/firestore";

export default function Map() {

    const mapRef = useRef();

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
