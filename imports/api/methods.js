import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Orders } from './orders.js';
import { Categories } from './categories.js';
import { JobsSchema } from './jobs.js'

export const updateUser = new ValidatedMethod({
  name: 'user.updateUser',
  validate: new SimpleSchema({
    bio: { type: String,max:500,min:4 },
    yearsexperience: { type: Number },
    tagline : { type: String,max:40,min:4 }
  }).validator(),
  run({bio,yearsexperience,tagline}) {
  	console.log("Setting user data")
    if (!this.userId) {
      throw new Meteor.Error('user.updateUser.unauthorized',
        'Cannot edit user record, you must be logged in to edit a record');
    }

    Meteor.users.update(this.userId, {
      $set: { 'auxdata.bio': bio,'auxdata.yearsexperience':yearsexperience,'auxdata.tagline':tagline}
    });
  }
});

export const createOrder = new ValidatedMethod({
  name: 'order.createOrder',
  validate: new SimpleSchema({
    job : {type : String},
    jobDetails: { type: JobsSchema},
    price: { type: Number,min: 100},
    information : { type: String,optional:true},
    seller : { type: String}
  }).validator(),
  run(order) {
  	console.log("Creating Order")
    if (!this.userId) {
      throw new Meteor.Error('order.createOrder.unauthorized',
        'Cannot create order record, you must be logged in to create a record');
    }

    return Orders.insert(order);
  }
});

export const loadCategories = new ValidatedMethod({
  name: 'categories.loadCategories',
  validate: new SimpleSchema({
    csvloader: { type: String }
  }).validator(),
  run({csvloader}) {
    console.log("Setting category data:" + csvloader)

    var lines = csvloader.split(/\n/);
    var categories = [];
    for (var i=0; i < lines.length; i++) {
      // only push this line if it contains a non whitespace character.
        categories.push(JSON.parse(lines[i])); 
    }
    console.log(categories)
    if (!this.userId) {
      throw new Meteor.Error('categories.loadCategories.unauthorized',
        'Cannot create categories, you must be logged in to edit a record');
    }

    _.each(categories, function (categorydata) {

        if (categorydata.hasOwnProperty('name'))
        {

          console.log(categorydata);
          id = Categories.insert({ 
              name: categorydata.name,
              imageUrl : categorydata.imageUrl,
              imageUrlLarge : categorydata.imageUrlLarge,
              tags : ["DigitalGraft"],           
              owner : this.userId,
              featured : true

          });
        
          console.log("Created Category:" + id);

        } 
        else {
          throw new Meteor.Error('categories.loadCategories.load',"There is an error in the data for:" + JSON.stringify(categorydata));
        }
          
    });

    return categories;
  }
});

// export const updateOrderInformationOk = new ValidatedMethod({
//   name: 'order.updateOrderInformationOk',
//   validate: new SimpleSchema({
//     orderId: { type: String },
//     informationOk : {type : Boolean},
//     maxDays : {type : Number}
//   }).validator(),
//   run({orderId,informationOk,maxDays}) {
//     console.log("Updating Order")
//     if (!this.userId) {
//       throw new Meteor.Error('order.updateOrderInformationOk.unauthorized',
//         'Cannot update order record, you must be logged in to update a record');
//     }

//     var setdate = new Date();
//     var expectedAt = moment(setdate).add(maxDays, 'days').toDate();// Prevent user from supplying their own value           

//     return Orders.update(orderId, {
//       $set: { 'informationOk': informationOk,'commencedAt' : setdate, 'expectedAt': expectedAt}
//     });
//   }
// });


export const updateOrderReview = new ValidatedMethod({
  name: 'order.updateOrderReview',
  validate: new SimpleSchema({
    orderId: {
      type: String
    },
    rating: {
      type: Number,
      optional: true
    },
    review: {
      type: String,
      optional: true
    }
  }).validator(),
  run({
    orderId,
    rating,
    review
  }) {
    console.log("Updating Order Review")
    if (!this.userId) {
      throw new Meteor.Error('order.updateOrderStatus.unauthorized',
        'Cannot update order record, you must be logged in to update a record');
    }
    
    return Orders.update(orderId, {
        $set: {
          'rating' :rating,'review':review
        }
    }); 

  
  }
});

export const updateOrderStatus = new ValidatedMethod({
  name: 'order.updateOrderStatus',
  validate: new SimpleSchema({
    orderId: {
      type: String
    },
    status: {
      type: String
    },
    rating: {
      type: Number,
      optional: true
    },
    review: {
      type: String,
      optional: true
    }
  }).validator(),
  run({
    orderId,
    status,
    rating,
    review
  }) {
    console.log("Updating Order Status")
    if (!this.userId) {
      throw new Meteor.Error('order.updateOrderStatus.unauthorized',
        'Cannot update order record, you must be logged in to update a record');
    }
    if (status == 'completed') {
      var completedAt = new Date();
      return Orders.update(orderId, {
        $set: {
          'status': status,'completedAt' : completedAt,'rating' :rating,'review':review
        }
      });
    } 
    else if (status == 'revision'){

      return Orders.update(orderId, {
        $set: {
          'status': status
        },
        $inc: { 
          'revisionTimes' : 1 
        }

      });

    }
    else {
      return Orders.update(orderId, {
        $set: {
          'status': status
        }
      });
    }
  }
});


// export const updateOrderInformation = new ValidatedMethod({
//   name: 'order.updateOrderInformation',
//   validate: new SimpleSchema({
//     orderId: { type: String },
//     information : {type : String}
//   }).validator(),
//   run({orderId,information}) {
//     console.log("Updating Order")
//     if (!this.userId) {
//       throw new Meteor.Error('order.updateOrderInformation.unauthorized',
//         'Cannot update order record, you must be logged in to update a record');
//     }
//     return Orders.update(orderId, {
//       $set: { 'information': information}
//     });
//   }
// });