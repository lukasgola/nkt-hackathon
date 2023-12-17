import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Modal, Dimensions, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import MapView, { Marker, Heatmap, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapStyle1 } from '../theme/MapStyle1';
import { useCurrentLocation } from '../providers/CurrentLocationProvider';

import IssueMarker from '../components/IssueMarker';

import { auth, db } from '../firebase/firebase-config';
import { getDocs, collection } from "firebase/firestore";
import { useTheme } from '../theme/ThemeProvider';
import IssueDetails from '../components/IssueDetails';

export default function Map() {


    const height = Dimensions.get('window').height;

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

    const renderIssues2 = () => {
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
                    <View style={{
                        width: 25,
                        height: 25,
                        borderRadius: 5,
                        backgroundColor: colors.secondary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: colors.background
                        }}>!</Text>
                    </View>
                </Marker> 
            ))
        )
    }


    useEffect(() => {
        getIssues();
    }, [])
  
  return (
    <View style={{
        flex: 1
    }}>
        
        <IssueDetails 
            item={item}
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible} 
        />

      <MapView 
            ref={mapRef}
            style={{width: '100%', height: '100%'}} 
            initialRegion={region}
            onRegionChange={reg => setRegion(reg)}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE}
            customMapStyle={MapStyle1}
            
        >
            {renderIssues2()}
        </MapView>
    </View>
  );
}

