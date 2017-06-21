import { Avatar } from 'meteor/utilities:avatar';
import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';
import { StaticText} from '/imports/api/statictext.js';
import { Categories} from '/imports/api/categories.js';


if (Meteor.isServer) {

	Meteor.startup(() => {

		console.log("Running server startup scripts")


		// if (Categories.find().fetch().length === 0) {

		// 	console.log('Creating default categories ');
		// 	Categories.insert({name: 'English'});

		// }

		if (StaticText.find().fetch().length === 0) {

			console.log('Creating default static language entry ');
			StaticText.insert({
				name: 'English',
				lang: {

					welcome_text: "Welcome to DigitalGraft",
					welcome_subtext: "Digital IT Services for your Business from as little as R100 per Job"
				}
			});

		}

	});

};



if (Meteor.isClient) {

	Meteor.startup(() => {
		AutoForm.setDefaultTemplate('semanticUI');
	});

	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_EMAIL'
	});

	// Client side account creation is disabled by default:
	// the methos ATCreateUserServer is used instead!
	// to actually disable client side account creation use:
	//
	//    AccountsTemplates.config({
	//        forbidClientAccountCreation: true
	//    });
};

// Accounts.config({
// 	forbidClientAccountCreation: false
// });



//////These are for the gravatar

var customColorScheme = function(user) {
	return "#2f81c3";
};

Avatar.setOptions({
	fallbackType: "default image",
	defaultImageUrl: "/images/DigitalGraft_logo_01_whitebackground_150x150_actual.png",
	backgroundColor: customColorScheme,
	// gravatarDefault: "identicon"
});


console.log("Setting Avatar")


