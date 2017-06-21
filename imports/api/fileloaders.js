import { FilesCollection } from 'meteor/ostrio:files';

export const  Files = new FilesCollection({
  collectionName: 'Files',
  allowClientCode: false,
  storagePath:      'c://data/storage', // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg|pdf|docx|doc|ppt/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload file, with size equal or less than 10MB';
    }
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files');
}

if (Meteor.isServer) {
  Meteor.publish('files', function () {
    return Files.find().cursor;
  });
}
