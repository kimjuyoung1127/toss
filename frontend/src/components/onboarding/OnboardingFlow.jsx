import React, { useState, useRef, useEffect } from 'react';
import WebcamSetupStep from './WebcamSetupStep';
import SkeletonDetectionStep from './SkeletonDetectionStep';
import ExerciseSelectionStep from './ExerciseSelectionStep';
import PoseAnalysisComponent from '../PoseAnalysis';

import DebugUpload from '../debug/DebugUpload';

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [facingMode, setFacingMode] = useState('user'); // Current camera direction: 'user' for front, 'environment' for rear

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const debugUploadRef = useRef(null);

  const handleUploadClick = () => {
    if (debugUploadRef.current) {
      debugUploadRef.current.click();
    }
  };

  const isDevMode = new URLSearchParams(window.location.search).get('dev') === 'true';

  // Effect to handle webcam stream
  useEffect(() => {
    let stream = null;
    const getWebcam = async () => {
        // Don't start a new stream if one is already active
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          videoRef.current.srcObject = null;
        }

        if (currentStep === 1 || currentStep === 2) {
          try {
            // Use facingMode to select which camera to use
            const constraints = { 
              video: { 
                facingMode: facingMode 
              } 
            };
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play().catch(e => console.log("Video play error:", e));
            }
            setCameraPermission('granted');
          } catch (err) {
            console.error('Error accessing webcam:', err);
            setCameraPermission('denied');
          }
        }
    };

    const disableWebcam = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    if (isVideoUploaded) {
        disableWebcam();
        return;
    }

    getWebcam();

    // Only run cleanup when the component unmounts
    return () => {
        disableWebcam();
    }
  }, [currentStep, isVideoUploaded, facingMode]); // Include facingMode in dependency array

  useEffect(() => {
    // Activate analysis only on the skeleton detection step
    setIsAnalyzing(currentStep === 2);
  }, [currentStep]);

  const handleAnalysisComplete = (result) => {
    // In onboarding, we just care about detecting a skeleton
    if (result && result.keypoints_data && result.keypoints_data.length > 0) {
      setAnalysisResult(result);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(selectedExercise);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WebcamSetupStep 
            onNext={nextStep}
            onPrev={prevStep}
            cameraPermission={cameraPermission}
            setCameraPermission={setCameraPermission}
            videoRef={videoRef}
            onUploadClick={handleUploadClick}
          />
        );
      case 2:
        return (
          <SkeletonDetectionStep
            onNext={nextStep}
            onPrev={prevStep}
            videoRef={videoRef}
            canvasRef={canvasRef}
            analysisResult={analysisResult}
          />
        );
      case 3:
        return (
          <ExerciseSelectionStep
            onNext={nextStep}
            onPrev={prevStep}
            onComplete={onComplete}
            selectedExercise={selectedExercise}
            setSelectedExercise={setSelectedExercise}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#111' }}>
      {/* 1. 비디오와 캔버스의 zIndex를 높여서 가장 위로 올립니다. */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted
        controls={false}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain',
          zIndex: 0, // 비디오는 맨 뒤에 위치
        }} 
      />
      <canvas 
        ref={canvasRef}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          zIndex: 1, // 캔버스는 비디오 위에 위치
        }} 
      />

      {/* 카메라 전환 버튼 (1단계 또는 2단계일 때만 표시) */}
      {(currentStep === 1 || currentStep === 2) && (
        <button
          onClick={() => setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'))}
          style={{ 
            position: 'absolute', 
            top: '20px', 
            right: '20px', 
            zIndex: 3, 
            background: 'rgba(0,0,0,0.5)', 
            border: 'none', 
            borderRadius: '50%', 
            padding: '10px', 
            cursor: 'pointer',
            color: 'white'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 간단한 카메라 전환 아이콘 SVG */}
            <path d="M20 10H14.5C14.2239 10 14 9.77614 14 9.5V4M20 10L12 2L4 10H9.5C9.77614 10 10 10.2239 10 10.5V16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="white"/>
            <path d="M4 14H9.5C9.77614 14 10 14.2239 10 14.5V20M4 14L12 22L20 14H14.5C14.2239 14 14 13.7761 14 13.5V8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="white"/>
          </svg>
        </button>
      )}

      {/* 2. UI 요소들은 zIndex를 2로 설정하여 캔버스 위에 위치시킵니다. */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
        {renderStep()}
      </div>
      
      {/* Dev mode file upload */}
      <DebugUpload ref={debugUploadRef} videoRef={videoRef} setCameraPermission={setCameraPermission} onVideoUpload={() => setIsVideoUploaded(true)} />

      {/* PoseAnalysisComponent는 시각적 요소가 아니므로 zIndex가 필요 없습니다. */}
      <PoseAnalysisComponent 
        modelPath="./yolov11_pose_dog.onnx"
        videoRef={videoRef}
        canvasRef={canvasRef}
        onAnalysisComplete={handleAnalysisComplete}
        isAnalyzing={isAnalyzing}
      />
    </div>
  );
};

export default OnboardingFlow;