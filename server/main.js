import { Meteor } from 'meteor/meteor';
import'../imports/api/statictext.js';
import'../imports/api/jobs.js'; 
import'../imports/api/categories.js';
import'../imports/api/orders.js';
import'../imports/api/methods.js';
import'../imports/api/fileloaders.js';   
import { Bootstrap} from '/imports/api/bootstrap.js';



Meteor.publish("allUserData", function () {
    return Meteor.users.find({},{fields:{'auxdata': 1,
                                         'createdAt' : 1,
                                         'services.facebook.id' : 1,
                                         'services.twitter.profile_image_url_https' : 1,
                                         'services.facebook.id' : 1,
                                         'services.google.picture' : 1,
                                         'services.github.username' : 1,
                                         'services.instagram.profile_picture' : 1,
                                         'services.linkedin.pictureUrl' : 1
                                        }
                                });
});

Meteor.publish(null, function (){
  return Meteor.roles.find({})
});

Meteor.users.after.insert(function (userId, doc) {
    console.log(userId,doc)
    if (Meteor.users.find().fetch().length === 1) {
        console.log("Setting Admin")
        Roles.addUsersToRoles(doc._id, ['admin'], Roles.GLOBAL_GROUP);
    }
  
});

Meteor.users.deny({
  update: function() {
    return true;
  }
});

Accounts.onCreateUser( ( options, user )=> {
    

	console.log("Running custom create user")

    user.auxdata  = getAuxdata( user );
	
    function getAuxdata( user ) {

        let service = user.services;
        let network = _.keys( service )[ 0 ];
        let data    = service[ network ];
        let auxdata = {};
        if ( network === 'facebook' ) {
            auxdata.network = network;
            auxdata.id      = data.id;
            auxdata.email   = data.email;
            auxdata.name    = data.name;
            auxdata.locale  = data.locale;
            auxdata.gender  = data.gender;
            auxdata.picture = 'http://graph.facebook.com/' + data.id + '/picture?type=square';
            auxdata.bio = "None";
            auxdata.yearsexperience = 0;
            auxdata.joblimit = 3;
            auxdata.tagline = "I love DigitalGraft";
        }

        else if ( network === 'google' ) {
            auxdata.network = network;
            auxdata.id      = data.id;
            auxdata.email   = data.email;
            auxdata.name    = data.name;
            auxdata.locale  = data.locale;
            auxdata.picture = data.picture;
            auxdata.bio = "None";
            auxdata.yearsexperience = 0;
            auxdata.joblimit = 3;
            auxdata.tagline = "I love DigitalGraft";
        }

        else if ( network === 'twitter' ) {
            auxdata.network = network;
            auxdata.id      = data.id;
            auxdata.email   = data.email;
            auxdata.name    = data.screenName;
            auxdata.locale  = data.lang;
            auxdata.picture = data.profile_image_url_https;
            auxdata.bio = "None";
            auxdata.yearsexperience = 0;
            auxdata.joblimit = 3;
            auxdata.tagline = "I love DigitalGraft";

        }
        else if ( network === 'password' ) {
            auxdata.network = network;
            auxdata.id      = user._id;
            auxdata.email   = user.emails[0].address;
            auxdata.name    = user.username;
            auxdata.locale  = 'en';
            auxdata.picture = '/images/default_job.jpg';
            auxdata.bio = "None";
            auxdata.yearsexperience = 0;
            auxdata.joblimit = 3;
            auxdata.tagline = "I love DigitalGraft";
        }


        return auxdata;
    }


   

    Meteor.users.update( user._id, {
        $set: {
            auxdata: user.auxdata,
        }
    } );

  
    if (options.profile)
    user.profile = options.profile;

    return user;

} );
