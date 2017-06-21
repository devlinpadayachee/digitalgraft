import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '/imports/api/jobs.js';
import { Categories } from '/imports/api/categories.js';
import { StaticText } from '/imports/api/statictext.js';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Moment } from 'meteor/momentjs:moment';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Files } from '/imports/api/fileloaders.js';
import { updateOrderStatus } from '/imports/api/methods.js';
import { updateOrderReview } from '/imports/api/methods.js';


Template.order_view.onRendered(function() {


  var currentTemplate = this;
  this.autorun(function() {
    // hack to force the autorun to reevaluate
    Template.currentData();
    $('.starrating').rating({
      initialRating: 1,
      maxRating: 5,
      onRate: function(rating) {
        console.log(rating)
        currentTemplate.currentRating.set('currentRating', rating);
      }
    });

    $('.editrating').rating({
      initialRating: currentTemplate.data.rating,
      maxRating: 5,
      onRate: function(rating) {
        console.log(rating);
        currentTemplate.editRating.set('editRating', rating);
      }
    });

    $('.displayrating').rating({
      initialRating: currentTemplate.data.rating,
      maxRating: 5,
      onRate: function(rating) {
        console.log(rating);
        currentTemplate.editRating.set('editRating', rating);
      }
    });

    $('.displayrating').rating('disable');

    $('.ui.form.review_details').form({
      fields: {
        rating: {
          identifier: 'rating',
          rules: [{
            type: 'empty',
            prompt: 'Please enter your rating'
          }, {
            type: 'integer[1..5]',
            prompt: 'Please enter a rating from 1-5'
          }]
        },
        review: {
          identifier: 'review',
          rules: [{
            type: 'empty',
            prompt: 'Please enter your review'
          }, {
            type: 'maxLength[200]',
            prompt: 'Your review cannot exceed {ruleValue} characters'
          }, {
            type: 'minLength[4]',
            prompt: 'Your review cannot be less than {ruleValue} characters'
          }]
        }

      }
    });

    $('.ui.form.update_review_details').form({
      fields: {
        rating: {
          identifier: 'editratinginput',
          rules: [{
            type: 'empty',
            prompt: 'Please enter your rating'
          }, {
            type: 'integer[1..5]',
            prompt: 'Please enter a rating from 1-5'
          }]
        },
        review: {
          identifier: 'editreview',
          rules: [{
            type: 'empty',
            prompt: 'Please enter your review'
          }, {
            type: 'maxLength[200]',
            prompt: 'Your review cannot exceed {ruleValue} characters'
          }, {
            type: 'minLength[4]',
            prompt: 'Your review cannot be less than {ruleValue} characters'
          }]
        }

      }
    });

  });




  // Single Conversation Instance


});

Template.order_view.onCreated(function() {

  this.currentMessage = new ReactiveDict();
  this.currentRating = new ReactiveDict();
  this.currentRating.set('currentRating', 1);
  this.editRating = new ReactiveDict();
  this.editRating.set('editRating', this.data.rating);
  this.currentMessage.set('currentMessage', "");
  this.Order = new ReactiveDict();
  this.Order.set('buyer', this.data.buyer);
  this.Order.set('seller', this.data.seller);
  this.Order.set('order', this.data._id);
  console.log(this)

});



Template.order_view.helpers({
  Language: function() {
    return StaticText.findOne({
      name: Meteor.settings.public.LANGUAGE
    });
  },
  Buyer: function() {
    return Meteor.users.findOne({
      _id: this.buyer
    });
  },
  Seller: function() {
    return Meteor.users.findOne({
      _id: this.seller
    });
  },
  CurrentStarRating: function() {
    const instance = Template.instance()
    return instance.currentRating.get('currentRating');
  },
  EditStarRating: function() {
    const instance = Template.instance()
    return instance.editRating.get('editRating');
  },
  StatusColour: function() {
    console.log(status);
    if (this.status == 'in progress') {
      return 'green';
    } else if (this.status == 'delivered') {
      return 'violet';
    } else if (this.status == 'revision') {
      return 'orange';
    } else if (this.status == 'review') {
      return 'yellow';
    } else if (this.status == 'completed') {
      return 'green';
    } else return 'disabled';
  },
  StatusColourProgress: function(step) {
    console.log(step, this.status);
    if (this.status == step) {
      if (this.status == 'in progress') {
        return 'green';
      } else if (this.status == 'delivered') {
        return 'violet';
      } else if (this.status == 'revision') {
        return 'orange';
      } else if (this.status == 'review') {
        return 'yellow';
      } else if (this.status == 'completed') {
        return 'green';
      } else return 'active';;
    } else if (step == 'in progress' && (this.status == 'delivered' || this.status == 'revision' || this.status == 'review' || this.status == 'completed')) {
      return 'completed';
    } else if (step == 'delivered' && (this.status == 'revision' || this.status == 'review' || this.status == 'completed')) {
      return 'completed';
    } else if (step == 'revision' && (this.status == 'review' || this.status == 'completed')) {
      return 'completed';
    } else if (step == 'review' && (this.status == 'completed')) {
      return 'completed';
    } else return 'disabled';
  },

  ProgressCalculator: function(step) {
    console.log(step, this.status);
    if (this.status == step) {
      return 'active';
    } else if (step == 'in progress' && (this.status == 'delivered' || this.status == 'revision' || this.status == 'review' || this.status == 'completed')) {
      return 'completed';
    } else if (step == 'delivered' && (this.status == 'revision' || this.status == 'review' || this.status == 'completed')) {
      return 'completed';
    } else if (step == 'revision' && (this.status == 'review' || this.status == 'completed')) {
      return 'completed';
    } else if (step == 'review' && (this.status == 'completed')) {
      return 'completed';
    } else return 'disabled';
  },
  Messages: function() {
    var conversation = Meteor.conversations.findOne({
      _id: Template.currentData().conversation
    })
    return conversation.messages(0, 0, "date", "desc")

  },
  chatDirection: function() {

    if (this.userId == Template.parentData().buyer) {
      return "bubblebuyer";
    }

    if (this.userId == Template.parentData().seller) {
      return "bubbleseller";
    }


  },
  disableSend: function() {

    var text = Template.instance().currentMessage.get('currentMessage');
    console.log(text)
    if (text.length == 0) {

      return "disabled"
    }

  },
  isDeactivated: function() {
    var text = Template.instance().currentMessage.get('currentMessage');
    if (text.length > 0) {
      return false;
    } else return true;

  }

});

