import DS from 'ember-data';
//
// export default DS.RESTAdapter.extend({
//   namespace: 'api/v1'
// });
//

import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
   namespace: 'api/v1'
})
