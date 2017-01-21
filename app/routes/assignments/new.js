import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({

  model: function(params, transition) {
    let course_id = transition.queryParams.course_id;
    return this.store.createRecord('assignment');
  }
});
