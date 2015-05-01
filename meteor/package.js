Package.describe({
  name: 'mantarayar:actions-filters',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Use Wordpress style actions and filters.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/MantarayAR/meteor-actions-filters',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: '../README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('../src/_action_helpers.js');
  api.addFiles('../src/actions.js');
  api.addFiles('../src/filters.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('mantarayar:actions-filters');
  api.addFiles('../tests/action-tests.js');
  api.addFiles('../tests/filter-tests.js');
});
