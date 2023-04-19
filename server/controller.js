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
