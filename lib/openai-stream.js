import { openai } from "../config/openai";
import { Transform } from "stream";

export const openaiStream = async (res, messages, temperature, max_tokens) => {
  openai.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      messages,
      temperature,
      max_tokens,
      stream: true,
    }, 
    { responseType: "stream" }
  )
  .then((response) => {
    class TransformBody extends Transform {
      _transform(chunk, encoding, cb) {
        try{
          const splittedBuffer = chunk.toString().split(/data:\s/);

          splittedBuffer.forEach(buffer => {
            if(buffer && !buffer.includes('[DONE]')) {
              const bufferInJson = JSON.parse(buffer);
              const completionText = bufferInJson.choices[0].delta.content;
              this.push(completionText);
            }
          });

          cb();
        } catch(error) {
          response.data.emit("error");
        }
      }
    }

    class TransformMessage extends Transform {
      constructor(message) {
        super();
        this.message = message;
      }
      _transform(chunk, encoding, cb) {
        this.push(this.message);
      }
    }

    response.data.pipe(new TransformBody()).pipe(res);

    response.data.on("error", (error) => {
      response.data
      .pipe(new TransformMessage("[ERROR-OCCURRED] An error occurred while generating your content. Please try again!"))
      .pipe(res);
    });
  })
  .catch((error) => {
    console.log(error)
    res
      .status(500)
      .json({ status: false, error: "Error occurred! Please try again." });
  });
};
