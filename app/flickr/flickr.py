import requests

class Flickr(object):

    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://api.flickr.com/services/rest'

    def photos_search(self, **kwargs):
        payload = kwargs
        payload['api_key'] = self.api_key
        payload['method'] = 'flickr.photos.search'
        payload['format'] = 'json'
        payload['nojsoncallback'] = 1
        payload['safe_search'] = 1
        r = requests.get(self.base_url, params=payload)
        results = [Photo(photo) for photo in r.json()['photos']['photo']]
        return results

class Photo(object):

    def __init__(self, meta_data):
        self.is_family = meta_data['isfamily']
        self.owner = meta_data['owner']
        self.id = meta_data['id']
        self.is_public = meta_data['ispublic']
        self.is_friend = meta_data['isfriend']
        self.server = meta_data['server']
        self.title = meta_data['title']
        self.farm = meta_data['farm']
        self.secret = meta_data['secret']

    def url(self, size = None):
        url_size = '_{}'.format(size) if size is not None else ''
        return 'https://farm{}.staticflickr.com/{}/{}_{}{}.jpg'.format(self.farm, self.server, self.id, self.secret, url_size)