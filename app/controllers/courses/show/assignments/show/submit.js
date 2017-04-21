import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import fromNow from 'ember-moment/computeds/from-now';

export default Ember.Controller.extend({

  session: Ember.inject.service(),

  ajax: Ember.inject.service(),
  sessionAccount: Ember.inject.service('session-user'),
  currentUser: Ember.computed.reads('sessionAccount.user'),
  assignment: Ember.computed.reads('model'),
  course: Ember.computed.reads('assignment.course'),

  hasNoSubmissions: Ember.computed.empty('assignment.submissions'),
  submissionMembers: [],

  submissionMemberList: Ember.computed('submissionMembers', function() {
    return this.get('submissionMembers').map((member) => member.get('email')).join(',');
  }),

  _updateSubmissionMembers: Ember.observer('memberIds', function() {
    let ids = []
    if (this.get('memberIds') != null) {
      ids = this.get('memberIds').split(',').map((id) => id.trim());
      ids = ids.filter(id => id != ''); // removes blank ids
    }
    this.set('submissionMembers', []);
    ids.map(userId => {
      let user = this.get('store').find('User', userId)
      .then(user => {
        this.get('submissionMembers').pushObject(user)
      });
    });
  }),

  actions: {
    submitAssignment() {
      var newSubmission = this.get('store').createRecord('submission');
      newSubmission.set('assignment', this.get('assignment'));
      newSubmission.set('submitter', this.get('currentUser'));
      newSubmission.set('members', this.get('submissionMembers'));
      newSubmission.save().then((submission) => {
        this.transitionToRoute('courses.show.assignments.show', course, assignment)
        .then(function(assignmentRoute) {
          assignmentRoute.controller.set('activeSubmission', submission);
        });
      })
      .catch((response) => {
        debugger;
      });
    }
  }
});
