require('date-utils');  // 現在日時を取得するライブラリもインストールしておく
const admin = require('firebase-admin');
const serviceAccount = require('PATH/TO/JSON/FILE');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class FirestoreService {
  // Firestore へのデータの書き込み
  static async writeDataToFirestore(peopleCount, congestionDegree) {
    const db = admin.firestore();

    // 現在時刻を取得
    const date = new Date();
    const formattedDate = date.toFormat('YYYYMMDDHH24MISS');

    // Firestore へ書き込み
    await db
      .collection('edge')
      .doc('boTrseygojrZeVzm3oUz')
      .collection('observation-data')
      .add({
        timestamp: formattedDate,
        peopleCount: peopleCount,
        congestionDegree: congestionDegree,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }
}
module.exports = FirestoreService;