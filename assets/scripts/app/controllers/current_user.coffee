Travis.CurrentUserController = Em.ObjectController.extend
  sync: ->
    @get('content').sync()

  syncingDidChange: (->
    if (user = @get('content')) && user.get('isSyncing') && !user.get('syncedAt')
      Ember.run.scheduleOnce 'routerTransitions', this, ->
        @container.lookup('router:main').send('renderFirstSync')
  ).observes('isSyncing', 'content')
