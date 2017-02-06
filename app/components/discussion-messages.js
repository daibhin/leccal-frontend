import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  classNames: ['flex', 'with_columns', 'fill', 'scrolls'],

  post: Ember.computed.reads('model'),
  comments: Ember.computed.reads('post.comments'),
  page: 1,

  didInsertElement() {
    this._super(...arguments);
    this.get('fetchComments').perform();
  },

  didRender() {
    let messageList = document.getElementById('message-list');
    messageList.scrollTop = messageList.scrollHeight;
  },

  fetchComments: task(function * () {
    return this.get('ajax').request('api/v1/comments', {
      method: 'GET',
      data: {
        post_id: this.get('post.id'),
        page: this.get('commentIndex'),
      }
    }).then((response) => {
      this.get('store').pushPayload(response);
      this.set('commentIndex', this.get('page') + 1);
    });
  }),
});
