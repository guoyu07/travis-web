import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | V3', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:auth', EmberObject.extend({
      token: function () {
        return 'foo';
      }
    }));
  });

  test('getHost returns only a host, without a path', function (assert) {
    const adapter = this.owner.lookup('adapter:v3');

    adapter.host = 'http://example.com';
    assert.equal(adapter.getHost(), 'http://example.com');

    adapter.host = 'https://example.com/';
    assert.equal(adapter.getHost(), 'https://example.com');

    adapter.host = 'https://example.com/api';
    assert.equal(adapter.getHost(), 'https://example.com');

    adapter.host = 'https://example.com/api/foo/bar/baz';
    assert.equal(adapter.getHost(), 'https://example.com');

    adapter.host = 'https://example.com:8080/api/foo/bar/baz';
    assert.equal(adapter.getHost(), 'https://example.com:8080');

    adapter.host = 'localhost:8080/api/foo/bar/baz';
    assert.equal(adapter.getHost(), 'localhost:8080');
  });

  test('it joins array that are passed as data', function (assert) {
    const adapter = this.owner.lookup('adapter:v3'),
      type = 'GET',
      options = { data: { eventType: ['push', 'pull'] } };

    const hash = adapter.ajaxOptions('/builds', type, options);

    assert.equal(hash.data.eventType, 'push,pull');
  });

  test('it uses `includes` property', function (assert) {
    const adapter = this.owner.lookup('adapter:v3'),
      type = 'GET',
      options = { data: { include: 'foo' } };

    adapter.set('includes', 'bar,baz');

    const hash = adapter.ajaxOptions('/repos', type, options);

    assert.equal(hash.data.include, 'foo,bar,baz');
  });

  test('sends page_size as limit', function (assert) {
    const adapter = this.owner.lookup('adapter:v3'),
      type = 'GET',
      options = { data: { page_size: 100 } };

    const hash = adapter.ajaxOptions('/repos', type, options);

    assert.equal(hash.data.limit, 100);
    assert.notOk(hash.data.page_size);
  });
});
