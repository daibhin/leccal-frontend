import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({

  didRender() {
    let scrollingComponent = document.getElementsByClassName('scrolling-component')[0];
    scrollingComponent.addEventListener('scroll', event => {
      let element = event.target;
      if (element.scrollTop == 0) {
        this.sendAction('reachedTop');
      }
    });
  },
});
