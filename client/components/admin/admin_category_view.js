import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Categories } from '/imports/api/categories.js';
import { AutoForm } from 'meteor/aldeed:autoform';
import './admin_category_view.html';


Template.admin_category_view.onCreated(function() {
	$('div.afCloudinary button').addClass('ui blue button');
  	console.log("Category View Created");
})


Template.admin_category_view.onRendered(function() {

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
	$('div.afCloudinary button').addClass('ui blue button');
	console.log("Category View Rendered")
		
});

Template.admin_category_view.helpers({
    isFeatured: function() {
        if (this.featured) { return 'yes' } else { return 'no' }
    },
	CategoriesCollection : function () {
        return Categories; //Return the Jobs Collection relating to the schema
    },
    ParentCatagoryOptions: function () {
    	if (this.featured){

    		return false

    	}
    	else{

    		return Categories.find({featured : true, _id: {$ne: this._id}}).map(function (c) {
	      		return {label: c.name, value: c._id};
    		});


    	}
    	
    	
  	}
});

