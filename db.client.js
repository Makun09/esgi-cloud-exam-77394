const { Sequelize } = require('sequelize');
require('dotenv').config();  // Pour charger les variables d'environnement depuis le fichier .env

// Crée une instance Sequelize en utilisant la variable d'environnement DATABASE_URL
const sequelize = new Sequelize(
  process.env.DATABASE_URL,  // Utilise la variable d'environnement
  {
    dialect: 'postgres',  // Assure-toi que le dialect est bien 'postgres'
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,  // Cela permet la connexion SSL sur Render
      },
    },
  }
);

// Authentification et synchronisation de la base
sequelize.authenticate()
  .then(() => {
    console.log('Connection successful!');
    sequelize.sync().catch(() => console.log("Cannot sync the database"));
  })
  .catch(() => console.log("Cannot connect to database, please check environment credentials"));

module.exports = sequelize;
