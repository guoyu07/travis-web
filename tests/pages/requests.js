import {
  create,
  attribute,
  clickable,
  collection,
  hasClass,
  isVisible,
  text,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable(':organization/:repo/requests'),

  requests: collection('.request-item', {
    isApproved: hasClass('approved'),
    isRejected: hasClass('rejected'),
    isPending: hasClass('pending'),

    commitLink: {
      scope: '[data-requests-item-related-model] a'
    },

    commitMissing: {
      scope: '[data-requests-item-commit-missing]'
    },

    commitMessage: {
      scope: '[data-requests-item-commit-message]'
    },

    buildNumber: {
      scope: '[data-requests-item-build] .inner-underline'
    },

    requestMessage: {
      scope: '[data-requests-item-message]'
    }
  })
});
