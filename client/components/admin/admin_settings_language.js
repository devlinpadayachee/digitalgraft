import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';
import { StaticText } from '/imports/api/statictext.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import './admin_settings_language.html';


Template.admin_settings_language.onCreated(function() {
  this.state = new ReactiveDict();
});


Template.admin_settings_language.onRendered(function() {

})

Template.admin_settings_language.helpers({

    StaticTextCollection: function() {
        return StaticText; //Return the Jobs Data as Objects
    },
    StaticText: function() {
        return StaticText.find({}); //Return the Static Data as Objects
    },
    DefaultSelectLanguage: function() {
        return Meteor.settings.public.LANGUAGE; 
    },
    CurrentLang:function(){

        const instance = Template.instance();
        return StaticText.findOne(instance.state.get('language'));
 
    }
      
});

Template.admin_settings_language.events({
  'change .select-language': function(event, template) {
      console.log("value changed:" + $(event.target).val());
      template.state.set('language', $(event.target).val());
      console.log(template.state.get('language'));
  }
});