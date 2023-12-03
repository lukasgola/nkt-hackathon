// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

//Authentication
import { 
  getAuth,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";


//Firestore
import { getFirestore } from "firebase/firestore";
import { collection, setDoc, getDoc, getDocs, addDoc, doc, updateDoc, query, where } from "firebase/firestore"; 

//Storage
import { getStorage, ref, getDownloadURL, uploadBytes, uploadBytesResumable, } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-Q3tWKUfVkRTfKJ1XCT6C_3I2b7aDqJM",
  authDomain: "nkt-hackathon.firebaseapp.com",
  projectId: "nkt-hackathon",
  storageBucket: "nkt-hackathon.appspot.com",
  messagingSenderId: "393378212269",
  appId: "1:393378212269:web:335b407034a028148c9924"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


export const storage = getStorage(app);



export async function signInWithEmail (email, password){
  return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
}


export async function forgotPassword(email){
  return sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
}    



export async function adduser(uid, email, username, avatar){
  try {
    await setDoc(doc(db, "users", uid), {
      username: username,
      email: email,
      avatar: avatar,
      score: 2.5
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updateAvatar(uid, avatar){
  try {
    // Set the "capital" field of the city 'DC'
    await updateDoc(doc(db, "users", uid), {
      avatar: avatar
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



export async function addEvent(event){
  try {
    await addDoc(collection(db, `users/${auth.currentUser.uid}/parties`), {
      title: event.title,
      day: event.day,
      month: event.month,
      year: event.year,
      time_hour: event.time_hour,
      time_minute: event.time_minute,
      type: event.type,
      place: event.place,
      actGuests: event.actGuests,
      maxGuests: event.maxGuests,
      description: event.description,
      latitude: event.latitude,
      longitude: event.longitude,
      likes: event.likes,
      category: event.category
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export async function addIssue(event){
  try {
    await addDoc(collection(db, `users/${auth.currentUser.uid}/issues/`), {
      image: event.image,
      desc: event.desc,
      latitude: event.latitude,
      longitude: event.longitude
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function uploadImage(uid, avatar) {

  const metadata = {
    contentType: 'image/jpeg',
  };


  const response = await fetch(avatar);
  const blob = await response.blob();

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, "issues/" + Date.now());
  const uploadTask = uploadBytesResumable(storageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
          console.log(snapshot.state)
          break;
      }
    }, 
    (error) => {
      // Handle errors and log them
      reject(error)
    },
    async () => {
      // Upload completed successfully, now we can get the download URL

      
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
      resolve({
        downloadURL
        //metadata: uploadTask.snapshot.metadata
      })
    }
  );
  })
}

///////////////////////////////////

  // correction of found objects
  let objCorrection = []

// const voltage for 1 phase
const Uf = 230

// const voltage for 3 phase
const Un = 400

// const cosinus value for 1 phase
const cos1f = 0.9

//const cosinus value fro 3 phase
const cos3f = 0.75

let objects = []

// calculate current for 1 phase
let i1f = (power) => {
    return power/(Uf*cos1f)
}

// calculate current for 3 phase
let i3f = (power) => {
    return power/(Math.sqrt(3)*Un*cos3f)
}

///form data

// wire type
let typeOfWire = "Cu"

// instalation type
let installationType = "A1"

// number of wires
let numberOfWires = "a"

// map number of wires descriptions
let numberOfWiresMap = new Map()
numberOfWiresMap.set("a","układ jednofazowy (dwie żyły obciążone)")
numberOfWiresMap.set("b","układ trójfazowy wielożyłowy (trzy żyły obciążone)")
numberOfWiresMap.set("c","układ trójfazowy jednożyłowy (trzy żyły obciążone)")

// air temperature
let temperatureAir = null

// ground temperature
let temperatureGround = null

// phase number from number of wires
let fazNumber = null

// power if user input
let power = null

// current if user input
let iobl = null

// resistance ground
let resistanceGround = null
///end form data

// calculate current if power was inputed
if(power != null){
    if(fazNumber == 'Układ jednofazowy (dwie zyły obiązone), liczba zył 3' ){
        iobl = i1f(power)
    }else{
        iobl = i3f(power)
    }
}

// get power parameters from parameters collection
async function getPowerParameters(param){
    const docRef = doc(db, "parameters", param.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return {"0":0, "1":1}
      }
}

// get max power (current) value for iost (calculated current)
function getMaxPowerValue(powerValues, iost){ 
    let max = powerValues.power[0]
    let intersection = powerValues.intersectios[0]
    for(value in powerValues.power){
        if(powerValues.power[value] <= iost && powerValues.power[value] > max){
            max = powerValues.power[value]
            intersection = powerValues.intersectios[value]
        }
    }
    return {"power":max, "intersection":intersection}
}

// get and calculate correct parameter for ground cables
async function getGroundParameters(param, index){
    let corr = {"resistance":0, "ground":0}
    const docRef = doc(db, "rateGround", param.idR.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        for(key in obj = docSnap.data().resistanceGround){
            if(obj[key] == resistanceGround){
                objCorrection[index] *= docSnap.data().resistanceGroundRate[key]
                break;
            }
        }
        for(key in obj = docSnap.data().temperatureGround){
            if(obj[key] == temperatureGround){
                objCorrection[index] *= docSnap.data().temperatureGroundRate[key]
                break;
            }
        }
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return {"0":0, "1":1}
      }
}

// get and calculate correct parameter for non ground cables
async function getTemperatureAirParameters(param, index){
    let corr = {"numberOfWires":0, "temperatureAir":0}
    const docRef = doc(db, "rate", param.idT.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        objCorrection[index] *= docSnap.data().numberWiresRate[0]
        for(key in obj = docSnap.data().temperatureAirFirst){
            if(obj[key] == temperatureAir){
                objCorrection[index] *= docSnap.data().temperatureRateFirst[key]
                break;
            }
        }
        return docSnap.data()
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return {"0":0, "1":1}
      }
}

// chose which correction to set
async function setCorrection(doc1, index){
    if(doc1.idR != null){
        getGroundParameters(doc1, index)
    }
    if (doc1.idT != null){
        getTemperatureAirParameters(doc1, index)
    }
}

// get all data from wire collection which meet parameters
export async function getDataFromWires(installationType, temperatureAir, numberOfWires, typeOfWire, isolationType, power, iobl, temperatureOfGround, resistanceGround ){
    const cables = [];
    console.log("cables:" + cables)
    let querySnapshot
    try{

    const q = query(collection(db, "wires"), 
    where("typeOfWire", "==", typeOfWire), 
    where("numberOfWires", "==", numberOfWires), 
    where("installationType", "==", installationType),
    where("temperatureAir", ">=", 10),
    where("temperatureAir", "<=", 80)
    );
    querySnapshot = await getDocs(q);   
    }
    catch(e){
        querySnapshot = null
        console.log("No results found!")
        console.log(e)
    }
    if(querySnapshot != null){
    // prepare correct table
    querySnapshot.forEach(async(doc1) => {
      // doc.data() is never undefined for query doc snapshots
      objCorrection.push(1.0)
      if(doc1.data().idT != null){
      if(doc1.data().name == "YDY" || doc1.data().name == "YDYp" || doc1.data().name == "YKY"){
        if(temperatureAir <= 60 && temperatureAir >= 10){
            objects.push(doc1.data())
        }
      }
      else{
        if(temperatureAir <= 80 && temperatureAir >= 10){
            objects.push(doc1.data())
        }
      }
    }else{
        if(doc1.data().groundResistance >= 0.5 && doc1.data().groundResistance <= 3){
        if(doc1.data().name == "YKY"){
            if(temperatureOfGround <= 60 && temperatureOfGround >= 10){
                objects.push(doc1.data())
            }
          } 
          else{
            if(temperatureOfGround <= 80 && temperatureOfGround >= 10){
                objects.push(doc1.data())
            }
          }
        }
    }

    });
    let index = 0

    // set correction for each object
    // querySnapshot.forEach(async(doc1) => {
    //     setCorrection(doc1.data(), index)
    //     index++
    // });
    for(let key = 0; key < objects.length;key++){
        setCorrection(objects[key], index)
        index++
    }
    index = 0

    // calculate iost (current) and show data to user
    // querySnapshot.forEach(async(doc1) => {
    //     let iost = iobl/(objCorrection[index]*0.85)
    //     let powerValues = await getPowerParameters(doc1.data().idP)
    //     let maxPower = await getMaxPowerValue(powerValues, iost)
    //     console.log("Cable type ", doc1.data().name, " power ", maxPower.power, " intersecion ", maxPower.intersection, " iost ", iost, " correction ", objCorrection[index], " number of wires ", numberOfWiresMap.get(numberOfWires))
    //     index++
    // });
    
    for(let key = 0; key<objects.length; key++){
        let iost = iobl/(objCorrection[index]*0.85)
        let idP = objects[key].idP
        let powerValues = await getPowerParameters(idP)
        let maxPower = await getMaxPowerValue(powerValues, iost)
        const cable = {
          id: key,
          cableType: objects[key].name,
          fazNumber: fazNumber,
          intersection: maxPower.intersection
        }
        cables.push(cable);
        //console.log("Cable type ", objects[key].name, " power ", maxPower.power, " intersecion ", maxPower.intersection, " iost ", iost, " correction ", objCorrection[index], " number of wires ", numberOfWiresMap.get(numberOfWires))
        index++
    }
    return cables
}
// parameters from user input

}


export async function setGlobalValues(installationType, tempAir, nOfWires, typeOfWire, isolationType, power, iobl, groundTemp, groundRes) {
  // number of wires
numberOfWires = nOfWires

// air temperature
temperatureAir = tempAir

// ground temperature
temperatureGround = groundTemp

// phase number from number of wires
fazNumber = nOfWires == "a" ?
'Układ jednofazowy (dwie zyły obiązone), liczba zył 3' : 
(nOfWires == "b" ? 
"układ trójfazowy wielożyłowy (trzy żyły obciążone), liczba zył 4/5" :
"układ trójfazowy wielożyłowy (trzy żyły obciążone), liczba zył 1"),

// power if user input
power = power

// current if user input
iobl = iobl

// resistance ground
resistanceGround = groundRes

objects = []
}