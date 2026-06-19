package br.com.erudio.service;

import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    private final OpenAiImageModel openaiImageModel;

    public ImageService(OpenAiImageModel openaiImageModel) {
        this.openaiImageModel = openaiImageModel;
    }

    public ImageResponse generateImage (String prompt, String qualidade, Integer n,
                                        Integer altura, Integer largura){
        //ImageResponse imageResponse = imageModel.call(new ImagePrompt(prompt));

        ImageResponse imageResponse = openaiImageModel.call(
                new ImagePrompt(prompt,
                        OpenAiImageOptions.builder()
                                .quality(qualidade)
                                .n(n)
                                .height(altura)
                                .width(largura).build())
        );


        return imageResponse;
    }
}
