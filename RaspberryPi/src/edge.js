const WebcamControlService = require('./services/webcam/WebcamControlService.js');
const ObjectDetectionService = require('./services/ComputerVision/ObjectDetectionService.js');

// Webカメラを用いた混雑率推定
const congestionEstimation = async () => {
  // Webカメラで写真を撮影する
  await WebcamControlService.captureImage()
      // VisionAPIで写真のオブジェクト検出
      await ObjectDetectionService.detectMultipleObject()
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
          console.log('検知した人数: ', peopleCount);
}

congestionEstimation();