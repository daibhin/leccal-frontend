import Ember from 'ember';

export default Ember.Controller.extend({
  assignment: Ember.computed.reads('model'),

  numSteps: 4,
  currentStepNum: 1,
  steps: {
    1: {
      title: 'DETAILS',
      componentName: 'assignments/assignment-creator-details',
    },
    2: {
      title: 'Calendar',
      componentName: 'assignments/assignment-creator-calendar',
    },
    3: {
      title: 'Submission',
      componentName: 'assignments/assignment-creator-details',
    },
    4: {
      title: 'Review',
      componentName: 'assignments/assignment-creator-details',
    }
  },

  currentStep: Ember.computed('currentStepNum', function(){
    return this.get('steps')[this.get('currentStepNum')];
  }),

  actions: {
    incrementStep() {
      let currentStep = this.get('currentStepNum');
      if (currentStep < this.get('numSteps')) {
        this.set('currentStepNum', currentStep + 1);
      }
    },
    decrementStep() {
      let currentStep = this.get('currentStepNum');
      if (currentStep > 1) {
        this.set('currentStepNum', currentStep - 1);
      }
    }
  }
});
