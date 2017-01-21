import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  model: function(params) {
    let lecturerId = this.get('session.currentUser.id');
    return this.store.queryRecord('calendar', {lecturer_id: lecturerId, course_id: params.course_id});
  }
});
