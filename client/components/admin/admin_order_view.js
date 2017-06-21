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

	AutoForm.addHooks(null, {
	    onError: function (name, error, template) {
	      console.log(name + " error:", error);
	    },
	    onSuccess: function(formType, result) {
	    	console.log(result)
	    },
	    before: {  
		    update: function(doc) {
		      if (doc.$set.featured)
		      {
		      	console.log(doc)
		      	doc.$set.parentCategory = "";
		      }
		      return doc;
		    }
		}
	});

	console.log("Order View Rendered")
		
});

Template.admin_order_view.helpers({

});

