const app = require('../../app')

test('Unit testing the /api/images route', function() {
    expect(async function() {
        try {
            return await request(app)
              .get('/api/images')
              .then(function(response){
                  assert.equal(response.status, 400)
              })
            
        } catch (error) {
            
        }
    });

});