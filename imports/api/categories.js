import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Categories = new Mongo.Collection('categories');

var Schemas = {};

Schemas.Category = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    createdAt: {
        type: Date,
        label: "Date created",
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date()
                };
            } else {
                this.unset(); // Prevent user from supplying their own value
            }
        }
    },
    imageUrl: {
        type: String,
        label: "Upload a small image for for the purchase cards",
        autoform: {
            afFieldInput: {
                type: 'cloudinary'
            }
        },
        optional: true,
        autoValue: function() {
           console.log(this)
           if (this.isSet){
            return this.value
           }
           else return "/images/default_big_image.jpg";
          
        }

    },
    imageUrlLarge: {
        type: String,
        label: "Upload a larger image for the category page",
        autoform: {
            afFieldInput: {
                type: 'cloudinary'
            }
        },
        optional: true,
        autoValue: function() {
           console.log(this)
           if (this.isSet){
            return this.value
           }
           else return "/images/default_big_image.jpg";
          
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
    owner: {
        type: String,
        label: "Category object owner",
        autoValue: function() {
            return this.userId
        }
    },
    featured: {
        type: Boolean,
        label: "Featured",
        allowedValues: [true, false],
        autoValue: function() {
            if (this.isInsert) {
                return false;
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: false
                };
            } else {
                return this.value // Prevent user from supplying their own value
            }
        }
    },
    parentCategory: {
        type: String,
        label: "Parent Category",
        autoform: {
            afFieldInput: {
                placeholder: 'Parent Category',
                type: 'select'
            }
        },
        optional: true
    },
    tags: {
        type: Array,
        label: "Tags",
        optional: true
    },
    'tags.$': {
        type: String
    }
});

if (Meteor.isServer) {
    Meteor.publishComposite('categories', {
        find: function() {
            return Categories.find({});
        },
        children: [{
            find: function(category) {
                // console.log(Meteor.users.find({ _id: "asdjob.owner" },{ limit: 1, fields: { emails: 1 } }).fetch())
                return Meteor.users.find({
                    _id: category.owner
                }, {
                    limit: 1,
                    fields: {
                        emails: 1
                    }
                });
            }
        }]
    });
}


Categories.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    },
    update: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    },
    remove: function(userId, doc) {
        // only allow posting if you are logged in
        return doc.owner === userId;
    }
});

Categories.attachSchema(Schemas.Category);
