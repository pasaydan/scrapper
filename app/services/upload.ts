import { Observable } from 'rxjs';
import Firebase from "@firebase/index";

// from ==> category or service
// type => small or large
const basePath = '/uploads';
let fileName = '';
let filePath = '';
const storageRef = Firebase.storage().ref();
export const uploadImage = (image, from, type) => {

  let date = new Date();
  let id = date.getTime().toString();
  fileName = (type ? type : '') + 'pic' + id + '.jpg';
  filePath = basePath + '/' + from + '/' + fileName;

  let uploadTask = storageRef.child(filePath).putString(image, 'data_url');


  uploadTask.on('state_changed', function (snapshot) {

    // let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    // switch (snapshot.state) {
    //   case firebase.storage.TaskState.PAUSED: // or 'paused'
    //     console.log('Upload is paused');
    //     break;
    //   case firebase.storage.TaskState.RUNNING: // or 'running'
    //     console.log('Upload is running');
    //     break;
    // }
  }, function (error) {
    // console.log(error);
  }, function () {
    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      // console.log('File available at', downloadURL);
      // callBack(downloadURL, bucketIndex, imageIndex);
    });
  });

  return new Observable((observer) => {
    uploadTask.on('state_changed', function (snapshot) {

      // let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      // switch (snapshot.state) {
      //   case firebase.storage.TaskState.PAUSED: // or 'paused'
      //     console.log('Upload is paused');
      //     break;
      //   case firebase.storage.TaskState.RUNNING: // or 'running'
      //     console.log('Upload is running');
      //     break;
      // }
    }, function (error) {
      // console.log(error);
    }, function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        observer.next(downloadURL);
        // callBack(downloadURL, bucketIndex, imageIndex);
      });
    });
  });
}

export const deleteImage = (imageUrl) => {
  storageRef.storage.refFromURL(imageUrl).delete();
}