import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '/imports/api/jobs.js';
import { Categories } from '/imports/api/categories.js';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Moment } from 'meteor/momentjs:moment';
import { ReactiveDict } from 'meteor/reactive-dict';
// import { updateUser } from '/imports/api/methods.js';
// import { updateOrderInformationOk } from '/imports/api/methods.js';

Template.seller.onRendered(function() {

  this.errors = new ReactiveDict();
  
  $('.ui.dropdown').dropdown({hover: true,on : 'hover'});

	
});

Template.seller.onCreated(function() {

  // this.autorun(() => {
  //   this.subscribe('jobsbyloggedinuser');
  //   this.subscribe('ordersforloggedinuser');
  // });

  this.errors = new ReactiveDict();

});



Template.seller.helpers(
{	
	
  AllOrders: function () {
      return 0;
  },
  AwaitingConfirmation : function () {
      return 0;
  },
  InProgressOrders: function () {
      return 0;
  },  
  DeliveredOrders: function () {
  		return 0;
  }, 
  CompletedOrders: function () {
  		return 0;
  }, 
  CancelledOrders: function () {
  		return 0;
  },
  Jobs: function () {
		return Jobs.find({seller : this._id});
	},
  errors(fieldName) {

    const instance = Template.instance();
    return instance.errors.get(fieldName);
  },
  InformationFormatted: function () {
      if(this.information == "" || this.information == null || typeof this.information === 'undefined')
      return "None";
      else return this.information
  },
  commencedAtFormatted: function () {
      if(this.commencedAt == "" || this.commencedAt == null || typeof this.commencedAt === 'undefined')
      return "This order has not commenced";
      else return this.commencedAt
  },
  expectedAtFormatted: function () {
      if(this.expectedAt == "" || this.expectedAt == null || typeof this.expectedAt === 'undefined')
      return "This order has not commenced";
      else return this.expectedAt
  }
  
    	
});



