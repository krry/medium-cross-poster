const request = require('request');

module.exports = ({ pubId, token, title, publishStatus = 'public', content, url }) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url: `https://api.medium.com/v1/publications/${pubId}/posts`,
      json: true,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        title,
        notifyFollowers: true,
        contentFormat: 'html',
        content: `<h1>${title}</h1>\n${content}`,
        tags: [],
        publishStatus,
        canonicalUrl: url,
      }
    }, (err, res, body) => {
      if (err) {
        return reject(err);
      }

      resolve(body);
    });
  });
}
