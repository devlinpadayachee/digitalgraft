import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Categories } from '/imports/api/categories.js';
import { Moment } from 'meteor/momentjs:moment';



Template.admin_categories.helpers({
    Categories: function() {
        return Categories.find({}); //Return the Jobs Data as Objects
    },
    CategoriesCollection: function() {
        return Categories; //Return the Jobs Collection relating to the schema
    },
    CategoriesTableSettings: function() {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: 'name', label: 'Name', fn: function(value, object, key) { return value; } },
                { key: 'featured', label: 'Featured', fn: function(value, object, key) { if (value) { return 'yes' } else { return 'no' } } },
                {
                    key: 'parentCategory',
                    label: 'Parent Category',
                    fn: function(value, object, key) {

                        if (value) {
                            return Categories.findOne(value).name
                        } else {
                            return 'none';
                        }


                    }
                },
                { key: 'createdAt', label: 'Created', fn: function(value, object, key) { return moment(new Date(value)).fromNow();; } },
                { key: 'view', label: 'View', tmpl: Template.admin_category_table_view_cell }

            ]
        };
    }
});

Template.admin_category_table_view_cell.helpers({
    CategoriesCollection: function() {
        return Categories; //Return the Jobs Collection relating to the schema
    },
    deleteError: function() {
        return function(error) { alert("Could not delete category");
            console.log(error); };
    },
    deleteSuccess: function() {
        return function(result) { alert("Category deleted"); };
    },
    deleteBeforeRemove: function() {
        return function(collection, id) {
            var doc = collection.findOne(id);
            if (confirm('Really delete "' + doc.name + '"?')) {
                this.remove();
            }
        };
    }
});

