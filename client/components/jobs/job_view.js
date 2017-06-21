import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '/imports/api/jobs.js';
import { Categories } from '/imports/api/categories.js';
import { Moment } from 'meteor/momentjs:moment';
import { ReactiveDict } from 'meteor/reactive-dict';


Template.job_view.onRendered(function() {

	$('.ui.accordion').accordion({exclusive : false});
	$('#gallery').justifiedGallery({
  // option: default,
	  rowHeight: 200,
	  maxRowHeight: 200,
	  lastRow: 'nojustify',
	  fixedHeight: true,
	  captions: false,
	  margins: 1,
	  randomize: false,
	  extension: /.[^.]+$/,
	  refreshTime: 250,
	  waitThumbnailsLoad: true,
	  justifyThreshold: 0.35,
	  cssAnimation: false,
	  imagesAnimationDuration: 300
	}).on('jg.complete', function (e) {

		$('.fancybox').fancybox({openEffect  : 'elastic'});

	  // this callback runs after the gallery layout is created
	}).on('jg.resize', function (e) {
	  // this callback runs after the gallery is resized
	}).on('jq.rowflush', function (e) {
	  // this callback runs when a new row is ready
	});

});



Template.job_view.helpers(
{	

    Seller : function() {

    	return Meteor.users.findOne(this.seller);
    },
    SellerID : function() {

    	return Meteor.users.findOne(this.seller)._id;
    }
    	
    	
});