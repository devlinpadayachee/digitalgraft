import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Categories } from '/imports/api/categories.js';
import { Jobs } from '/imports/api/jobs.js';
import { Orders } from '/imports/api/orders.js';
import { Moment } from 'meteor/momentjs:moment';


Template.admin_dashboard.onRendered(function() {


})

Template.admin_dashboard.helpers({
    userCount: function() {
       return Meteor.users.find().count();
    },
    categoriesCount: function() {
       return Categories.find().count();
    }, 
    jobsCount: function() {
       return Jobs.find().count();
    }, 
    ordersCount: function() {
       return Orders.find().count();
    }      
});