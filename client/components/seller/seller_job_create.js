import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '/imports/api/jobs.js';
import { Categories } from '/imports/api/categories.js';
import { AutoForm } from 'meteor/aldeed:autoform';
import './seller_job_create.html';


Template.seller_job_create.onCreated(function() {


		
})

Template.seller_job_create.onRendered(function() {

	AutoForm.addHooks(null, {
	    onError: function (name, error, template) {
	      console.log(name + " error:", error);
	    }
	});
	$('div.afCloudinary button').addClass('ui blue button');
	console.log("Job Create Rendered")
		
})

Template.seller_job_create.helpers(
{	
	JobsCollection : function () {
        return Jobs; //Return the Jobs Collection relating to the schema
    },
    AllowedRevisionsOptions: function () {
    	return [{label : "1",value: "1"},{label : "2",value: "2"},{label : "3",value: "3"},{label : "5",value: "5"},{label : "8",value: "8"},{label : "Unlimited",value: "99"}];
  	},
    ParentCatagoryOptions: function () {
    	return Categories.find({featured:true}).map(function (c) {
	    	console.log(c)
	      	return {label: c.name, value: c._id};
    	});
  	},
  	SubCatagoryOptions: function () {


  		var pc = AutoForm.getFieldValue('parentCategory',"job_create_form") || false;
  		console.log(pc)
  		console.log(Categories.find({parentCategory:pc}).count());
  		var sccount = Categories.find({parentCategory:pc}).count();
  		if (sccount > 0){

  			return Categories.find({parentCategory:pc}).map(function (c) {
		    	console.log(c)
		    	if(c){
		    		   	return {label: c.name, value: c._id};
		    	}
		
	   
    		});

  		}
    	
    	else {

    		setTimeout(() => {
			$('.subCategory').dropdown('clear');
			console.log("Could not find sub categories")
			}, 1000); 
    		console.log($(".subCategory"))
    		return {label: "Choose a parent category", value: 0000000000000000};
    		
    	}
  	}

});


