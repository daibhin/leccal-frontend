import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('login');
  this.route('signup');
  this.route('calendar');

  this.route('lecturers', function() {
    this.route('show', { path: ':lecturer_id' });
  });

  this.route('courses', function() {
    this.route('show', { path: ':course_id' }, function() {
      this.route('assignments', function() {
        this.route('show', { path: ':assignment_id' });
      });
      this.route('discussions', function() {
        this.route('show', { path: ':assignment_id' });
      });
    });
  });

  this.route('assignments', function() {
    this.route('new');
  });

});

export default Router;
