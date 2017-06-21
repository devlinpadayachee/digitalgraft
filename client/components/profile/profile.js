import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '/imports/api/jobs.js';
import { Categories } from '/imports/api/categories.js';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Moment } from 'meteor/momentjs:moment';
import { ReactiveDict } from 'meteor/reactive-dict';


Template.profile.onRendered(function() {
  $('.ui.rating').rating('disable');
});

Template.profile.onCreated(function() {

  
  this.autorun(() => {
    console.log(Template.currentData())
    this.subscribe('jobsbyuser',Template.currentData()._id);
  });


});



Template.profile.helpers(
{	
	
  ActiveOrders: function () {
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
	}	
    	
});

