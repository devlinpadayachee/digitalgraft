import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Categories } from '/imports/api/categories.js';
import { AutoForm } from 'meteor/aldeed:autoform';
import { ReactiveDict } from 'meteor/reactive-dict';
import './admin_category_create.html';
import { loadCategories } from '/imports/api/methods.js';


Template.admin_category_create.onCreated(function() {
	console.log("Category Create Created");
})



Template.admin_category_create.onRendered(function() {

	this.errors = new ReactiveDict();
	$('.ui.form.bulk_load_categories').form({
		fields: {

			csvloader: {
				identifier: 'csvloader',
				rules: [{
					type: 'empty',
					prompt: 'Please enter the csv data to create the categories'
				}]
			}
		}
	});

	$('.ui.progress').progress({
		duration: 100,
		total: 100,
		text: {
			active: '{value} of {total} done'
		}
	});

	$('.cloudinary-fileupload').bind('fileuploadprogress', function(e, data) {

		var per = Math.round((data.loaded * 100.0) / data.total)
		if (per > 0 && per < 100) {
			console.log(per)
			$('.ui.progress').data("percent", per);

		} else if (per == 100) {
			$('.determinate').css('width', per + '%');
			$('#uploadprogress').data("percent", per);
		} else {
			console.log("start")
		}

	});


	AutoForm.addHooks(null, {
		onError: function(name, error, template) {
			console.log(name + " error:", error);
		},
		onSuccess: function(formType, result) {
			console.log(result)
		}
	});


	$('div.afCloudinary button').addClass('ui blue button');

	console.log("Category Create Rendered")

});

Template.admin_category_create.helpers({
	CategoriesCollection: function() {
		return Categories; //Return the Jobs Collection relating to the schema
	},
	DefaultCategoryData:function(){
		return 	'{"name" : "Digital and Marketing"}</br>'+
				'{"name" : "Programming and Development"}';
	}

});

Template.admin_category_create.events({

   'submit .bulk_load_categories'(event, instance) {
   	
    const data = {
      csvloader: event.target.csvloader.value
    };
    console.log("Running CSV Loader Method")
    loadCategories.call(data, (err, res) => {
      if (err) {
        console.log(err)
        if (err.error === 'validation-error') {
          // Initialize error object
          const errors = {
            csvloader: []
          };

          // Go through validation errors returned from Method
          err.details.forEach((fieldError) => {
            // XXX i18n
            errors[fieldError.name].push(fieldError.type);
          });

          // Update ReactiveDict, errors will show up in the UI
          instance.errors.set(errors);
        }
      }
    });
    event.preventDefault();
  }
});
