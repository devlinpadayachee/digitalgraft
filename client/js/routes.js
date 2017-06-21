import {
  Categories
} from '/imports/api/categories.js';
import {
  Jobs
} from '/imports/api/jobs.js';
import {
  Orders
} from '/imports/api/orders.js';

import {
  StaticText
} from '/imports/api/statictext.js';

Router.configure({
  layoutTemplate: 'app',
  notFoundTemplate: "pageNotFound"
});


Router.onBeforeAction(function() {
  // all properties available in the route function
  // are also available here such as this.params
  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('frontpageheader', {
      to: 'header'
    });
    this.render('home');
    this.render('footer', {
      to: 'footer'
    });
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }

});

// Router.route("/(.*)", function() {
//     this.render('pageNotFound');
//     this.next();
// });

Router.route('/', {
  subscriptions: function() {
    return [Meteor.subscribe('statictext'),Meteor.subscribe('jobs'),Meteor.subscribe('categories')];
  },
  action: function() {
    if (this.ready()) {
      this.render('frontpageheader', {
        to: 'header'
      });
      this.render('home');
      this.render('footer', {
        to: 'footer'
      });
    } else {
      this.render('loading');
    }
  }
});

Router.route('/admin', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('jobs'), Meteor.subscribe('orders'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {

      this.render('adminheader', {
        to: 'header'
      });
      this.render('admin');
      this.render('admin_dashboard', {
        to: 'admincontentyield'
      });

    } else {
      this.render('loading');
    }
  }
});

Router.route('/admin/settings/language', {
  subscriptions: function() {
    return [Meteor.subscribe('statictext'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {

      this.render('adminheader', {
        to: 'header'
      });
      this.render('admin');
      this.render('admin_settings_language', {
        to: 'admincontentyield'
      });

    } else {
      this.render('loading');
    }
  }
});

///// Remove alluserdata to speed up probably, the publish composite can pull in the userdata anyways
Router.route('/admin/jobs', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'),Meteor.subscribe('jobs'),Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('adminheader', {
        to: 'header'
      });
      this.render('admin');
      this.render('admin_jobs', {
        to: 'admincontentyield'
      });

    } else {
      this.render('loading');
    }
  }
});

Router.route('/admin/job/:_id', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('jobs'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {

      this.render('adminheader', {
        to: 'header'
      });
      this.render('admin');
      this.render('admin_job_view', {
        to: 'admincontentyield'
      });

    } else {
      this.render('loading');
    }
  },
  data: function() {
    return Jobs.findOne({
      _id: this.params._id
    });
  }
});

Router.route('/admin/categories', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'),Meteor.subscribe('jobs'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('adminheader', {
        to: 'header'
      });
      this.render('admin');
      this.render('admin_categories', {
        to: 'admincontentyield'
      });

    } else {
      this.render('loading');
    }
  }
});

Router.route('/admin/category/create', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('adminheader', {
        to: 'header'
      });
      this.render('admin');
      this.render('admin_category_create', {
        to: 'admincontentyield'
      });

    } else {
      this.render('loading');
    }
  }
});


Router.route('/admin/category/:_id', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {

      this.render('adminheader', {
        to: 'header'
      });
      this.render('admin');
      this.render('admin_category_view', {
        to: 'admincontentyield'
      });

    } else {
      this.render('loading');
    }
  },
  data: function() {
    return Categories.findOne({
      _id: this.params._id
    });
  }
});


Router.route('/admin/orders', {
  subscriptions: function() {
    return [Meteor.subscribe('orders'), Meteor.subscribe('jobs'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('adminheader', {
        to: 'header'
      });
      this.render('admin');
      this.render('admin_orders', {
        to: 'admincontentyield'
      });

    } else {
      this.render('loading');
    }
  }
});

Router.route('/admin/order/create', {
  subscriptions: function() {
    return [Meteor.subscribe('orders'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('adminheader', {
        to: 'header'
      });
      this.render('admin');
      this.render('admin_orders', {
        to: 'admincontentyield'
      });

    } else {
      this.render('loading');
    }
  }
});


Router.route('/admin/order/:_id', {
  subscriptions: function() {
    return [Meteor.subscribe('orders'), Meteor.subscribe('jobs'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {

      this.render('adminheader', {
        to: 'header'
      });
      this.render('admin');
      this.render('admin_order_view', {
        to: 'admincontentyield'
      });

    } else {
      this.render('loading');
    }
  },
  data: function() {
    return Orders.findOne({
      _id: this.params._id
    });
  }
});

Router.route('/sub_categories/:_id', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('header', {
        to: 'header'
      });
      this.render('sub_categories');
      this.render('footer', {
        to: 'footer'
      });
    } else {
      this.render('loading');
    }
  },
  data: function() {
    return Categories.findOne({
      _id: this.params._id
    });
  }
});

Router.route('/category_jobs/:_id', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('header', {
        to: 'header'
      });
      this.render('category_jobs');
      this.render('footer', {
        to: 'footer'
      });
    } else {
      this.render('loading');
    }
  },
  data: function() {
    return Categories.findOne({
      _id: this.params._id
    });
  }
});