Template.order_view.events({

  'keyup [name=message]': function(event, instance) {
    var text = $('[name="message"]').val();
    instance.currentMessage.set('currentMessage', text);
    if (event.which == 13) {
      var conversation = Meteor.conversations.findOne({
        _id: Template.currentData().conversation
      })

      if (text !== '') {

        conversation.sendMessage(text);

      }
      $('[name="message"]').val('');
    }
  },
  'click [name="sendmessage"]': function(event, instance) {
    console.log("hit")
    event.preventDefault();
    var conversation = Meteor.conversations.findOne({
      _id: Template.currentData().conversation
    })
    var text = $('[name="message"]').val();
    if (text !== '') {

      instance.currentMessage.set('currentMessage', text);
      conversation.sendMessage(text);

    }
    $('[name="message"]').val('');

  },
  'click .jobinstructionsmodallink': function(event, instance) {


    $('.ui.basic.modal').modal('show');
    console.log("hit")
    event.preventDefault();


  },
  'click .markasdeliveredbutton': function(event, instance) {

    console.log(this);
    const data = {
      orderId: this._id,
      status: "delivered"
    };
    updateOrderStatus.call(data, (err, res) => {
      if (err) {
        console.log(err)
        if (err.error === 'validation-error') {
          console.log(err)
        }
      }
      console.log(res)
    });
    event.preventDefault();
  },
  'click .markasinprogress': function(event, instance) {

    console.log(this);
    const data = {
      orderId: this._id,
      status: "in progress"
    };
    updateOrderStatus.call(data, (err, res) => {
      if (err) {
        console.log(err)
        if (err.error === 'validation-error') {
          console.log(err)
        }
      }
      console.log(res)
    });
    event.preventDefault();
  },
  'click .markasrevisionbutton': function(event, instance) {

    console.log(this);
    const data = {
      orderId: this._id,
      status: "revision"
    };
    updateOrderStatus.call(data, (err, res) => {
      if (err) {
        console.log(err)
        if (err.error === 'validation-error') {
          console.log(err)
        }
      }
      console.log(res)
    });
    event.preventDefault();
  },
  'click .markasacceptedbutton': function(event, instance) {

    console.log(this);
    const data = {
      orderId: this._id,
      status: "review"
    };
    updateOrderStatus.call(data, (err, res) => {
      if (err) {
        console.log(err)
        if (err.error === 'validation-error') {
          console.log(err)
        }
      }
      console.log(res)
    });
    event.preventDefault();
  },
  'submit .review_details': function(event, instance) {

    console.log(this);
    const data = {
      orderId: this._id,
      status: "completed",
      rating: parseInt(event.target.rating.value),
      review: event.target.review.value
    };
    updateOrderStatus.call(data, (err, res) => {
      if (err) {
        console.log(err)
        if (err.error === 'validation-error') {
          console.log(err)
        }
      }
      console.log(res)
    });
    event.preventDefault();
  },
  'submit .update_review_details': function(event, instance) {

    console.log(this);
    const data = {
      orderId: this._id,
      rating: parseInt(event.target.editratinginput.value),
      review: event.target.editreview.value
    };
    console.log(data);
    updateOrderReview.call(data, (err, res) => {
      if (err) {
        console.log(err)
        if (err.error === 'validation-error') {
          console.log(err)
        }
      }
      console.log(res)
    });
    event.preventDefault();
  }
});

Template.uploadedFiles.helpers({
  uploadedFiles: function() {
    return Files.find({
      'meta._id': this._id
    });
  }
});

Template.uploadForm.onCreated(function() {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function() {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadForm.events({
  'change #fileInput': function(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // there was multiple files selected
      var file = e.currentTarget.files[0];
      if (file) {

        console.log(this)
        var uploadInstance = Files.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic',
          meta: this
        }, false);

        uploadInstance.on('start', function() {
          template.currentUpload.set(this);
        });

        uploadInstance.on('end', function(error, fileObj) {
          if (error) {
            alert('Error during upload: ' + error.reason);
          } else {
            alert('File "' + fileObj.name + '" successfully uploaded');
          }
          template.currentUpload.set(false);
        });

        uploadInstance.start();
      }
    }
  }
});

