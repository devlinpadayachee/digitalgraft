import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '/imports/api/jobs.js';
import { Categories } from '/imports/api/categories.js';
import { Orders } from '/imports/api/orders.js';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Moment } from 'meteor/momentjs:moment';
import { ReactiveDict } from 'meteor/reactive-dict';
import './seller_orders.html';

Template.seller_orders.onCreated(function() {

  this.autorun(() => {
    this.subscribe('ordersforloggedinuser');
  });

});



Template.seller_orders.helpers({
    Orders: function() {
        return Orders.find({},{sort: {expectedAt: 1}}); //Return the Jobs Data as Objects
    },
    OrdersTableSettings: function() {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                // { key: '_id',label : "Id"},
                { key: 'jobDetails.title', label: 'Title', fn: function(value, object, key) { return "I will " + value; } },
                { key: 'this.information', label: 'Information', fn: function(value, object, key) { if (this.information) { return value } else return "None"; } },
                { key: 'buyer', label: 'Buyer', fn: function(value, object, key) { return Meteor.users.findOne(value).auxdata.name; } },            
                { key: 'commencedAt', label: 'Started', fn: function(value, object, key) { return moment(new Date(value)).fromNow(); } },
                { key: 'expectedAt', label: 'Delivery Date', fn: function(value, object, key) { return moment(new Date(value)).fromNow(); } },
                { key: 'status', label: 'Status' }
            ]
        };
    }
});

Template.seller_orders.events({
  'click .reactive-table tbody tr': function (event) {

    console.log(this)
    Router.go('/orders/'+ this._id  +'/'+this.conversation);
    event.preventDefault();
  }

});