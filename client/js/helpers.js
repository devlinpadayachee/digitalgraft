import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Categories } from '/imports/api/categories.js';
import { AutoForm } from 'meteor/aldeed:autoform';



Template.registerHelper( 'idtoname', (id) => {
  let user = Meteor.users.findOne(id);
  if ( user ) {
    return user.auxdata.name;
  }
  else return "unknown";
});

Template.registerHelper( 'idtopicture', (id) => {
  let user = Meteor.users.findOne(id);
  if ( user ) {
    return user.auxdata.picture;
  }
});

Template.registerHelper( 'categoryidtoname', (id) => {
  let category = Categories.findOne(id);
  if ( category ) {
    return category.name;
  }
});


Template.registerHelper( 'statusformatter', (status,role) => {
 
  switch (status) {
    case 'waiting on seller confirmation':
        if (role == 'buyer'){

          return "<span class='wordwrap dgyellow'>The Seller must confirm that the information supplied by you is sufficient and correct to start the Order.</span>";    
        }
        else if (role == 'seller'){

          return "<span class='wordwrap dgyellow'>You must confirm that the information supplied by the Buyer is sufficient and correct to start the Order.</span>";
          
        }
        else return "Error in determining status";
        
        break;
    case 'in progress':
        return "Order is in progress";
        break;
    case 'requires seller revision':
        return "Revision requested";
        break;
    case 'waiting for buyer review' :
        return "Please review the order and mark as completed, remember to review the Seller.";
        break;
    case 'completed':
        return "The Order has been completed";
        break;
    case 'pending cancellation':
        return "Order is pending cancellation";
        break;
    case 'cancelled':
        return "Order has been cancelled";
        break;
    case 'deleted':
        return "Order has been deleted";
        break;
    case 'error':
        return "Order has encountered an error, contact support!";
        break;
    default : return 'error';
  } 
});

Template.registerHelper( 'formatteddate', (date) => {

  return moment(new Date(date)).fromNow();
});

Template.registerHelper( 'formatteddatenice', (date) => {
  if (date instanceof Date)
    {
      return moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a');
    }
  else return date;
  
});