// Router.route('/job/create', {
//   subscriptions: function() {
//     return [Meteor.subscribe('jobs'), Meteor.subscribe('categories'), Meteor.subscribe('allUserData')];
//   },
//   action: function() {
//     if (this.ready()) {

//       this.render('header', {
//         to: 'header'
//       });
//       this.render('job_create');
//       this.render('footer', {
//         to: 'footer'
//       });

//     } else {
//       this.render('loading');
//     }
//   }
// });

Router.route('/job/:_id', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('jobs'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('header', {
        to: 'header'
      });
      this.render('job_view');
      this.render('footer', {
        to: 'footer'
      });
    } else {
      this.render('loading');
    }
  },
  data: function() {
    return Jobs.findOne({
      _id: this.params._id
    });
  }
});

Router.route('/seller', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {

      this.render('header', {
        to: 'header'
      });
      this.render('seller');
      this.render('seller_dashboard', {
        to: 'sellercontentyield'
      });
      this.render('footer', {
        to: 'footer'
      });

    } else {
      this.render('loading');
    }
  },
  data: function() {
    return Meteor.user();
  }
});


Router.route('/seller/job/create', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('jobs'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('header', {
        to: 'header'
      });
      this.render('seller');
      this.render('seller_job_create', {
        to: 'sellercontentyield'
      });
      this.render('footer', {
        to: 'footer'
      });

    } else {
      this.render('loading');
    }
  }
});

Router.route('/seller/job/:_id', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('jobsbyloggedinuser'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('header', {
        to: 'header'
      });
      this.render('seller');
      this.render('seller_job_view', {
        to: 'sellercontentyield'
      });
      this.render('footer', {
        to: 'footer'
      });

    } else {
      this.render('loading');
    }
  },
  data: function() {
    return Jobs.findOne({
      _id: this.params._id
    });
  }
});



//In this route the jobs collection is subscribed to in the onRendered section
Router.route('/seller/jobs', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('header', {
        to: 'header'
      });
      this.render('seller');
      this.render('seller_jobs', {
        to: 'sellercontentyield'
      });
      this.render('footer', {
        to: 'footer'
      });

    } else {
      this.render('loading');
    }
  }
});

Router.route('/seller/orders', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'),Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('header', {
        to: 'header'
      });
      this.render('seller');
      this.render('seller_orders', {
        to: 'sellercontentyield'
      });
      this.render('footer', {
        to: 'footer'
      });

    } else {
      this.render('loading');
    }
  }
});

Router.route('/seller/profile/update', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'),Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('header', {
        to: 'header'
      });
      this.render('seller');
      this.render('seller_profile_update', {
        to: 'sellercontentyield'
      });
      this.render('footer', {
        to: 'footer'
      });

    } else {
      this.render('loading');
    }
  },
  data: function() {
    return Meteor.user();
  }
});

Router.route('/profile/:_id', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('allUserData')];
  },
  action: function() {
    if (this.ready()) {
      this.render('header', {
        to: 'header'
      });
      this.render('profile');
      this.render('footer', {
        to: 'footer'
      });
    } else {
      this.render('loading');
    }
  },
  data: function() {
    return Meteor.users.findOne({
      _id: this.params._id
    });
  }
});


Router.route('/orders/confirm/:_id', {
  subscriptions: function() {
    return [Meteor.subscribe('categories'), Meteor.subscribe('allUserData'), Meteor.subscribe('jobsbyid', this.params._id)];
  },
  action: function() {
    if (this.ready()) {
      this.render('header', {
        to: 'header'
      });
      this.render('order_confirm');
      this.render('footer', {
        to: 'footer'
      });
    } else {
      this.render('loading');
    }
  },
  data: function() {
    return Jobs.findOne({
      _id: this.params._id
    });
  }
});

Router.route('/orders/:_id/:conversation', {
  subscriptions: function() {
    return [Meteor.subscribe('conversationbyid', this.params.conversation), Meteor.subscribe('messages', this.params.conversation), Meteor.subscribe('statictext'), Meteor.subscribe('categories'), Meteor.subscribe('allUserData'), Meteor.subscribe('ordersbyid', this.params._id)];
  },
  action: function() {
    if (this.ready()) {
      this.render('header', {
        to: 'header'
      });
      this.render('order_view');
      this.render('footer', {
        to: 'footer'
      });
    } else {
      this.render('loading');
    }
  },
  data: function() {
    return Orders.findOne({
      _id: this.params._id
    });
  }
});
