import Ember from 'ember';

export default Ember.Controller.extend({

  forum: Ember.computed.reads('model.forum'),
  showingNewTopicForm: false,

  actions: {
    showNewTopicForm() {
      this.toggleProperty('showingNewTopicForm');
    },

    createTopic() {
      let name = this.get('newTopicTitle');
      let description = this.get('newTopicDescription');

      debugger;
      var topic = this.store.createRecord('topic', {
        name: name,
        description: description,
        forum: this.get('forum'),
      });

      this.set('newTopicTitle', '');
      this.set('newTopicDescription', '');
      topic.save();
    },
  }
});
