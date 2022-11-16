const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateAiImage = async (prompt, size) => {
    return await openai.createImage({
        prompt: prompt,
        n: 8,
        size: size,
    });

}
export {
    generateAiImage
}

