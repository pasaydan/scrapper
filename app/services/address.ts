import { Observable } from 'rxjs';
import Firebase from "@firebase/index";

const addressRef = Firebase.firestore().collection('address');

export const getAddressById = (id) => {
  return new Observable((observer) => {
    addressRef.onSnapshot((querySnapshot) => {
      let user = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        if (doc.id == id) {
          data.key = doc.id;
          user.push(data);
        }
      });
      observer.next(user);
    });
  })
}

export const addAddress = (data, status) => {
  (status == 'booking') ? (data.type = 'Booking') : data.type = 'User';
  data.createdOn = new Date();
  data.modifiedOn = new Date();
  return new Observable((observer) => {
    addressRef.add(data).then((doc) => {
      observer.next(doc.id);
    });
  });
}

export const getAddresses = (id: string) => {
  return new Observable((observer) => {
    addressRef.doc(id).get().then((doc) => {
      let data = doc.data();
      data.key = doc.id;
      observer.next(data);
    });
  });
}