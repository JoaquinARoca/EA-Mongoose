import mongoose from 'mongoose';

// Connection URI
const mongoURI = 'mongodb://localhost:27017/ea-exercise-mongoose';  
 
// Connection
export async function startConnection() {
    mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

    await mongoose.connect(mongoURI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar:', err));

    // Elimina todos los users de la colección
    await mongoose.connection.db.dropCollection('users')
    .then(() => console.log('Colección eliminada'))
    .catch(err => console.error('Error al eliminar colección:', err));

    // Elimina todos los todos de la colección
    await mongoose.connection.db.dropCollection('todos')
    .then(() => console.log('Colección eliminada'))
    .catch(err => console.error('Error al eliminar colección:', err));

}