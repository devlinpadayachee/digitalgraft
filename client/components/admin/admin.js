import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.admin_menu.onRendered(function() {

	// $('.ui .item').on('click', function() {
	// 	$('.ui .item').removeClass('active');
	// 	$(this).addClass('active');
	// });

	$('.ui.dropdown').dropdown({hover: true,on : "hover"});

})

Template.admin_menu.helpers({

});
