package br.com.erudio.controller;

import br.com.erudio.service.ChatService;
import br.com.erudio.service.ImageService;
import br.com.erudio.service.RecipeService;
import org.springframework.ai.image.ImageGeneration;
import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("ai")
public class GenerativeAIController {

    private final ChatService chatService;
    private final RecipeService recipeService;
    private final ImageService imageService;

    public GenerativeAIController(ChatService chatService, RecipeService recipeService, ImageService imageService) {
        this.chatService = chatService;
        this.recipeService = recipeService;
        this.imageService = imageService;
    }

    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt){
        return chatService.getResponse(prompt);
    }

    @GetMapping("ask-ai-options")
    public String getResponseWithOptions(@RequestParam String prompt){
        return chatService.getResponseWithOptions(prompt);
    }

    @GetMapping("recipe-creator")
    public String recipeCreator(@RequestParam String ingredientes,
                                @RequestParam(defaultValue  = "qualquer cozinha do mundo") String cozinha,
                                @RequestParam(defaultValue = "nenhuma") String restricoes){
        return recipeService.createRecipe(ingredientes,cozinha,restricoes);
    }

    @GetMapping("generate-image")
    public List<String> generateImages(@RequestParam String prompt,
                                       @RequestParam(defaultValue = "medium") String qualidade,
                                       @RequestParam(defaultValue = "1") Integer n,
                                       @RequestParam(defaultValue = "1024") Integer altura,
                                       @RequestParam(defaultValue = "1536") Integer largura) {

        ImageResponse response = imageService.generateImage(prompt, qualidade, n, altura, largura);

        return response.getResults().stream()
                .map(result -> "data:image/png;base64," + result.getOutput().getB64Json())
                .toList();
    }
}
