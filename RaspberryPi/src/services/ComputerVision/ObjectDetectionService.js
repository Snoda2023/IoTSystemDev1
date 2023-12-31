class ObjectDetectionService {
    static async detectMultipleObject() {
      // Imports the Google Cloud client libraries
      const vision = require('@google-cloud/vision');
      const fs = require('fs');
  
      // Creates a client
      const client = new vision.ImageAnnotatorClient();
  
      // PATH to local image
      const fileName = `./img.jpg`;
      const request = {
        image: { content: fs.readFileSync(fileName) },
      };
  
    
      const [result] = await client.objectLocalization(request);
      const objects = result.localizedObjectAnnotations;
      objects.forEach((object) => {
        console.log(`Name: ${object.name}`);
        console.log(`Confidence: ${object.score}`);
        const vertices = object.boundingPoly.normalizedVertices;
        vertices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`));
      });
      return objects;
    }
  }
  
  module.exports = ObjectDetectionService;