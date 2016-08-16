import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super();
    this.set('content', this.loadPhotos());
  },

  content: [],
  ACCESS_TOKEN: '15671865.1677ed0.709bceedd7344b9da31d9e91ba1fd7f9',
  user: 'self',

  requestURL: Ember.computed('ACCESS_TOKEN', function () {
    return `https://api.instagram.com/v1/users/${this.get('user')}/media/recent/` +
           `?access_token=${this.get('ACCESS_TOKEN')}`;
  }),

  loadPhotos() {
    let result = Ember.ArrayProxy.create({
      content: [],
      isLoaded: false,
    });

    Ember.$.ajax({
      url: this.get('requestURL'),
      dataType: 'jsonp',
      context: this,
      success: function (data) {
          var instaPhotos = data.data;
          instaPhotos.forEach(function (photo, index) {
              if (index >= 20) return;
              result.pushObject({
                  stdResImg: photo.images.standard_resolution.url,
                  instagramLink: photo.link,
                });
            });

          result.set('isLoaded', true);
        },

      error: function (data) {
        debugger;
      },
    });

    return result;
  },
});
