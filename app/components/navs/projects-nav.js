import Ember from 'ember';

export default Ember.Component.extend({
  showingCreateForm: false,

  actions: {
    toggleCreateForm() {
      this.toggleProperty('showingCreateForm');
    },

    createProject() {
      this.sendAction('createProject', this.get('newProjectName'));
    }
  }
});
