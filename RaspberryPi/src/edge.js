const WebcamControlService = require('./services/webcam/WebcamControlService.js');
const ObjectDetectionService = require('./services/ComputerVision/ObjectDetectionService.js');
const FirestoreService = require('./services/CRUD/FirestoreService');

// Webカメラを用いた混雑率推定
const congestionEstimation = async () => {
  // Webカメラで写真を撮影する
  await WebcamControlService.captureImage()
      // VisionAPIで写真のオブジェクト検出
      await ObjectDetectionService.detectMultipleObject()
        .then(async (res) => {
          const objects = res;
          let objectNames = [];
          objects.forEach((object) => {
            objectNames.push(object.name);
          });

          // 画像内の人の数をカウントする
          let peopleCount = 0;
          for (let i = 0; i < objectNames.length; i++) {
            if (objectNames[i] === 'Person') {
              peopleCount++;
            }
          }
          console.log('\n検知した人数: ', peopleCount);
	      const congestionDegree = peopleCount / 20;            // 混雑率
          console.log('congestionDegree: ', congestionDegree);  
          
          await FirestoreService.writeDataToFirestore(peopleCount, congestionDegree) // DBに登録
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
    }

congestionEstimation();