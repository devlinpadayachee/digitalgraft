import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '/imports/api/jobs.js';
import { Categories } from '/imports/api/categories.js';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Moment } from 'meteor/momentjs:moment';
import { ReactiveDict } from 'meteor/reactive-dict';
import './seller_jobs.html';

Template.seller_jobs.onCreated(function() {

  this.autorun(() => {
    this.subscribe('jobsbyloggedinuser');
  });

});



Template.seller_jobs.helpers({
    Jobs: function() {
        return Jobs.find({}); //Return the Jobs Data as Objects
    },
    JobsTableSettings: function() {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: 'title', label: 'Title', fn: function(value, object, key) { return "I will " + value; } },
                { key: 'price', label: 'Price' },
                // { key: 'parentCategory', label: 'Parent Category', fn: function(value, object, key) { return Categories.findOne(value).name } },
                // { key: 'subCategory', label: 'Sub Category', fn: function(value, object, key) { return Categories.findOne(value).name } },
                { key: 'createdAt', label: 'Created', fn: function(value, object, key) { return moment(new Date(value)).fromNow(); } },
                // { key: 'seller', label: 'seller', fn: function(value, object, key) { return Meteor.users.findOne(value).auxdata.name; } },
                { key: 'purchasedTimes', label: 'Purchased' },
                { key: 'status', label: 'Status' },
                { key: 'actions', label: 'Actions', tmpl: Template.seller_job_table_view_cell }
            ]
        };
    }
});