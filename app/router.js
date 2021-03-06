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
        this.route('show', { path: ':assignment_id' }, function() {
          this.route('submit');
        });
      });
      this.route('discussions', function() {
        this.route('topic', { path: ':topic_id' }, function() {
          this.route('post', { path: ':post_id' });
          this.route('new');
        });
        this.route('new');
      });
    });
  });

  this.route('projects', function() {
    this.route('show', { path: ':project_id' }, function() {
      this.route('todos');
      this.route('schedule');
      this.route('discussion');
      this.route('docs');
    });
  });

  this.route('chat', function() {

  });

  this.route('assignments', function() {
    this.route('new');
  });

});

export default Router;
