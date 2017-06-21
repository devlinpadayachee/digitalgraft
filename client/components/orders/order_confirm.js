import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '/imports/api/jobs.js';
import { Categories } from '/imports/api/categories.js';
import { Orders } from '/imports/api/orders.js';
import { StaticText } from '/imports/api/statictext.js';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Moment } from 'meteor/momentjs:moment';
import { ReactiveDict } from 'meteor/reactive-dict';
import { createOrder } from '/imports/api/methods.js';

Template.order_confirm.onRendered(function() {
 
	
});

Template.order_confirm.onCreated(function() {


});



Template.order_confirm.helpers(
{	

});


Template.order_confirm.events({

  'click .orderbutton'(event, instance) {
    console.log(this);
    var job_id = this["_id"];
    delete this["_id"]; 
    
    const data = {
      job: job_id,
      jobDetails : this,
      price : this.price,
      information : "",
      seller : this.seller
    };
    console.log(data)
    console.log("Running Order Create Method")
    createOrder.call(data, (err, res) => {
      if (err) {
        console.log(err)
      }
      console.log(res)
    });
    event.preventDefault();
  }

});

