const WebcamControlService = require('./services/webcam/WebcamControlService.js');
const ObjectDetectionService = require('./services/ComputerVision/ObjectDetectionService.js');

// Webカメラで写真を撮影する
WebcamControlService.captureImage();

// 撮影した画像を Cloud Vision API でオブジェクト検出
ObjectDetectionService.detectMultipleObject();