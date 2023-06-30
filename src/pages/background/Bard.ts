function extractFromHTML(variableName, html) {
  const regex = new RegExp(`"${variableName}":"([^"]+)"`);
  const match = regex.exec(html);
  return match?.[1];
}

async function fetchRequestParams() {
  const response = await fetch("https://bard.google.com/faq");
  const html = await response.text();
  const atValue = extractFromHTML("SNlM0e", html);
  const blValue = extractFromHTML("cfb2h", html);
  return { atValue, blValue };
}

function parseBartResponse(resp) {
  const data = JSON.parse(resp.split("\n")[3]);
  const payload = JSON.parse(data[0][2]);
  if (!payload) {
    throw new Error("Failed to access Bard");
  }
  const text = payload[0][0];
  return {
    text,
    ids: [...payload[1], payload[4][0][0]],
  };
}

export default class BardBot {
  _isAvailable;
  conversationContext;

  constructor() {
    this.conversationContext = {
      requestParams: { atValue: null, blValue: null },
      contextIds: ["", "", ""],
    };
    this.checkAvailability();
  }

  async checkAvailability() {
    this.conversationContext.requestParams = await fetchRequestParams();
    this._isAvailable = !!this.conversationContext.requestParams.atValue;
  }

  async _sendPrompt(prompt) {
    return new Promise((resolve, reject) => {
      const { requestParams, contextIds } = this.conversationContext;
      const params = new URLSearchParams({
        at: requestParams.atValue,
        "f.req": JSON.stringify([
          null,
          `[[${JSON.stringify(prompt)}],null,${JSON.stringify(contextIds)}]`,
        ]),
      });

      const url = `https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=${
        requestParams.blValue
      }&_reqid=${Math.floor(Math.random() * 900000) + 100000}&rt=c`;

      fetch(url, {
        method: "POST",
        body: params,
      })
        .then((response) => response.json())
        .then((resp) => {
          const { text, ids } = parseBartResponse(resp);
          this.conversationContext.contextIds = ids;
          resolve({ content: text, done: true });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
