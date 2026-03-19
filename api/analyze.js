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
      // AI Diet recommendation
      const { avgGlucose, topBad } = req.body;
      messages = [{
        role: "user",
        content: `당뇨 환자의 최근 평균혈당: ${avgGlucose}mg/dL. 혈당을 많이 올린 음식: ${topBad || "없음"}. 한국인 식단 기준으로 혈당 관리에 좋은 아침/점심/저녁 메뉴를 추천해주세요. JSON만 응답:\n{"breakfast":{"menu":"메뉴명","desc":"설명","gi":"low/medium"},"lunch":{"menu":"메뉴명","desc":"설명","gi":"low/medium"},"dinner":{"menu":"메뉴명","desc":"설명","gi":"low/medium"},"tip":"전체적인 식단 조언 한 줄"}`
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
