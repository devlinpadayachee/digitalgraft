import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '/imports/api/jobs.js';
import { Categories } from '/imports/api/categories.js';
import { AutoForm } from 'meteor/aldeed:autoform';
import './seller_job_view.html';


Template.seller_job_view.onCreated(function() {

	$('div.afCloudinary button').addClass('ui blue button');
		
})

Template.seller_job_view.onRendered(function() {

	AutoForm.addHooks(null, {
	    onError: function (name, error, template) {
	      console.log(name + " error:", error);
	    }
	});

	
	$('div.afCloudinary > button').addClass('ui blue button');
	console.log("Job View Rendered");
	console.log(this);
		
})

Template.seller_job_view.helpers(
{	
	JobsCollection : function () {
        return Jobs; //Return the Jobs Collection relating to the schema
    },
    AllowedRevisionsOptions: function () {
    	return [{label : "1",value: "1"},{label : "2",value: "2"},{label : "3",value: "3"},{label : "5",value: "5"},{label : "8",value: "8"},{label : "Unlimited",value: "99"}];
  	},
    ParentCategoryOptions: function () {
    	return Categories.find({featured:true}).map(function (c) {
	    	console.log(c)
	      	return {label: c.name, value: c._id};
    	});
  	},
  	SubCategoryOptions: function () {


  		var pc = AutoForm.getFieldValue('parentCategory',"job_edit_form") || false;
  		console.log(pc)
    	return Categories.find({parentCategory:pc}).map(function (c) {
	    	console.log(c)
	      	return {label: c.name, value: c._id};
    	});
  	}

});


