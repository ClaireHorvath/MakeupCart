const Sequelize = require('sequelize');
const {CONNECTION_STRING} = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
        rejectUnauthorized: false
    }
  }
});


module.exports = {
  getMakeupItems: (req, res) => {
    sequelize.query(`SELECT * FROM makeupItems
    ORDER BY quantity;`)
        .then(dbRes => {
          res.status(200).send(dbRes[0])
        })
  },

  addMakeupItem: (req, res) => {
    const {name, quantity} = req.body

    sequelize.query(`INSERT INTO makeupItems (name, quantity)
      VALUES ('${name}', '${quantity}');
    `)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500))
  },

  updateMakeupList: (req, res) => {
    let {quantity} = req.body
    let id = +req.body.id

    sequelize.query(`UPDATE makeupItems
      SET quantity = ${quantity}
      WHERE makeupItem_id = ${id};
    `)
      .then(() => res.status(200).send('Cart successfully updated!'))
  },

  deleteMakeupItem: (req, res) => {
    const id = +req.params.id

    sequelize.query(`DELETE FROM makeupItems
      WHERE makeupItem_id = ${id}
    `)
      .then(() => res.status(200).send('Item removed from cart!'))
  }
}









// const makeupItems = require('./db.json');

// module.exports = {
//     getMakeupItems: (req, res) => {
//         res.status(200).send(makeupItems)
//     },
//     addMakeupItem: (req, res) => {
//         const {name, rating} = req.body
//         let newMakeupItem = {
//             name,
//             rating: +rating,
//             id: globalID
//         }
//         makeupItems.push(newMakeupItem)
//         globalID++
//         res.sendStatus(200).send(makeupItems)
//     },
//     deleteMakeupItem: (req, res) => {
//         const {id} = req.params
//         let index = makeupItems.findIndex((element) => element.id === +id)
//         makeupItems.splice(index, )
//         res.status(200).send(makeupItems)
//     },
//     updateMakeupList: (req, res) => {
//         const {name, rating} = req.body;
//         let index = makeupItems.findIndex((element) => element.id === +req.params.id)
//         if(type === "plus" && makeupItems[index].rating < 5){
//             makeupItems[index].rating += 1;
//             res.status(200).send(makeupItems)
//         } else if (type === "minus" && makeupItems[index].rating > 1){
//             makeupItems[index].rating -= 1;
//             res.status(200).send(makeupItems)
//         } else {
//             res.status(400).send("Not a star rating.")
//         }
//     }
// };