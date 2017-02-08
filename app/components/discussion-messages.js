import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  classNames: ['scrolling-component scrolls'],
  attributeBindings: ['id'],
  id: 'discussion-messages-component',


  post: Ember.computed.reads('model'),
  comments: Ember.computed.reads('post.comments'),
  commentSortProperties: ['id:asc'],
  sortedComments: Ember.computed.sort('comments', 'commentSortProperties'),
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
        page: this.get('page'),
      }
    }).then((response) => {
      this.get('store').pushPayload(response);
      this.set('page', this.get('page') + 1);
    });
  }),
});
