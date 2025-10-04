package in.FirstSpringbProject.musifyapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.FirstSpringbProject.musifyapi.dto.SongListResponse;
import in.FirstSpringbProject.musifyapi.dto.SongRequest;
import in.FirstSpringbProject.musifyapi.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/songs")
@RequiredArgsConstructor
public class SongController {
    private final SongService songService;

    @PostMapping
    public ResponseEntity<?> addSong(@RequestPart("request") String requestString,
                             @RequestPart("audio") MultipartFile audioFile,
                             @RequestPart("image") MultipartFile imageFile){
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            SongRequest songRequest = objectMapper.readValue(requestString, SongRequest.class);
            songRequest.setAudioFile(audioFile);
            songRequest.setImageFile(imageFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(songService.addSong(songRequest));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listSongs() {
        try {
            return ResponseEntity.ok(songService.getAllSongs());
        } catch (Exception e) {
            return ResponseEntity.ok(new SongListResponse(false, null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeSong(@PathVariable String id){
        try{
            Boolean removed = songService.removeSong(id);
            if (removed){
                return ResponseEntity.noContent().build();
            }else{
                return ResponseEntity.badRequest().build();
            }
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Songs not found.");
        }
    }

}
