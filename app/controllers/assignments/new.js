import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  assignment: Ember.computed.reads('model'),

  showingAssignmentCalendar: false,

  editorHeight: 150,
  editingDisabled: false,
  usingMarkdown: false,
  usingWYSIWYG: Ember.computed.not('usingMarkdown'),

  calculateAssignmentsAffected: Ember.observer('range', function() {
    let dateRange = this.get('range');
    let startDate = dateRange.start;
    let endDate = dateRange.end;
    if(startDate && endDate) {
      debugger;
    }
  }),

  getAssignmentsDue: task(function * () {
    let courseId = this.get('assignment.course.id');
    if (courseId != undefined) {
      return this.get('ajax').request('api/v1/calendars', {
        method: 'GET',
        data: {
          course_id: courseId
        }
      }).then((response) => {
        this.set('assignmentCounts', response.assignments_count);
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

    toggleAssignmentCalendar() {
      this.toggleProperty('showingAssignmentCalendar');
    },

    selectCourse(courseId) {
      let course = this.get('courses').find((course) => {
        return course.get('id') == courseId;
      });
      let assignment = this.get('assignment');
      assignment.set('course', course);
      this.get('getAssignmentsDue').perform();
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
