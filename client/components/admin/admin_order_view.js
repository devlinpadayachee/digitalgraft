import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Categories } from '/imports/api/categories.js';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Orders } from '/imports/api/orders.js';
import './admin_order_view.html';


Template.admin_order_view.onCreated(function() {
  	console.log("Order View Created");
})


Template.admin_order_view.onRendered(function() {

	console.log("Order View Rendered")
		
});

Template.admin_order_view.helpers({

	OrdersCollection : function () {
        return Orders; //Return the Jobs Collection relating to the schema
    }

});

