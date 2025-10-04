package in.FirstSpringbProject.musifyapi.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.FirstSpringbProject.musifyapi.document.Song;
import in.FirstSpringbProject.musifyapi.dto.SongListResponse;
import in.FirstSpringbProject.musifyapi.dto.SongRequest;
import in.FirstSpringbProject.musifyapi.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

import static org.apache.commons.lang3.time.DurationFormatUtils.formatDuration;

@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final Cloudinary cloudnary;

    public Song addSong(SongRequest request) throws IOException {
       Map<String, Object> audioUploadResult = cloudnary.uploader().upload(request.getAudioFile().getBytes(), ObjectUtils.asMap("resource_type","video"));
        Map<String, Object> imageUploadResult = cloudnary.uploader().upload(request.getImageFile().getBytes(),ObjectUtils.asMap("resource_type", "image"));
        Double durationSeconds = (Double) audioUploadResult.get("duration");
        String duration = formatDuration(durationSeconds);

        Song newSong = Song.builder()
                .name(request.getName())
                .desc(request.getDesc())
                .album(request.getAlbum())
                .image(imageUploadResult.get("secure_url").toString())
                .file(audioUploadResult.get("secure_url").toString())
                .duration(duration)
                .build();
        return songRepository.save(newSong);
    }

        private String formatDuration(Double durationSeconds){
         if(durationSeconds == null){
             return "0:00";
         }

         int minutes = (int)(durationSeconds / 60);
         int seconds = (int)(durationSeconds % 60);

         return String.format("%d:%02d", minutes,seconds);
        }

        public SongListResponse getAllSongs(){
          return new SongListResponse(true,songRepository.findAll());
        }

        public Boolean removeSong(String id){
         Song existingSong = songRepository.findById(id)
                 .orElseThrow(()-> new RuntimeException("Song not found"));
         songRepository.delete(existingSong);
         return true;

        }

}
