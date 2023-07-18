const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const serviceAccount = require('/home/tk220223/IoTSystemDev1/RaspberryPi/serviceAccountKey.json');
initializeApp({
  credential: cert(serviceAccount)
});

class FirestoreService {
  static async writeDataToFirestore(peopleCount, congestionDegree) {
    const db = getFirestore();
    const data = {
      peopleCount: peopleCount,      // 検出人数
      crowded_lvl: congestionDegree, // 混雑度
      is_using: false,               // 使用中か
      room: "251",                   // 部屋番号
      createdAt: firebase.firestore.FieldValue.Timestamp() // タイムスタンプ
    };
    const res = await db.collection('rooms').set(data);
  }
}

module.exports = FirestoreService;
