export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, media_type, mode } = req.body;
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    let messages;

    if (mode === 'diet') {
      const { avgGlucose, avgPre, avgPost, topBad, topGood, spikes } = req.body;
      messages = [{
        role: "user",
        content: `당신은 당뇨 전문 영양사입니다. 아래 환자의 실제 혈당 데이터를 분석하고, 내일 하루 식단을 추천해주세요.

[환자 혈당 데이터]
- 전체 평균 혈당: ${avgGlucose}mg/dL
- 식전 평균: ${avgPre || "데이터 부족"}mg/dL  
- 식후 평균: ${avgPost || "데이터 부족"}mg/dL
- 식사별 혈당 변화: ${spikes || "데이터 부족"}
- 혈당을 많이 올린 음식: ${topBad || "데이터 부족"}
- 혈당을 잘 유지한 음식: ${topGood || "데이터 부족"}

[필수 조건]
1. 하루 식단의 일관성: 아침/점심/저녁이 같은 음식 컨셉이어야 함 (예: 하루 전체가 "한식 담백 코스" 또는 "저탄고지 식단")
2. 직장인 현실 반영: 점심은 구내식당/편의점/식당에서 쉽게 먹을 수 있는 메뉴
3. 데이터 기반: 위 환자의 식후 혈당이 높다면 탄수화물 줄이기, 식전이 높다면 저녁 간식 제한 등 구체적 근거 제시
4. 한국인 식단 기준

JSON만 응답:
{"theme":"오늘의 식단 컨셉 한 줄","breakfast":{"menu":"메뉴명","desc":"구체적 구성 (예: 잡곡밥 반공기 + 된장국 + 계란후라이 + 김치)","reason":"이 환자에게 이 메뉴를 추천하는 이유","gi":"low/medium"},"lunch":{"menu":"메뉴명","desc":"구체적 구성","reason":"추천 이유","gi":"low/medium"},"dinner":{"menu":"메뉴명","desc":"구체적 구성","reason":"추천 이유","gi":"low/medium"},"snack":"간식 추천 (있다면)","avoid":"오늘 피해야 할 음식","tip":"이 환자의 혈당 데이터를 분석한 맞춤 조언"}`
      }];
    } else {
      // Food image analysis
      messages = [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: media_type, data: image }
          },
          {
            type: "text",
            text: '이 음식을 분석하세요. 양도 추정하세요. JSON만 응답:\n{"name":"음식명","emoji":"이모지","gi":"high/medium/low","gi_score":"수치","calories":"kcal","portion":"추정량","carbs":"g","protein":"g","fat":"g","fiber":"g","sugar":"g","sodium":"mg","warning":"당뇨주의사항","tip":"혈당관리팁","confidence":"high/medium/low"}'
          }
        ]
      }];
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: messages
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    const text = data.content.map(c => c.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "분석에 실패했습니다. 다시 시도해주세요." });
  }
}
