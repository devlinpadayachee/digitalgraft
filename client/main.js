// import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Bootstrap } from '/imports/api/bootstrap.js';
import { Categories } from '/imports/api/categories.js';
import { StaticText } from '/imports/api/statictext.js';
// import { particlesJS } from 'meteor/newswim:particles';



Meteor.startup(function() {


});

Template.header.onRendered(function() {

	$('.login-button').addClass('ui blue button');
	$('.menu .browse')
		.popup({
			inline: true,
			hoverable: true,
			position: 'bottom left',
			lastResort : 'bottom right',
			delay: {
				show: 300,
				hide: 800
			}
		});

});

Template.frontpageheader.onRendered(function() {
	$('.menu .browse')
		.popup({
			inline: true,
			hoverable: true,
			position: 'bottom left',
			lastResort : 'bottom right',
			delay: {
				show: 300,
				hide: 800
			}
		});

});

Template.footer.onCreated(function() {

	// let settings = '/js/ps_settings.json';
	//   this.autorun(() => {
	//     if (particlesJS) {
	//       console.log(`loading particles.js config from "${settings}"...`)
	//        // particlesJS.load(@dom-id, @path-json, @callback (optional)); 
	//       particlesJS.load('particles-js', settings, function () {
	//         console.log('callback - particles.js config loaded');
	//       });
	//     }
	// });

});

Template.header.helpers({

	Categories: function() {
		return Categories.find({}); //Return the Categories Data as Objects
	},
	Language: function () {
  		return StaticText.findOne({name : Meteor.settings.public.LANGUAGE});
  	},
	SubCategories: function() {
        
        var SubCategoriesCount = Categories.find({parentCategory:this._id}).count();
        if (SubCategoriesCount > 0){
        	return Categories.find({parentCategory:this._id});
        }
        else {

        	return [{name : "No Sub-Categories",imageUrl:"/images/Icon_150x150.png"}];
        }

    }
});

Template.frontpageheader.helpers({

	Categories: function() {
		return Categories.find({}); //Return the Categories Data as Objects
	},
	Language: function () {
  		return StaticText.findOne({name : Meteor.settings.public.LANGUAGE});
  	},
	SubCategories: function() {
        
        var SubCategoriesCount = Categories.find({parentCategory:this._id}).count();
        if (SubCategoriesCount > 0){
        	return Categories.find({parentCategory:this._id});
        }
        else {

        	return [{name : "No Sub-Categories",imageUrl:"/images/Icon_150x150.png"}];
        }

    }
});

Template.footer.helpers({

	Categories: function() {
		return Categories.find({}); //Return the Categories Data as Objects
	}
});

