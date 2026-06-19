package br.com.erudio.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RecipeService {

    private final ChatModel chatModel;

    public RecipeService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String createRecipe(String ingredientes, String cozinha, String restricoes) {
        var template = """
                Eu quero criar uma receita usando os seguintes ingredientes: {ingredientes}
                O tipo de cozinha que eu prefiro é: {cozinha}
                Considere as seguintes restrições alimentares: {restricoes}
                Me forneça uma receita detalhada incluindo titulo, lista de ingredientes e instruções de preparo.
                """;

        PromptTemplate promptTemplate = new PromptTemplate(template);
        Map<String,Object> params = Map.of(
          "ingredientes", ingredientes,
          "cozinha", cozinha,
          "restricoes", restricoes
        );

        Prompt prompt = promptTemplate.create(params);
        return chatModel.call(prompt).getResult().getOutput().getText();
    }
}
