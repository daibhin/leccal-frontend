import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  post: Ember.computed.reads('model'),
  comments: Ember.computed.reads('post.comments'),
  page: 1,

  actions: {
    addComment() {
      let text = this.get('commentText');
      var comment = this.store.createRecord('comment', {
        text: text,
        user: this.get('comments.lastObject.user'), // TODO: until users are implemented
        post: this.get('post'),
      });
      this.set('commentText', '');
      comment.save();
    }
  }
});
