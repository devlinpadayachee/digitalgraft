import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';
export const Jobs = new Mongo.Collection('jobs');

var Schemas = {};

Schemas.Job = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        autoform: {
          afFieldInput: {
            placeholder: 'What is the job you are going to perform'
          }
        },
        max: 80
    },
    title_sort: {
        type: String,
        optional: true,
        autoValue: function() {
            var title = this.field("title");
            console.log(title);
            console.log(title.isSet);
            if (title.isSet) {
                return title.value.toLowerCase();
            } else {
                this.unset(); 
            }
        }
    },
    price: {
        type: Number,
        label: "Job price",
        autoform: {
          afFieldInput: {
            placeholder: 'Job price',
            type : 'number',
            defaultValue : 100
          }
        },
        min: 100
    },
    parentCategory: {
        type: String,
        label: "Parent Category",
        autoform: {
          afFieldInput: {
            placeholder: 'Parent Category',
            type : 'select'
          }
        },
    },
    subCategory: {
        type: String,
        label: "Sub-Category",
        autoform: {
          afFieldInput: {
            placeholder: 'Sub Category',
            type : 'select'
          }
        },
    },
    highlight: {
      type: String,
      label: "Provide a short description, which highlights and differentiates your job from other similar jobs.",
      max: 120
    },
    description: {
      type: String,
      label: "Briefly describe your Job, what it's about, how it works and a summary of what the buyer can expect to receive.",
      autoform: {
        afFieldInput: {
          type: 'tinyMCE',
          // class: 'editor', // optional
          data: {
            height: '200',
            width: '800' 
          }// summernote options goes here
        }
      }
    },
    instructions: {
      type: String,
      label: "Additional info, instructions and guidelines for your buyer. Tell your buyer what you need to get started.",
      autoform: {
        afFieldInput: {
          type: 'tinyMCE',
          // class: 'editor', // optional
          data: {
            height: '200',
            width: '800'             
          }// summernote options goes here
        }
      }
    },
    maxDays: {
        type: Number,
        label: "Maximum number of days taken to complete this job",
        min: 1
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
    imageUrl: {
        type: String,
        label: "Featured Image",
        autoform: {
          afFieldInput: {
            type: 'cloudinary'
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
    owner: {
        type: String,
        label: "Job object owner",
        autoValue:function(){ return this.userId }
    },
    seller: {
        type: String,
        label: "User selling this job",
        autoValue:function(){ return this.userId }
    },
    purchasedTimes: {
        type: Number,
        label: "Number of times this job has been purchased",
        autoValue: function() {
          if (this.isInsert) {
            return 0;
          } else if (this.isUpsert) {
            return {$setOnInsert: 0};
          } else {
            this.unset();  // Prevent user from supplying their own value
          }
        }
    },
    allowedRevisions: {
        type: Number,
        label: "Number of allowed revisions",
        autoform: {
          afFieldInput: {
            placeholder: 'Revisions',
            type : 'select'
          }
        },
    },
    status: {
        type: String,
        label: "Job status",
        allowedValues: ['active', 'inactive', 'deleted', 'pending approval','pending cancellation'],
        autoValue: function() {
          if (this.isInsert) {
            return 'active';
          } else if (this.isUpsert) {
            return {$setOnInsert: 'active'};
          } else {
            this.unset();  // Prevent user from supplying their own value
          }
        }
    },
    positiveLikes: {
        type: Number,
        label: "Positive likes",
        autoValue: function() {
          if (this.isInsert) {
            return 0;
          } else if (this.isUpsert) {
            return {$setOnInsert: 0};
          } else {
            this.unset();  // Prevent user from supplying their own value
          }
        }
    },
    negativeLikes: {
        type: Number,
        label: "Negative likes",
        autoValue: function() {
          if (this.isInsert) {
            return 0;
          } else if (this.isUpsert) {
            return {$setOnInsert: 0};
          } else {
            this.unset();  // Prevent user from supplying their own value
          }
        }
    },
    gallery: {
        type: Array,
        label: "Gallery Images",
        optional : true
    },
    'gallery.$' : {
        type : String,
        label: "Gallery Image",
        autoform: {
          afFieldInput: {
            type: 'cloudinary'
          }
        }
    }
});

if (Meteor.isServer) {
  Meteor.publishComposite('jobs', {
      find: function() {
          return Jobs.find({});
      },
      children: [
          {
              find: function(job) {
                   // console.log(Meteor.users.find({ _id: "asdjob.owner" },{ limit: 1, fields: { emails: 1 } }).fetch())
                  return Meteor.users.find({ _id: job.owner },{ limit: 1, fields: { emails: 1, auxdata : 1} });
              }
          }
      ]
  });

  Meteor.publishComposite('jobsbylimit', function(limit,sort) {

    if(!this.userId)
    return this.ready();

    return {
      find: function() {
          return Jobs.find({},{sort,limit});
          
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

   //Finds all the jobs for the logged in user
  Meteor.publishComposite('jobsbyloggedinuser', {
      find: function() {

          return Jobs.find({seller: this.userId});
          
      },
      children: [
          {
              find: function(job) {
                   // console.log(Meteor.users.find({ _id: "asdjob.owner" },{ limit: 1, fields: { emails: 1 } }).fetch())
                  return Meteor.users.find({ _id: job.owner },{ limit: 1, fields: { emails: 1 } });
              }
          }
      ]
  });

  Meteor.publishComposite('jobsbyuser', function(userId) {
    return {
      find: function() {
          return Jobs.find({seller: userId});
          
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

  Meteor.publishComposite('jobsbyid', function(Id) {
    return {
      find: function() {
          return Jobs.find({_id: Id})
          
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

}


Jobs.allow({
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

Jobs.attachSchema(Schemas.Job);

export const JobsSchema = Schemas.Job;

