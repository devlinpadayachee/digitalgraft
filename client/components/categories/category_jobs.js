import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Categories } from '/imports/api/categories.js';
import { Jobs } from '/imports/api/jobs.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import '../reusable/reusable.html';

Template.category_jobs.onCreated(function() {


	this.state = new ReactiveDict()

    this.state.set('jobsLimit', 8)
    this.state.set('jobsSortField', 'createdAt')
    this.state.set('jobsSortOrder', -1)
    
    this.autorun(() => {
        let limit   = this.state.get('jobsLimit'),
            field   = this.state.get('jobsSortField'),
            order   = this.state.get('jobsSortOrder'),
            sort    = {[field]:order}

        this.subscribe('jobsbylimit', limit, sort)
    })

    $('.cards .image').transition({
		animation: 'pulse',
		reverse: true,
		interval: 100
	}).transition('horizontal flip in');
// 



});


Template.category_jobs.onRendered(function() {

		var state = this.state

		// hack to force the autorun to reevaluate
		Template.currentData();
		this.$('.jobssection')
			.visibility({
				once: false,
				onBottomVisible: function() {
						  state.set('jobsLimit', state.get('jobsLimit') + 8);
				}
					// },
					// onPassed: {
					//       40: function() {
					//         alert('inifiniateScroll ... main 2 called.'); 
					//       },
					//       '80%': function() {
					//       alert('inifiniateScroll ... main 2 called.'); 
					//       }
					//    }
			});



	$('.cards .image').dimmer({
		on: 'hover'
	});

	$('.cards .card').transition({
		animation: 'pulse',
		reverse: true,
		interval: 100
	}).transition('horizontal flip in');

	$('.ui .item').on('click', function() {
		$('.ui .item').removeClass('active');
		$(this).addClass('active');
	});


});



Template.category_jobs.helpers({

	Jobs() {
		const instance = Template.instance();
	    let limit   = instance.state.get('jobsLimit'),
        field   = instance.state.get('jobsSortField'),
        order   = instance.state.get('jobsSortOrder'),
        sort    = {[field]:order}
        console.log(Jobs.find({subCategory: this._id}, {sort: sort}).fetch());
		return Jobs.find({subCategory: this._id}, {sort: sort});
	}



});

Template.category_jobs.events({

	'scroll .jobssection': function(event) {
		console.log(this)
		event.preventDefault();
	},
	'click .sortbytitle': function(event,instance) {
		instance.state.set('jobsSortField','title_sort');
		instance.state.set('jobsSortOrder', 1);
		event.preventDefault();
	},
	'click .sortbypopular': function(event,instance) {
		instance.state.set('jobsSortField', 'positiveLikes');
		event.preventDefault();
	},
	'click .sortbypurchasedtimes': function(event,instance) {
		instance.state.set('jobsSortField', 'purchasedTimes');
		event.preventDefault();
	},
	'click .sortbynewest': function(event,instance) {
		instance.state.set('jobsSortField', 'createdAt');
		instance.state.set('jobsSortOrder', -1);
		event.preventDefault();
	},
	'click .sortbyoldest': function(event,instance) {
		instance.state.set('jobsSortField', 'createdAt');
		instance.state.set('jobsSortOrder', 1);
		event.preventDefault();
	}

});
