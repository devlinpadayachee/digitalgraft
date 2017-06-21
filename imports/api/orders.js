import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { JobsSchema } from './jobs.js'
import { Jobs } from './jobs.js'
 
export const Orders = new Mongo.Collection('orders');


var Schemas = {};



// MySchema = new SimpleSchema({
//   password: {
//     type: String,
//     label: "Enter a password",
//     min: 8
//   },
//   confirmPassword: {
//     type: String,
//     label: "Enter the password again",
//     min: 8,
//     custom: function () {
//       if (this.value !== this.field('password').value) {
//         return "BuyerSellerSame";
//       }
//     }
//   }
// });


Schemas.Order = new SimpleSchema({

    job:{
      type: String,
      label: "Associated Job Id"
    },
    jobDetails: {
        type: JobsSchema,
        label: "Associated Job Details"
    }, 
    price: {
        type: Number,
        label: "Order price",
        autoform: {
          afFieldInput: {
            placeholder: 'Order price',
            type : 'number',
            defaultValue : 100
          }
        },
        min: 100
    },
    information: {
      type: String,
      label: "Additional info for the seller based on their instructions and required information.",
      autoform: {
        afFieldInput: {
          type: 'materialnote',
          class: 'editor', // optional
          settings: {
            height: '200px'            
          }// summernote options goes here
        }
      },
      optional : true
    },
    informationOk: {
      type: Boolean,
      label: "Information supplied is sufficient to start the job.",
      allowedValues: [true, false],
      autoValue: function() {
            if (this.isInsert) {
                return false;
            } else if (this.isUpsert) {
                return { $setOnInsert: false };
            } else {
                return this.value // Prevent user from supplying their own value
            }
      }
    },
    createdAt: {
        type: Date,
        label: "Date created",
        autoValue: function() {
          if (this.isInsert) {
            return new Date();
          } else if (this.isUpsert) {
            return {$setOnInsert: new Date()};
          } else {
            this.unset();  // Prevent user from supplying their own value
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
    commencedAt: {
        type: Date,
        label: "Date of job start",
        autoValue: function() {
          if (this.isInsert) {
            return new Date();
          } else if (this.isUpsert) {
            return {$setOnInsert: new Date()};
          } else {
            this.unset();  // Prevent user from supplying their own value
          }
        }
    },
    expectedAt: {
        type: Date,
        label: "Date of delivery",
        optional: true,
        autoValue: function() {
          var expectedAt = this.field("commencedAt");
          console.log(typeof expectedAt)
          console.log(expectedAt)
          if (expectedAt.isSet) {
            var daystocomplete = parseInt(this.field("jobDetails").value.maxDays);
            console.log(daystocomplete)
            var expectedAtDate = moment(expectedAt.value).add(daystocomplete, 'days').toDate();
            return expectedAtDate;
          } else {
            this.unset();
          }
        }
    },
    completedAt: {
        type: Date,
        label: "Date completed",
        optional: true
    },
    owner: {
        type: String,
        label: "Order object owner",
        autoValue:function(){ return this.userId }
    },
    seller: {
        type: String,
        label: "User selling this job"
    },
    buyer: {
        type: String,
        label: "User buying this job",
        autoValue:function(){ return this.userId }
    },
    status: {
        type: String,
        label: "Order status",
        allowedValues: ['in progress','delivered', 'revision' ,'review','completed','cancelled','error'],
        autoValue: function() {
          console.log("Res")
          if (this.isInsert) {
            return 'in progress';
          } else if (this.isUpsert) {
            return {$setOnInsert: 'in progress'};
          } else {
            console.log("I should be setting a status");
            return this.value;  // Add validation here for buyer and seller status setting
          }
        }
    },
    revisionTimes: {
        type: Number,
        label: "Number of times this job has been revised",
        autoValue: function() {
          if (this.isInsert) {
            return 0;
          } else if (this.isUpsert) {
            return {$setOnInsert: 0};
          } else {
            this.value;  // Prevent user from supplying their own value
          }
        }
    },
    conversation :{
      type : String,
      label: "Conversation",
      autoValue: function() {
          if (this.isInsert) {
            var conversation = new Conversation().save();
            var seller = this.field("seller").value;
            console.log("Adding: " + seller + " to conversation2:" + conversation._id);
            conversation.addParticipant( Meteor.users.findOne({_id:seller}) );
            return conversation._id;
          } else if (this.isUpsert) {
            return {$setOnInsert: conversation._id};
          } else {
            this.unset();  // Prevent user from supplying their own value
          }
      }


    },
    rating : {
        type : Number,
        label: "Order Rating",
        optional: true
    },
    review:{
      type: String,
      label: "Associated Review",
      optional: true
    }
});

if (Meteor.isServer) {
  Meteor.publishComposite('orders', {
      find: function() {
          return Orders.find({});
      },
      children: [
          {
              find: function(order) {
                   // console.log(Meteor.users.find({ _id: "asdjob.owner" },{ limit: 1, fields: { emails: 1 } }).fetch())
                  return Meteor.users.find({});
              }
          }
      ]
  });

  Meteor.publishComposite('ordersforloggedinuser', {
      find: function() {
          return Orders.find({seller : this.userId});
      },
      children: [
          {
              find: function(order) {
                  return Meteor.users.find({});
              }
          }
      ]
  });

  Meteor.publishComposite('purchasesforloggedinuser', {
      find: function() {
          return Orders.find({buyer : this.userId});
      },
      children: [
          {
              find: function(order) {
                  return Meteor.users.find({});
              }
          }
      ]
  });

  Meteor.publishComposite('ordersbyid', function(Id) {
    return {
      find: function() {
          return Orders.find({_id: Id})
          
      },
      children: [
          {
              find: function(job) {
                   // console.log(Meteor.users.find({ _id: "asdjob.owner" },{ limit: 1, fields: { emails: 1 } }).fetch())
                  return Meteor.users.find({ _id: job.owner },{ limit: 1, fields: { emails: 1 } });
              }
          }
      ]
    }
  });

  Meteor.publishComposite('conversationbyid', function(Id) {
    return {
      find: function() {
          return Meteor.conversations.find({_id:Id})     
      },
      children: [
          {
              find: function(conversation) {
                   // console.log(Meteor.users.find({ _id: "asdjob.owner" },{ limit: 1, fields: { emails: 1 } }).fetch())
                  return Meteor.users.find({});
              }
          }
      ]
    }
  });

  Meteor.publishComposite('messages', function(convo_id) {
    return {
      find: function() {
          return Meteor.messages.find({conversationId:convo_id},{sort : {date : -1}})     
      },
      children: [
          {
              find: function(conversation) {
                   // console.log(Meteor.users.find({ _id: "asdjob.owner" },{ limit: 1, fields: { emails: 1 } }).fetch())
                  return Meteor.users.find({});
              }
          }
      ]
    }
  });


}


Orders.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
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

Orders.attachSchema(Schemas.Order);