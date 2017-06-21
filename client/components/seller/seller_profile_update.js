import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Moment } from 'meteor/momentjs:moment';
import { ReactiveDict } from 'meteor/reactive-dict';
import { updateUser } from '/imports/api/methods.js';


Template.seller_profile_update.onRendered(function() {
  this.errors = new ReactiveDict();

  $('.ui.form.users_details').form({
    fields: {

      bio: {
        identifier: 'bio',
        rules: [{
          type: 'empty',
          prompt: 'Please enter your profiles bio'
        }, {
          type: 'maxLength[500]',
          prompt: 'Your profiles bio cannot exceed {ruleValue} characters'
        }, {
          type: 'minLength[4]',
          prompt: 'Your profiles bio cannot be less than {ruleValue} characters'
        }]
      },
      tagline: {
        identifier: 'tagline',
        rules: [{
          type: 'empty',
          prompt: 'Please enter your profiles tagline'
        }, {
          type: 'maxLength[40]',
          prompt: 'Your profiles tagline cannot exceed {ruleValue} characters'
        }, {
          type: 'minLength[4]',
          prompt: 'Your profiles tagline cannot be less than {ruleValue} characters'
        }]
      }

    }
  });



	
});

Template.seller_profile_update.onCreated(function() {
});



Template.seller_profile_update.helpers({	
	
    	
});

Template.seller_profile_update.events({

   'submit .users_details'(event, instance) {
    const data = {
      bio: event.target.bio.value,
      yearsexperience : parseInt(event.target.yearsexperience.value),
      tagline : event.target.tagline.value
    };
    console.log("Running Method")
    updateUser.call(data, (err, res) => {
      if (err) {
        console.log(err)
        if (err.error === 'validation-error') {
          // Initialize error object
          const errors = {
            bio: [],
            yearsexperience : [],
            tagline : []
          };

          // Go through validation errors returned from Method
          err.details.forEach((fieldError) => {
            // XXX i18n
            errors[fieldError.name].push(fieldError.type);
          });

          // Update ReactiveDict, errors will show up in the UI
          instance.errors.set(errors);
        }
      }
    });
    event.preventDefault();
  }
});

