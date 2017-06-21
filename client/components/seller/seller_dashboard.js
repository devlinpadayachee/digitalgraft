import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Categories } from '/imports/api/categories.js';
import { Jobs } from '/imports/api/jobs.js';
import { Orders } from '/imports/api/orders.js';
import { Moment } from 'meteor/momentjs:moment';


Template.seller_dashboard.onRendered(function() {

  this.autorun(() => {
    this.subscribe('ordersforloggedinuser');
  });

  this.autorun(() => {
    this.subscribe('jobsbyloggedinuser');
  });




})

Template.seller_dashboard.helpers({

    jobsCount: function() {
       return Jobs.find().count();
    }, 
    AllOrders: function () {
      return Orders.find({seller : this._id}).count();
    },
    ActiveOrders: function () {
      return Orders.find({seller : this._id,status:{$in: ['in progress','delivered', 'revision' ,'review']}}).count();
    },
    CompletedOrders: function () {
      return Orders.find({seller : this._id,status:'completed'}).count();
    },      
});