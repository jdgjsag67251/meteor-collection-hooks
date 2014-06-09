Tinytest.addAsync("optional-previous - update hook should not prefetch previous, via option param", function (test, next) {
  var collection = new Meteor.Collection(null);

  // Full permissions on collection
  collection.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
  });

  collection.after.update(function (userId, doc, fieldNames, modifier, options) {
    if (doc && doc._id === "test") {
      test.equal(!!this.previous, false);
      next();
    }
  }, {fetchPrevious: false});

  collection.insert({_id: "test", test: 1}, function () {
    collection.update({_id: "test"}, {$set: {test: 1}});
  });
});

if (Meteor.isClient) return;

// The following tests run only on the server due to their requirement for
// running synchronously. Because the "fetchPrevious" flag is set on a global
// (and is meant to be used globally), it has side-effects with our other tests.
// If we could run this test synchronously on the client, we would. That being
// said, we aren't testing the difference between server and client, as the
// functionality is the same for either, so testing only the server is
// acceptable in this case.

Tinytest.add("optional-previous - update hook should not prefetch previous, via defaults param variation 1: after.update", function (test) {
  var collection = new Meteor.Collection(null);

  // Full permissions on collection
  collection.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
  });

  CollectionHooks.defaults.after.update = {fetchPrevious: false};

  collection.after.update(function (userId, doc, fieldNames, modifier, options) {
    if (options && options.test) {
      test.equal(!!this.previous, false);
      next();
    }
  });

  CollectionHooks.defaults.after.update = {};

  collection.insert({_id: "test", test: 1});
  collection.update({_id: "test"}, {$set: {test: 1}});
});

Tinytest.add("optional-previous - update hook should not prefetch previous, via defaults param variation 2: after.all", function (test) {
  var collection = new Meteor.Collection(null);

  // Full permissions on collection
  collection.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
  });

  CollectionHooks.defaults.after.all = {fetchPrevious: false};

  collection.after.update(function (userId, doc, fieldNames, modifier, options) {
    if (options && options.test) {
      test.equal(!!this.previous, false);
    }
  });

  CollectionHooks.defaults.after.all = {};

  collection.insert({_id: "test", test: 1});
  collection.update({_id: "test"}, {$set: {test: 1}});
});

Tinytest.add("optional-previous - update hook should not prefetch previous, via defaults param variation 3: all.update", function (test) {
  var collection = new Meteor.Collection(null);

  CollectionHooks.defaults.all.update = {fetchPrevious: false};

  // Full permissions on collection
  collection.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
  });

  collection.after.update(function (userId, doc, fieldNames, modifier, options) {
    if (options && options.test) {
      test.equal(!!this.previous, false);
    }
  });

  collection.insert({_id: "test", test: 1});
  collection.update({_id: "test"}, {$set: {test: 1}});
});

Tinytest.add("optional-previous - update hook should not prefetch previous, via defaults param variation 4: all.all", function (test) {
  var collection = new Meteor.Collection(null);

  // Full permissions on collection
  collection.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
  });

  CollectionHooks.defaults.all.all = {fetchPrevious: false};

  collection.after.update(function (userId, doc, fieldNames, modifier, options) {
    if (options && options.test) {
      test.equal(!!this.previous, false);
    }
  });

  CollectionHooks.defaults.all.all = {};

  collection.insert({_id: "test", test: 1});
  collection.update({_id: "test"}, {$set: {test: 1}});
});