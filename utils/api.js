import firebase from 'firebase';
import uuidGenerator from 'umdemo/utils/uuid';
import moment from 'moment';
// import { logError } from 'umdemo/utils/logSentry';
import config from 'umdemo/config';


export async function getMyActivities(uid) {
    const url = `${config.API_URL}/dyn/action.php?Action=GET_MY_ACTIVITIES&id=${uid}`;
    try {
        let response = await fetch(
            url, {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
            }
        );
        console.log(url);
        
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
      }
      catch (error) {
        alert(JSON.stringify(error));
        // logError(error, 'api getPrescriptions');
        return false;
      }
}

export async function getProviders(uid) {
    // console.log('getProviders');
    // console.log(uid);
    const url = `${config.API_URL}/dyn/action.php?Action=GET_PROVIDERS&id=${uid}`;
    try {
        let response = await fetch(
            url, {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
            }
        );
        console.log(1111);
        console.log(url);
        
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
      }
      catch (error) {
        alert(JSON.stringify(error));
        // logError(error, 'api getPrescriptions');
        return false;
      }
}


export const getAuthUser = () => {
    return firebase.auth().currentUser;
};

export async function addPrescription(data) {

    const user = firebase.auth().currentUser;

    const resp = await fetch(data.uri);
    const blob = await resp.blob();


    const d = {...data, user_uid: user.uid, file: blob};
    try {
        let response = await fetch(
            'https://www.toutemapharmacie.com/public/scan/add_prescription.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(d),
              }
          );
          let responseJson = await response.json();
          return responseJson;
      }
      catch (error) {
        alert(JSON.stringify(error));
        // logError(error, 'api addPrescription');
        return false;
      }
}

export async function getPrescriptions(uid) {

    const url = `https://www.toutemapharmacie.com/public/scan/get_prescriptions.php?u=${uid}`;
    try {
        let response = await fetch(
            url, {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
            }
        );
        console.log(url);
        
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
      }
      catch (error) {
        alert(JSON.stringify(error));
        // logError(error, 'api getPrescriptions');
        return false;
      }
}

export async function getDetail(uid) {

    const url = `https://www.toutemapharmacie.com/public/scan/detail.php?u=${uid}`;
    try {
        let response = await fetch(
            url, {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
            }
        );
        console.log(url);
        
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
      }
      catch (error) {
        alert(JSON.stringify(error));
        // logError(error, 'api getDetail');
        return false;
      }
}
