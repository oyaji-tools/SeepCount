// ずんだもんの音声で読み上げる関数
async function speakSmoothly(text) {
  try {
    // 1. 音声合成用のクエリを作成
    const queryRes = await fetch(
      `https://voicevox.su-shiki.com/api/sound/audio_query?text=${encodeURIComponent(text)}&speaker=3`,
      { method: 'POST' }
    );
    const queryData = await queryRes.json();

    // 睡眠用に話すスピードをゆっくりにする調整
    queryData.speedScale = 0.6; 

    // 2. 音声波形データを取得
    const synthRes = await fetch(
      `https://voicevox.su-shiki.com/api/sound/synthesis?speaker=3`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queryData)
      }
    );

    const audioBlob = await synthRes.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    // 音量を少し下げて優しく再生
    audio.volume = 0.7;
    audio.play();

  } catch (e) {
    console.error("ずんだもん音声の取得に失敗しました", e);
  }
}
