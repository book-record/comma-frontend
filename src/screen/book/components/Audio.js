import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";

import ActiveButton from "../../../common/compnents/ActiveButton";
import { recordSound } from "../../../store/recordSlice";

function Audio() {
  const [stream, setStream] = useState("");
  const [media, setMedia] = useState("");
  const [onRec, setOnRec] = useState(true);
  const [isSave, setIsSave] = useState(false);
  const [source, setSource] = useState("");
  const [analyser, setAnalyser] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [disabled, setDisabled] = useState(true);

  const streamRec = useSelector((state) => state.record.content);
  const dispatch = useDispatch();

  function onRecAudio() {
    setDisabled(true);
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioState = audioCtx.createScriptProcessor(0, 1, 1);

    setAnalyser(audioState);

    function makeSound(sound) {
      const recorded = audioCtx.createMediaStreamSource(sound);

      setSource(recorded);
      recorded.connect(audioState);
      audioState.connect(audioCtx.destination);
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((streamSource) => {
        const mediaRecorder = new MediaRecorder(streamSource);
        mediaRecorder.start();
        setStream(streamSource);
        setMedia(mediaRecorder);
        makeSound(streamSource);

        audioState.onaudioprocess = function onTimeOut(event) {
          if (event.playbackTime > 20) {
            stream.getAudioTracks().forEach((track) => {
              track.stop();
            });
            mediaRecorder.stop();

            audioState.disconnect();
            audioCtx.createMediaStreamSource(stream).disconnect();

            mediaRecorder.ondataavailable = function onMediaRecord(e) {
              setAudioUrl(e.data);
              setOnRec(true);
              setIsSave(true);
            };
          } else {
            setOnRec(false);
            setIsSave(false);
          }
        };
      });
  }

  function offRecAudio() {
    media.ondataavailable = function responseBlobData(event) {
      setAudioUrl(event.data);
      setOnRec(true);
      setIsSave(true);
    };

    stream.getAudioTracks().forEach((track) => {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();
    setDisabled(false);
  }

  const onSubmitAudioFile = useCallback(() => {
    const recordedAudio = new File([audioUrl], "mp3", {
      lastModified: new Date().getTime(),
      type: "audio/mpeg",
    });

    const formData = new FormData();
    formData.append("audio", recordedAudio);

    const recordFile = {
      content: URL.createObjectURL(audioUrl),
      data: formData,
      value: true,
    };
    dispatch(recordSound(recordFile));
  }, [audioUrl, dispatch]);

  const handleResetAudioFile = () => {
    dispatch(recordSound({ content: null, formData: null, value: false }));
  };

  return (
    <AudioWrapper>
      <div className="reocrdingBox">
        {!onRec && (
          <>
            <p className="recording" />
            <p>Recording...</p>
          </>
        )}
      </div>
      {streamRec && (
        <div>
          <audio controls>
            <track kind="captions" />
            <source src={streamRec} />
          </audio>
          <ActiveButton
            title="?????????"
            onClick={handleResetAudioFile}
            disabled={false}
          />
        </div>
      )}
      {!streamRec && (
        <div className="buttonContainer">
          <ActiveButton
            title={onRec ? "?????? " : "?????????"}
            onClick={onRec ? onRecAudio : offRecAudio}
            disabled={false}
          />
          {onRec && isSave && (
            <ActiveButton
              title="????????????"
              onClick={onSubmitAudioFile}
              disabled={disabled}
            />
          )}
        </div>
      )}
    </AudioWrapper>
  );
}

const Recording = keyframes`
  0% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    opacity: 0.2;
  }
  80% {
    -webkit-transform: scale(1.5);
            transform: scale(1.5);
    opacity: 1.0;
  }
  100% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    opacity: 0.2;
  }
`;

const AudioWrapper = styled.div`
  margin-top: 70px;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  audio {
    width: 280px;
    height: 30px;
    margin-bottom: 10px;
  }
  .reocrdingBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 140px;
  }
  .recording {
    width: 10px;
    height: 10px;
    border-radius: 30px;
    background: red;
    animation: ${Recording} 1.2s infinite;
  }
  .buttonContainer {
    display: flex;
    flex-direction: row;
  }
`;

export default Audio;
