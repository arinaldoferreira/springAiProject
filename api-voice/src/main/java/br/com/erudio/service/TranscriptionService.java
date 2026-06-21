package br.com.erudio.service;

import org.springframework.ai.audio.transcription.AudioTranscriptionPrompt;
import org.springframework.ai.audio.transcription.AudioTranscriptionResponse;
import org.springframework.ai.openai.OpenAiAudioTranscriptionModel;
import org.springframework.ai.openai.OpenAiAudioTranscriptionOptions;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class TranscriptionService {

    private final OpenAiAudioTranscriptionModel transcriptionModel;

    public TranscriptionService(OpenAiAudioTranscriptionModel transcriptionModel) {
        this.transcriptionModel = transcriptionModel;
    }

    public String transcribeAudio(MultipartFile file) throws IOException {
        File tempFile = File.createTempFile("audio-", ".m4a");

        try {
            file.transferTo(tempFile);

            OpenAiAudioTranscriptionOptions options =
                    OpenAiAudioTranscriptionOptions.builder()
                            .language("pt")
                            .temperature(0f)
                            .build();

            FileSystemResource audioFile = new FileSystemResource(tempFile);

            AudioTranscriptionPrompt transcriptionRequest =
                    new AudioTranscriptionPrompt(audioFile, options);

            AudioTranscriptionResponse response =
                    transcriptionModel.call(transcriptionRequest);

            return response.getResult().getOutput();

        } finally {
            tempFile.delete();
        }
    }
}