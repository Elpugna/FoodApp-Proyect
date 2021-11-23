//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const server = require('./src/app.js');
const { Recipe, Diet } = require('./src/db.js');
const port = process.env.PORT || 3001;


// Syncing all the models at once.
Diet.sync({ force: true }).then(async() => {
  //I create the diets table before starting the server. 
  await Diet.bulkCreate([
    { name: 'vegan' },
    { name: 'ovo vegetarian' },
    { name: 'lacto vegetarian' },
    { name: 'vegetarian' },
    { name: 'gluten free' },
    { name: 'diary free' },
    { name: 'pescetarian' },
    { name: 'paleolithical' },
    { name: 'primal' },
    { name: 'ketogenic' },
    { name: 'lowfodmap' },
    { name: 'whole30' },
  ], { validate: true });
  await Recipe.sync({alter:true});
  server.listen(3001, () => {
    console.log(`Server listening at ${port}`); // eslint-disable-line no-console
  });
});
