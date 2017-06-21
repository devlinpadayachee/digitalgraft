import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '/imports/api/jobs.js';
import { Categories } from '/imports/api/categories.js';
import { Moment } from 'meteor/momentjs:moment';


Template.admin_jobs.helpers({
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
                { key: 'parentCategory', label: 'Parent Category', fn: function(value, object, key) { return Categories.findOne(value).name } },
                { key: 'subCategory', label: 'Sub Category', fn: function(value, object, key) { return Categories.findOne(value).name } },
                { key: 'createdAt', label: 'Created', fn: function(value, object, key) { return moment(new Date(value)).fromNow(); } },
                { key: 'seller', label: 'Seller', fn: function(value, object, key) { return Meteor.users.findOne(value).auxdata.name; } },
                { key: 'purchasedTimes', label: 'Purchased' },
                { key: 'status', label: 'Status' },
                { key: 'actions', label: 'Actions', tmpl: Template.admin_job_table_view_cell }
            ]
        };
    }
});

Template.admin_job_table_view_cell.helpers({
    JobsCollection: function() {
        return Jobs; //Return the Jobs Collection relating to the schema
    },
    deleteError: function() {
        return function(error) { alert("Could not delete job");
            console.log(error); };
    },
    deleteSuccess: function() {
        return function(result) { alert("Job deleted"); };
    },
    deleteBeforeRemove: function() {
        return function(collection, id) {
            var doc = collection.findOne(id);
            if (confirm('Really delete "' + doc.title + '"?')) {
                this.remove();
            }
        };
    }

});

