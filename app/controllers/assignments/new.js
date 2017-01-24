import Ember from 'ember';

export default Ember.Controller.extend({
  assignment: Ember.computed.reads('model'),

  editorHeight: 150,
  editingDisabled: false,
  usingMarkdown: false,
  usingWYSIWYG: Ember.computed.not('usingMarkdown'),

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
