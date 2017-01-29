import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),

  calendarEvents: [],

  didInsertElement() {
    this._super(...arguments);
    this.get('requestAssignmentsDue').perform();
  },

  requestAssignmentsDue: task(function * () {
    let courseId = 2; // hardcoded due to bug. SHOULD CHANGE
    if (courseId !== undefined) {
      return this.get('ajax').request('api/v1/calendars', {
        method: 'GET',
        data: {
          course_id: courseId
        }
      }).then((response) => {
        this.set('calendarEvents', response.calendar_events);
      });
    }
  }),

  assignmentDates: Ember.computed('calendarEvents', function() {
    let events = this.get('calendarEvents');
    return Object.keys(events);
  }),

  actions: {
    handleDateChange(selectedDay) {
      let formattedDate = moment(selectedDay).format("YYYY-MM-DD");
      this.set('selectedDate', formattedDate);
      let calendarEvents = this.get('calendarEvents');
      this.set('numStudentsAffected', calendarEvents[formattedDate]);
    },
  }

});
