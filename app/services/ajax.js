import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  session: Ember.inject.service(),
  headers: Ember.computed('session.authToken', {
    get() {
      let headers = {};
      let authenticatedSession = this.get('session.session.authenticated');
      let authToken = authenticatedSession.token;
      if (authenticatedSession && authToken) {
        this.get('session').authorize('authorizer:devise', (headerName, headerValue) => {
          headers[headerName] = headerValue;
        });
      }
      return headers;
    }
  })
});
