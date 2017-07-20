import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    createProject(name) {
      let project = this.store.createRecord('project', {
        name: name
      });

      project.save()
      .then((response) => {
        this.transitionToRoute('projects.show', project);
      });
    }
  }
});
