import Ember from "ember";
import SessionService from 'ember-simple-auth/services/session';

export default {
  name: "custom-session",
  before: "ember-simple-auth",
  after: ['ember-data'],
  initialize: function() {
    SessionService.reopen({
      _setCurrentUser: function() {
        var user = this.get("data.authenticated.lecturerId");

        if (!Ember.isEmpty(user)) {
          this.set("currentUser", user);
        }
      }.observes("data.authenticated.lecturerId")
    });
  }
};
