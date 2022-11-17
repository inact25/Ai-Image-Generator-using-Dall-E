const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const generateAiImage = async (prompt, size, mode) => {
    return await openai.createImage({
        prompt: prompt + mode,
        n: 8,
        size: size,
    });

}


export {
    generateAiImage,

}

