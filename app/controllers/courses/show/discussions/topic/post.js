import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  post: Ember.computed.reads('model'),
  comments: [],
  page: 1,

  init() {
    this._super(...arguments);
    this.get('fetchComments').perform();
  },

  fetchComments: task(function * () {
    return this.get('ajax').request('api/v1/posts/comments', {
      method: 'GET',
      data: {
        post_id: this.get('post.id'),
        page: this.get('commentIndex'),
      }
    }).then((response) => {
      let comments = response.comments;
      comments.push(comments);
      debugger;
      this.set('commentIndex', this.get('page') + 1);
    });
  }),
});
