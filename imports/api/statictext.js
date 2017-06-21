import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const StaticText = new Mongo.Collection('statictext');

var Schemas = {};

Schemas.Language = new SimpleSchema({
    name: {
        type: String,
        label: "Language Name",
        max: 200
    },
    createdAt: {
        type: Date,
        label: "Date created",
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return { $setOnInsert: new Date() };
            } else {
                this.unset(); // Prevent user from supplying their own value
            }
        }
    },
    updatedAt: {
        type: Date,
        label: "Date updated",
        autoValue: function() {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true
    },
    'lang': {
        type: Object,
        label: "Text Items",
        optional : true
    },
    'lang.welcome_text' : {
        type : String,
        optional : true
    },
    'lang.welcome_1st_subtext' : {
        type : String,
        optional : true
    },
    'lang.welcome_2nd_subtext' : {
        type : String,
        optional : true
    },
    'lang.howitworks_main_header' : {
        type : String,
        optional : true
    },
    'lang.howitworks_1st_header' : {
        type : String,
        optional : true
    },
    'lang.howitworks_1st_text' : {
        type : String,
        autoform: {
            rows: 5
        },
        optional : true
    },
    'lang.howitworks_2nd_header' : {
        type : String,
        optional : true
    },
    'lang.howitworks_2nd_text' : {
        type : String,
        autoform: {
            rows: 5
        },
        optional : true
    },
    'lang.howitworks_3rd_header' : {
        type : String,
        optional : true
    },
    'lang.howitworks_3rd_text' : {
        type : String,
        autoform: {
            rows: 5
        },
        optional : true
    },
    'lang.features_main_header' : {
        type : String,
        optional : true
    }
});

if (Meteor.isServer) {
    Meteor.publishComposite('statictext', {
        find: function() {
            return StaticText.find({});
        }
    });
}


StaticText.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    },
    update: function(userId, doc) {
       // only allow posting if you are logged in
        return !!userId;
    }
});

StaticText.attachSchema(Schemas.Language);