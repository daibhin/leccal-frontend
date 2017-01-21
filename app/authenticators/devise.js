import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import Ember from 'ember';

const { RSVP, isEmpty, run } = Ember;

export default DeviseAuthenticator.extend({
  session: Ember.inject.service('session'),

  serverTokenEndpoint: 'http://localhost:3000/api/v1/lecturers/sign_in',
  resourceName: 'lecturer',
  tokenAttributeName: 'authentication_token',

  restore(data){
    return new RSVP.Promise((resolve, reject) => {
      if (!isEmpty(data.accessToken) && !isEmpty(data.expiry) &&
          !isEmpty(data.tokenType) && !isEmpty(data.uid) && !isEmpty(data.client)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(identification, password) {
    return new RSVP.Promise((resolve, reject) => {
      const { identificationAttributeName } = this.getProperties('identificationAttributeName');
      const data = { password };
      data[identificationAttributeName] = identification;

      this.makeRequest(data).then((response, status, xhr) => {
        //save the five headers needed to send to devise-token-auth
        //when making an authorized API call
        var result = {
          accessToken: xhr.getResponseHeader('access-token'),
          expiry: xhr.getResponseHeader('expiry'),
          tokenType: xhr.getResponseHeader('token-type'),
          uid: xhr.getResponseHeader('uid'),
          client: xhr.getResponseHeader('client'),
          lecturerId: response.data,
        };

        run(null, resolve, result);
      }, function(xhr) {
        run(null, reject, xhr.responseJSON || xhr.responseText);
      });
    });
  },
});
