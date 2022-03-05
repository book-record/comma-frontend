import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ActiveButton from "../../../common/compnents/ActiveButton";
import { recordSound } from "../../../store/recordSlice";

function Audio() {
  const [stream, setStream] = useState("");
  const [media, setMedia] = useState("");
  const [onRec, setOnRec] = useState(true);
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
            };
          } else {
            setOnRec(false);
          }
        };
      });
  }

  function offRecAudio() {
    media.ondataavailable = function responseBlobData(event) {
      setAudioUrl(event.data);
      setOnRec(true);
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
      formData: recordedAudio,
    };
    dispatch(recordSound(recordFile));
  }, [audioUrl, dispatch]);

  const handleResetAudioFile = () => {
    dispatch(recordSound({ content: null, formData: {} }));
  };

  return (
    <AudioWrapper>
      {streamRec && (
        <>
          <audio controls>
            <track kind="captions" />
            <source src={streamRec} />
          </audio>
          <ActiveButton
            title="재녹음"
            onClick={handleResetAudioFile}
            disabled={false}
          />
        </>
      )}
      {!streamRec && (
        <>
          <ActiveButton
            title={onRec ? "녹음" : "멈추기"}
            onClick={onRec ? onRecAudio : offRecAudio}
            disabled={false}
          />
          <ActiveButton
            title="저장하기"
            onClick={onSubmitAudioFile}
            disabled={disabled}
          />
        </>
      )}
    </AudioWrapper>
  );
}

const AudioWrapper = styled.div`
  margin-top: 150px;
  audio {
    width: 280px;
    height: 30px;
  }
`;

export default Audio;
