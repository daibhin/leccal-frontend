import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  assignment: Ember.computed.reads('model'),

  editorHeight: 150,
  editingDisabled: false,
  usingMarkdown: false,
  usingWYSIWYG: Ember.computed.not('usingMarkdown'),

  _calendarRangeChange: Ember.observer('range', function() {
    this.get('performCalendarChecker').perform();
  }),

  performCalendarChecker: task(function * () {
    let startDate = this.get('range.start');
    let endDate = this.get('range.end');
    let courseId = this.get('assignment.course.id');
    if (startDate != null && endDate != null && courseId != undefined) {
      return this.get('ajax').request('api/v1/calendars', {
        method: 'GET',
        data: {
          startDate: this.get('range.start').unix(),
          endDate: this.get('range.end').unix(),
          course_id: this.get('assignment.course.id')
        }
      }).then((response) => {
        this.set('existingAssignments', response.calendar_events);
        debugger;
      });
    }
  }),

  assignmentDates: Ember.computed.map('existingAssignments', (assignment) => {
    return assignment.get('dueDate');
  }),

  actions: {
    toggleEditorType() {
      this.toggleProperty('usingMarkdown');
    },
    selectCourse(courseId) {
      let course = this.get('courses').find((course) => {
        return course.get('id') == courseId;
      });
      let assignment = this.get('assignment');
      assignment.set('course', course);
      this.get('performCalendarChecker').perform();
    },
    saveAssignment() {
      let assignment = this.get('assignment');
      assignment.save().then((assignment) => {
        let courseId = assignment.get('course.id');
        let assignmentId = assignment.get('id');
        this.transitionToRoute('courses.show.assignments.show', courseId, assignmentId);
      });
    },
    changeHeight(someObject) {
      var height = someObject.doSomeCalculationToGetHeight();
       this.set('contentHeight', height)
    },
  }
});
