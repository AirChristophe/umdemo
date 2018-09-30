import firebase from 'firebase';
import 'firebase/firestore';
import uuidGenerator from 'umdemo/utils/uuid';
import moment from 'moment';
import { logError } from 'umdemo/utils/logSentry';

export const getAuthUser = () => {
    return firebase.auth().currentUser;
};

export async function getUser() {
    try {
        const user = firebase.auth().currentUser;
        if (!user) {
            // alert('no user');
            return false;
        }
        const db = firebase.firestore();
        const settings = {
          timestampsInSnapshots: true
        };
        db.settings(settings);
    
        const ref = await db.collection('users').where("uid", "==", user.uid).get();
        return ref.docs[0].data();
      }
      catch (error) {
        alert(JSON.stringify(error));
        logError(error, 'firebase getUser');
        return false;
      }
}

export async function updateUser(datas) {
    try {
        const user = firebase.auth().currentUser;
        if (!user) {
            return false;
        }
        const db = firebase.firestore();
        const settings = {
        timestampsInSnapshots: true
        };
        db.settings(settings);

        const ref = await db.collection('users').where("uid", "==", user.uid).get();

        var sfDocRef = db.collection("users").doc(ref.docs[0].id);
        db.runTransaction((transaction) => {
            return transaction.get(sfDocRef).then((sfDoc) => {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }
                transaction.update(sfDocRef, { 
                    firstname: datas.firstname, 
                    lastname: datas.lastname, 
                    phone: datas.phone, 
                    secu: datas.secu,
                    pregnant: datas.pregnant,
                    breastfeed: datas.breastfeed
                });   
            });
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.error(err);
            logError(error, 'firebase updateUser');
        });
    }
    catch (error) {
        alert(JSON.stringify(error));
        logError(error, 'firebase updateUser');
        return false;
    }
}
/*
export async function addPrescription(datas) {
    console.log('addPrescription');
    console.log(datas);
    try {

        const db = firebase.firestore();
        const settings = {
          timestampsInSnapshots: true
        };
        db.settings(settings);
        const ref = db.collection('prescriptions');

        const user = getAuthUser();
        const uuid = uuidGenerator();
  
        const storageRef = firebase.storage().ref();
        const imagesRef = storageRef.child('images');
        const fileName = `${uuid}.jpg`;
        const spaceRef = imagesRef.child(fileName);
  
        const resp = await fetch(datas.uri);
        const blob = await resp.blob();
  
        return spaceRef.put(blob).then((image) => {
          return spaceRef.getDownloadURL().then((downloadURL) => {
            ref.add({
              image: downloadURL,
              pharmacie: datas.pharmacie,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
              uuid: uuid,
              userUid: user.uid,
              firstname: datas.firstname,
              lastname: datas.lastname,
              secu: datas.secu,
              phone: datas.phone,
              comment: datas.comment,
              pregnant: datas.pregnant, 
              breastfeed: datas.breastfeed, 
            });
            return downloadURL;
          });
  
        })
        .catch((error) => {
          console.log(error);
          alert(JSON.stringify(error));
          logError(error, 'firebase addPrescription');
          return false;
        });
      }
      catch (error) {
        alert(JSON.stringify(error));
        logError(error, 'firebase addPrescription');
        return false;
      }
}
*/