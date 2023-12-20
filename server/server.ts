const { create, defaults, router } = require('json-server');
const Locations  = require('./db.json');
const server = create();
const route = router(Locations);
const middlewares = defaults();


server.use(middlewares);
server.use(route);

server.listen(4000, () => {
  console.log(`Json server is running...`);
});
