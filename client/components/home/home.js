import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Categories } from '/imports/api/categories.js';
import { Jobs } from '/imports/api/jobs.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { StaticText } from '/imports/api/statictext.js';
import { particlesJS } from 'meteor/newswim:particles';
import '../reusable/reusable.html';

Template.home.onCreated(function() {

	this.state = new ReactiveDict();


	this.autorun(function() {
    // hack to force the autorun to reevaluate
    	Template.currentData();
		$('.recentjobsrow')
		  .visibility({
		    once: false,
		    offset: 2,
		    // update size when new content loads
		    observeChanges: true,
		    // load content on bottom edge visible
		    onBottomVisible: function() {
		       	console.log("infiniateScroll ... called.");
	            alert('inifiniateScroll ... called.');
		    }
		});
	});

});

Template.home.onRendered(function() {


   

		$('.featuresrow')
		  .visibility({
		    once: true,
		    // update size when new content loads
		    observeChanges: true,
		    // load content on bottom edge visible
		    onBottomVisible: function() {
		    		$('.featuresitem').transition({
						animation: 'fly right in',
						interval: 100,
						duration : 800
					});
		       
		    }
		});



	$('.cards .image').dimmer({
		on: 'hover'
	});


// 	$('.cards .image').transition({
// 		animation: 'pulse',
// 		reverse: true,
// 		interval: 100
// 	}).transition('horizontal flip in');
// // 

	$('.introsegments').transition({
	    animation : 'pulse in',
	    duration  : 1000,
	    interval  : 300
	 });

    $('.optextholder').transition({
		animation: 'fade in',
		duration  : 3000,
		interval: 1000,

	});

    // user's code to initialise parallaxes


 	  

});



Template.home.helpers({
	Language: function () {
  		return StaticText.findOne({name : Meteor.settings.public.LANGUAGE});
  	},
	Categories: function() {
		return Categories.find({}); //Return the Categories Data as Objects
	},
	FeaturedCategoryRailData: function() {
		const instance = Template.instance();
		return instance.state.get('featured_category_rail_data')
	},
	JobsPerCategory: function() {
		return Jobs.find({}).count; //Return the Categories Data as Objects
	},
	RecentJobs: function() {
		return Jobs.find({}); //Return the Categories Data as Objects
	}



});

Template.home.events({

	'mouseenter  .featured-card': function(event, instance) {
		instance.state.set('featured_category_rail_data', this.tags);
		$('.featured_categories_rail').show();
	},
	'mouseleave .featured-card': function(event, instance) {

		$('.featured_categories_rail').hide();

	}
});

Template.featured_category.helpers({

	JobsPerCategory: function() {
		return Jobs.find({parentCategory : this._id}).count(); //Return the Categories Data as Objects
	}


});

