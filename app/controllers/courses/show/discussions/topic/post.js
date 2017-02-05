import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  post: Ember.computed.reads('model'),
  comments: Ember.computed.reads('post.comments'),
  page: 1,

  init() {
    this._super(...arguments);
    this.get('fetchComments').perform();
  },

  fetchComments: task(function * () {
    return this.get('ajax').request('api/v1/comments', {
      method: 'GET',
      data: {
        post_id: this.get('post.id'),
        page: this.get('commentIndex'),
      }
    }).then((response) => {
      this.store.pushPayload(response);
      this.set('commentIndex', this.get('page') + 1);
    });
  }),

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
