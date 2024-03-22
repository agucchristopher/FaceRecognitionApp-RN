import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleFacesDetected = ({ faces }) => {
    // alert("Faces detected");
    setFaces(faces);
  };

  const renderFaces = () => {
    return faces.map((face, index) => (
      <View
        key={index}
        style={{
          position: "absolute",
          top: face.bounds.origin.y,
          left: face.bounds.origin.x,
          width: face.bounds.size.width,
          height: face.bounds.size.height,
          borderWidth: 2,
          borderColor: "red",
        }}
      />
    ));
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          // mode: FaceDetector.Constants.Mode.fast,
          // detectLandmarks: FaceDetector.Constants.Landmarks.none,
          // runClassifications: FaceDetector.Constants.Classifications.none,
          minDetectionInterval: 100,
          tracking: false,
        }}
      />
      {renderFaces()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});
