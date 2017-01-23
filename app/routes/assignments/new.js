import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({

  model: function(params, transition) {
    let course_id = transition.params.course_id;
    return this.store.createRecord('assignment', {course_id: course_id});
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.store.findAll('course').then((courses) => {
      controller.set('courses', courses);
    });
  }
});
