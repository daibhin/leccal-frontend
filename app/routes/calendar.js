import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  ajax: Ember.inject.service(),

  model: function() {
    return this.get('ajax').request('api/v1/calendars', {
        method: 'GET',
        data: {
          lecturer_id: 1,
          course_id: 1
        }
      })
      .then(response => {
        debugger;
      });
  }
});
