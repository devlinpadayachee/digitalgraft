import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Categories } from '/imports/api/categories.js';
import { ReactiveDict } from 'meteor/reactive-dict';


Template.sub_categories.onCreated(function() {

	this.state = new ReactiveDict();

});


Template.sub_categories.onRendered(function() {
	
	$('.cards .image').dimmer({
	 	on: 'hover'
	});
	console.log(this)
	$('.banner-alt').css('background-image','url('+this.data.imageUrlLarge+')');

	// $('.banner').transition({
	//     animation : 'pulse',
	//     reverse   : true,
	//     interval  : 200
 //  	});

	$('.cards .image').transition({
	    animation : 'pulse',
	    reverse   : true,
	    interval  : 400
  	}).transition('horizontal flip in');

});



Template.sub_categories.helpers(
{	

    SubCategories: function() {
        return Categories.find({parentCategory:this._id}); //Return the Categories Data as Objects
    },
	SubCategoryRailData : function () {
		const instance = Template.instance();
		return instance.state.get('sub_category_rail_data')
	}
    	
    	
});

Template.sub_categories.events({
	'mouseenter  .sub_category-card': function(event,instance) {
		instance.state.set('sub_category_rail_data',this.tags);
		$('.sub_categories_rail').show();
	},
	'mouseleave .sub_category-card' : function(event,instance){

		$('.sub_categories_rail').hide();
	
	}

});
