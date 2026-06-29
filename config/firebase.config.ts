import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

if (!admin.apps.length) {
    let serviceAccount: any;

    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        try {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        } catch (error) {
            console.error('Error al parsear la variable FIREBASE_SERVICE_ACCOUNT:', error.message);
        }
    } else {
        const serviceAccountPath = path.join(
            process.cwd(),
            'firebase-service-account.json',
        );
        if (fs.existsSync(serviceAccountPath)) {
            serviceAccount = JSON.parse(
                fs.readFileSync(serviceAccountPath, 'utf8'),
            );
        } else {
            console.error('Advertencia: No se encontro el archivo firebase-service-account.json ni la variable de entorno FIREBASE_SERVICE_ACCOUNT.');
        }
    }

    if (serviceAccount) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('Firebase inicializado con éxito');
    } else {
        console.warn('Firebase no fue inicializado porque faltan las credenciales.');
    }
}

export default admin;