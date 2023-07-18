require('date-utils');  // 現在日時を取得するライブラリ
const admin = require('firebase-admin');
const serviceAccount = require('PATH/TO/JSON/FILE');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class FirestoreService {
  // Firestore へのデータの書き込み
  static async writeDataToFirestore(is_using, peopleCount, congestionDegree) {
    const db = admin.firestore();

    // 現在時刻を取得
    const date = new Date();
    const formattedDate = date.toFormat('YYYYMMDDHH24MISS');

    // Firestore へ書き込み
    await db
      .collection('documents')
      .doc('sBxQbHwvGtv79N1AtcVz')
      .collection('device1')
      .add({
        timestamp: formattedDate, // 時間
        peopleCount: peopleCount, // 人数
        congestionDegree: congestionDegree, // 混雑率
        room_number: "354",       // 部屋番号
        is_using: is_using,       // 使用中か
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