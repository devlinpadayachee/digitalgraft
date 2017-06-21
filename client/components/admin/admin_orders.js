import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Categories } from '/imports/api/categories.js';
import { Jobs } from '/imports/api/jobs.js';
import { Moment } from 'meteor/momentjs:moment';
import { Orders } from '/imports/api/orders.js';

Template.admin_orders.helpers({
    Orders: function() {
        return Orders.find({}); //Return the Jobs Data as Objects
    },
    OrdersTableSettings: function() {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { 
                    key: '_id', 
                    label: 'Id'
                },
                { 
                    key: 'job', 
                    label: 'Job', 
                    fn: function(value, object, key) { 

                        if (value) {
                            return "I will " + Jobs.findOne(value).title;
                        } else {
                            return 'none';
                        } 



                    } 
                },
                { 
                    key: 'buyer', 
                    label: 'Buyer', 
                    fn: function(value, object, key) { 

                        let user = Meteor.users.findOne(value);
                            if ( user ) {
                                return user.auxdata.name;
                            }

                            else {
                                return 'none';
                            } 

                    } 
                },
                { 
                    key: 'seller', 
                    label: 'Seller', 
                    fn: function(value, object, key) { 

                        let user = Meteor.users.findOne(value);
                            if ( user ) {
                                return user.auxdata.name;
                            }

                            else {
                                return 'none';
                            } 

                    } 
                },
                { 
                    key: 'status', 
                    label: 'Status', 
                    fn: function(value, object, key) { 

                       return value



                    } 
                },
                { key: 'createdAt', label: 'Created', fn: function(value, object, key) { return moment(new Date(value)).fromNow();; } },
                { key: 'view', label: 'View', tmpl: Template.admin_order_table_view_cell }

            ]
        };
    }
});